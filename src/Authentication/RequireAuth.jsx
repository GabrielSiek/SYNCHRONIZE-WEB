 import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import api from '../Api/Axios'

const RequireAuth = () => {
    const navigate = useNavigate()

    useEffect(() => {
        const verifyToken = async () => {
            try {
                const response = await api.get('/auth/verify-token')
                
               
            } catch (e) {
                if(e.response.status === 403)
                    navigate('/login');
                if(e.response) {
                    console.log(e.response.data);
                    console.log(e.response.status);
                    console.log(e.response.headers);
                }
                
            }

        }

        verifyToken()
    })
    
    return (
            <div>   
                <Outlet  />
            </div>
    )
}

export default RequireAuth