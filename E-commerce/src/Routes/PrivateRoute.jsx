import {Navigate} from 'react-router-dom'
const isAuthenticated=()=>{
    return localStorage.getItem('token')!==null
}
export default function PrivateRoute({children}){
    return <>
    {isAuthenticated()?children:<Navigate to="/Login"/>}
    </>
}