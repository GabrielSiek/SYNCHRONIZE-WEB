  import "./Login.scss";

  import { useRef, useState, useEffect } from "react";
  import { useNavigate, useLocation } from "react-router-dom";
  import useAuth from "../../Hooks/UseAuth.jsx";
  import api from "../../Api/axios.jsx";
  const LOGIN_URL = "/auth/login";
  import { Box, Button, TextField } from "@mui/material";

  const Login = () => {
    const { setAuth } = useAuth();

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/dashboard";

    const userRef = useRef();
    const errRef = useRef();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errMsg, setErrMsg] = useState("");

    useEffect(() => {
      userRef.current.focus();
    }, []);

    useEffect(() => {
      setErrMsg("");
    }, [email, password]);

    const handleSubmit = async (e) => {
      e.preventDefault();

      try {
        const response = await api.post(
          LOGIN_URL,
          JSON.stringify({ email, password }),
          {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          }
        );

        const accessToken = response?.data?.token;

        localStorage.setItem("token", accessToken);

        setAuth({ email, password, accessToken });

        setEmail("");
        setPassword("");
        navigate(from, { replace: true });
      } catch (err) {
        if (!err?.response) setErrMsg("Sem resposta do servidor");
        else if (err.response?.status === 400)
          setErrMsg("Usuário ou senha não informados");
        else if (err.response?.status === 403) setErrMsg("Sem autorização");
        else setErrMsg("Falha ao fazer login");

        errRef.current.focus();
      }
    };

    return (
      <Box component="form" className="form-login" onSubmit={handleSubmit}>
        
        <h3 className="form-titulo">Login</h3>

        <div className="form-input-area">
          <TextField
            variant="outlined"
            label="Email"
            required
            value={email}
            size="small"
            onChange={(e) => setEmail(e.target.value)}
          />

          <TextField
            variant="outlined"
            label="Senha"
            required
            type="password"
            value={password}
            size="small"
            onChange={(e) => setPassword(e.target.value)}
            inputRef={userRef}
          />

          <Button variant="contained" disableRipple type="submit">
            Login
          </Button>
          <p
            ref={errRef}
            className={errMsg ? "errmsg" : "offscreen"}
            aria-live="assertive"
          >
            {errMsg}
          </p>
        </div>
      </Box>
    );
  };

  export default Login;
