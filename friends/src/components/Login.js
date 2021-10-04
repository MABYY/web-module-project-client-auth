import react, {useState} from "react";
import axios from "axios";
import { useHistory } from 'react-router-dom';
import { axiosWithAuth } from '../utils/axiosWithAuth';

function Login(props) {
const history = useHistory();
const [credentials, setCredentials] = useState({ username: '', password: '' })
const [isLoading, setIsLoading] = useState(false)

const handleOnchange = (e) =>{
    setCredentials({...credentials,[e.target.name]: e.target.value})
            }

const handleLogin = e => {
            e.preventDefault();
            axiosWithAuth().post('/login',credentials) // pass credentials to server to verify identity
                .then(res=>{ 
                setIsLoading(true)
                localStorage.setItem('token',res.data.payload) // save token
                props.settoken(res.data.payload)
                history.push('/friends') // redirect to 'friends' once the auth is successful
            })
                .catch(err=>{ console.log(err)})
                
        setCredentials({ username: '', password: '' })

        };

    return (
        <div>
            <form onSubmit ={handleLogin} > 
            <label> Username:  
                <input type ='text' 
                        name = 'username'
                        value = {credentials.username}
                        onChange = {handleOnchange}
                        />
            </label>


                <br></br>
            <label> Password: 
            <input type = 'password' 
                        name = 'password'
                       value = {credentials.password}
                       onChange = {handleOnchange}
                        />
            </label>
            <br></br>
            <br></br>

                <button>Log in</button>
            </form>   

        </div>
    )
}
export default Login;