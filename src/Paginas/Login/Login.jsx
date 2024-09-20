import "./Login.scss";

import { useRef, useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import useAuth from "../../Hooks/UseAuth.jsx";
const LOGIN_URL = "/auth/login";
import { Box, Button, TextField } from "@mui/material";
import api from "../../Api/axios.jsx";
import logo from "/imagens/logo.png";
import { toast, Toaster } from "sonner";

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
    console.log("teste");

    if(email == "")
      toast.info("email");

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
      if (!err?.response) 
        toast.warning("Sem resposta do servidor");
      else if (err.response?.status === 400)
        toast.error("Usuário ou senha não informados");
      else if (err.response?.status === 403)
        toast.error("Usuário ou senha inválidos");
      else toast.warning("Falha ao realizar o login");

      errRef.current.focus();
    }
  };

  return (
    <div className="login">
      <div className="login-container">
        <div className="login-section-1"></div>
        <div className="login-section-2">
          <img className="login-logo" src={logo}></img>
          <Box component="form" className="form-login" onSubmit={handleSubmit}>
            <h3 className="form-titulo">Login</h3>

            <div className="form-input-area">
              <TextField
                variant="outlined"
                label="Email"
                value={email}
                size="small"
                onChange={(e) => setEmail(e.target.value)}
              />

              <TextField
                variant="outlined"
                label="Senha"
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
        </div>
      </div>

      <Toaster richColors />
    </div>
  );
};

export default Login;
