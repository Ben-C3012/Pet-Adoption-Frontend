import { useContext } from 'react'
import { Context } from '../../App'
import { Navigate } from 'react-router-dom'

function RequireAuth({ children }) {
    const value = useContext(Context)
    const { loggedIn } = value

    if (!loggedIn) {
        return <Navigate to='/' />
    }

    return children
}

export default RequireAuth