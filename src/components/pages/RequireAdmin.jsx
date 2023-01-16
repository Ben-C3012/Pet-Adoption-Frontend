import { useContext } from 'react'
import { Context } from '../../App'
import { Navigate } from 'react-router-dom'

function RequireAdmin({children}) {
    const value = useContext(Context)
    const { admin} = value

    if(!admin) {
        return <Navigate to='/main' />
    }

    return children
}

export default RequireAdmin