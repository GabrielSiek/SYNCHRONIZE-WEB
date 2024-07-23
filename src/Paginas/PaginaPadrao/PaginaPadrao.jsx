import './PaginaPadrao.scss'
import Header from '../../Widgets/Header/Header'
import SideBar from '../../Widgets/SideBar/SideBar'
import { Outlet } from 'react-router-dom'
import api from "../../api/axios.jsx";
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const PaginaPadrao = () => {

    const navigate = useNavigate()

    useEffect(() => {
        const verifyToken = async () => {
            try {
                const response = await api.get('/auth/verify-token')
            } catch (e) {
                if(e.response.status === 403)
                    navigate('/login')
                else if(e.response) {
                    console.log(e.response.data)
                    console.log(e.response.status)
                    console.log(e.response.headers)
                }
            }

        }

        verifyToken()
    })
    
    return (
        <main className='mainpage'>
            <section className='mainpage-sidebar'>
                    <SideBar></SideBar>
                </section>

                <section className='mainpage-content-section'>
                    <Header></Header>

                    <Outlet/>
                </section>
        </main>
    )
}

export default PaginaPadrao;