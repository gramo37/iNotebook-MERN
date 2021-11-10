import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router'


const Signup = (props) => {
    let history = useHistory();

    const [credentials, setCredentials] = useState({ name: "", email: "", password: "" })


    useEffect(() => {

        props.alertShow("Welcome to iNoteBook - SignUp to create a free account", "success", 3000);
        // eslint-disable-next-line
    }, [])

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/auth/createUser", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: credentials.name, email: credentials.email, password: credentials.password })
        });
        const token = await response.json()

        if (token.success) {
            props.alertShow("User created please login", "success", 3000);
            // alert("User created please login")
            history.push("/login");
        }
        else {
            props.alertShow("Invalid Credentials", "danger", 3000);
        }
    }

    return (
        <>
            <div className="container" style={{ marginTop: "60px" }}>
                <h2>Please SignUp</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Name</label>
                        <input type="text" className="form-control" id="name" name="name" onChange={onChange} aria-describedby="emailHelp" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                        <input type="email" className="form-control" id="email" name="email" onChange={onChange} aria-describedby="emailHelp" />
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                        <input type="password" className="form-control" name="password" onChange={onChange} id="exampleInputPassword1" />
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        </>
    )
}

export default Signup
