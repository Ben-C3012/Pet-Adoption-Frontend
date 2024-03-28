import { useEffect, useState } from 'react';
import axios from 'axios';

function useIsLoggedIn() {
    const [user, setUser] = useState(null);
    const isLoggedinURL = 'http://localhost:8080/api/v1/users/isloggedin';

    useEffect(() => {
        axios({
            method: 'POST',
            url: isLoggedinURL,
            withCredentials: true
        })
        .then(res => {
            console.log(res.data.user)
            const user = res.data.user
            setUser(res.data.user)
        })
        .catch(err => {
            console.error(err);
        });
    }, []);

    return [user, setUser];
}

export default useIsLoggedIn;

function setUser() {
    // export setUser
}