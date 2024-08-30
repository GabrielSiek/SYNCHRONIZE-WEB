import './Login.scss'

import { useRef, useState, useEffect } from 'react';
import { useNavigate, useLocation} from 'react-router-dom';
import { FormTitulo, FormInputUsername, FormInputPassword } from "../../Widgets/Form/Form.jsx";
import { ButtonDefault } from '../../Widgets/Buttons/Buttons.jsx';
import useAuth from '../../Hooks/UseAuth.jsx';
import axios from '../../Api/Axios.jsx';
const LOGIN_URL = '/auth/login'

const Login = () => {
    const { setAuth } = useAuth()

    const navigate = useNavigate()
    const location = useLocation()
    const from = location.state?.from?.pathname || "/dashboard"

    const userRef = useRef()
    const errRef = useRef()
    
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errMsg, setErrMsg] = useState('')

    useEffect(() => {
        userRef.current.focus()
    }, [])

    useEffect(() => {
        setErrMsg('')
    }, [email, password])

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(LOGIN_URL,
                JSON.stringify({ email, password }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            )

            const accessToken = response?.data?.token

            localStorage.setItem('token', accessToken)

            setAuth({ email, password, accessToken })

            setEmail('') 
            setPassword('')
            navigate(from, { replace: true})
        } catch (err) {
            if (!err?.response)
                setErrMsg("Sem resposta do servidor")
            else if (err.response?.status === 400)
                setErrMsg("Usuário ou senha não informados")
            else if (err.response?.status === 403)
                setErrMsg("Sem autorização")
            else
                setErrMsg('Falha ao fazer login')

            errRef.current.focus()
        }
    }

    return (
                <div className='login'>
                    <form className='form-login' onSubmit={handleSubmit}>
                        <FormTitulo>Login</FormTitulo>

                        <FormInputUsername placeholder={'Digite o nome de usuário'} userRef={userRef} onChange={(e) => setEmail(e.target.value)} value={email} />

                        <FormInputPassword placeholder={'Digite a senha'} onChange={(e) => setPassword(e.target.value)} value={password} />

                        <ButtonDefault>Login</ButtonDefault>
                    </form>
                    <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">
                            {errMsg}
                        </p>
                </div>
            
    )
}

export default Login;