import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom';

const Login = (props) => {
    let history = useHistory();

    useEffect(() => {
        props.alertShow("Welcome to iNoteBook - Please login to Access your Notes", "success", 3000);
        // eslint-disable-next-line
    }, []);

    const [credentials, setCredentials] = useState({email: "", password: ""})

    const handleSubmit = async (e)=>{
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email: credentials.email, password: credentials.password})
        });
        const token = await response.json()
        if (token.success) {
            // Save the token in Local Storage and Redirect
            await localStorage.setItem("auth-token", token.msg);
            history.push("/");
        }
        else {
            alert("Invalid Credentials")
        }
    }

    const onChange = (e)=>{
        setCredentials({...credentials, [e.target.name]: e.target.value})
    }

    return (
        <>
            <div className="container" style={{ marginTop: "60px" }}>
                <h2>Please Login</h2>
                <form onSubmit={handleSubmit} >
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                        <input type="email" className="form-control" id="email" name="email" onChange={onChange} aria-describedby="emailHelp" />
                        <div id="emailHelp" className ="form-text">We'll never share your email with anyone else.</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                        <input type="password" className="form-control" onChange={onChange} id="password" name="password" />
                    </div>
                    <button type="submit" className="btn btn-primary" >Submit</button>
                </form>
            </div>
        </>
    )
}

export default Login
