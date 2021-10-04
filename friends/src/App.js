import react, { useState } from "react";
// import axios from 'axios';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import { axiosWithAuth } from "./utils/axiosWithAuth";

import Login from './components/Login';
import Logout from './components/Logout';
import Friends from './components/Friends';
import ProtectedRoute from './components/ProtectedRoute';

function App() {

  const [tokenid , setTokenid] = useState(localStorage.getItem('token'))

  const hadleLogout = () => {
    // axios.post('http://localhost:5000/api/logout',
    //     {headers: { Authorization: localStorage.getItem('token')}}
    //     ) 
    axiosWithAuth()
    .post('/logout')
    .then(res=>{ 
      console.log('res',res)
     localStorage.removeItem('token') // remove token when the user logs out
     setTokenid("")
    })
    .catch(err=>{ console.log(err)})
    }

  return (
    <Router>
      <div>
        <ul>
            <li>
              <Link to='/login'>Login</Link>
            </li>
            <li>
            <Link to='/logout' onClick ={hadleLogout}>Logout</Link>
            </li>
            <li>
            {(tokenid && <Link to='/friends'>Friends</Link>)}
            </li>
        </ul>

        <Switch>
          <ProtectedRoute exact path ='/friends' component ={Friends} />
          <Route exact path ='/login' render = {(props)=>(<Login {...props} settoken = {setTokenid}/>)} />
          <Route exact path ='/logout' component ={Logout} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
