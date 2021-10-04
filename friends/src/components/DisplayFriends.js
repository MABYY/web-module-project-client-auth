import react from "react";

const DisplayFriends = (props) =>{
    console.log('friends display',props.friends)
    
return(
    // <div>Hello World</div>
<> {props.friends.map(friend =>(
    <ul key = {friend.id} >
        <li>Name: {friend.name}</li>
        <li>Age: {friend.age}</li>
        <li>Email: {friend.email}</li>
    </ul>
))}
</>
    )
} 

export default DisplayFriends;
