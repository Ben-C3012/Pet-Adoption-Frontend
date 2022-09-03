import { useContext } from 'react'
import { Context } from '../../App'
import { Navigate , useLocation } from 'react-router-dom'
import { replace } from 'formik'

function RequireAuth({ children }) {
    const location = useLocation()
    const value = useContext(Context)
    const { admin, loggedIn } = value



    if (!loggedIn) {
        return <Navigate to='/' />
    }



    return children
}

export default RequireAuth