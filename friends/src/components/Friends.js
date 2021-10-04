import react,{useState,useEffect} from "react";
// import axios from 'axios';
import DisplayFriends from './DisplayFriends';

import {axiosWithAuth} from '../utils/axiosWithAuth'


function Friends() {

const [friends, setFriends] = useState([])
const [friend, setFriend] = useState({
    id: Date.now(),
    name: '',
    age: '',
    email: ''
  })
  const [errorMsg, setErrorMsg] = useState("")

useEffect(()=>{
    // axios.get('http://localhost:5000/api/friends',{
    //     headers: { Authorization: localStorage.getItem('token')}
    // }) // pass credentials to server to verify identity to be redirected to friends
    axiosWithAuth()
    .get('/friends')
    .then(res=>{ 
        setFriends(res.data) // set initial state of friends so that they get displayed
})
    .catch(err=>{ console.log(err.data.error)})

},[])

const handleOnchange = (e) =>{
    setFriend({...friend,[e.target.name]: e.target.value})
            }

const handleFriends = () => {
    setFriends([...friends, friend]) 
    setFriend({
        id: Date.now(),
        name: '',
        age: '',
        email: ''})
};
const formSubmit = (e)=>{
    e.preventDefault(); 
    (friend.name == "" || friend.age === "" || friend.email == "") ? setErrorMsg('There is missing data'): handleFriends()
};
    return (
        <div>

         <DisplayFriends friends={friends}/>

        <form onSubmit={formSubmit}>
            <label>Name   
                <input type='text'name = 'name' value = {friend.name} onChange={handleOnchange}/>
            </label>
            <br></br>
            <br></br>
            <label>Age  
                <input type='number' name = 'age' value = {friend.age} onChange={handleOnchange}/>
            </label>
            <br></br>
            <br></br>
            <label>Email  
                <input type='email' name = 'email' value = {friend.email}  onChange={handleOnchange}/>
            </label>
            <br></br>
            <br></br>
            <button type='submit'>Submit Form</button>
        </form>
        <br></br>
        {errorMsg}
    </div>
    )
}
export default Friends;