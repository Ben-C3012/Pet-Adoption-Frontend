import {useEffect , useState} from 'react'

function Stats() {

    useEffect(() => {
        axios({
          method: 'GET',
          url: 'http://localhost:8080/api/v1/users/',
          withCredentials: true
        })
          .then(res => {
            console.log(res.data.data.users)
            setRowData(res.data.data.users)
          })
    
    
      }, []);


  return (
    <div>Stats</div>
  )
}

export default Stats