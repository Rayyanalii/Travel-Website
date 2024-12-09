import React, { useState } from 'react'
import './AdminLogin.css'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../Auth/AuthContext';


const AdminLogin = () => {
    const { login } = useAuth();

    const [email, setemail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("")

    const navigate = useNavigate();

    const handleemailChange = (e) => {
        setMessage('')
        setemail(e.target.value);
    }

    const handlePasswordChange = (e) => {
        setMessage('')

        setPassword(e.target.value);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();


        const formdata = new FormData();
        formdata.append('email', email);
        formdata.append('password', password);


        try {
            const res = await fetch("http://localhost:3000/api/login", {
                method: 'POST',
                body: formdata,
            });

            if (res.ok) {
                const data = await res.json();
                setMessage("Login Successful")


                sessionStorage.setItem('username', data[0].FULLNAME);
                sessionStorage.setItem('email', data[0].EMAIL);
                sessionStorage.setItem('role', data[0].USERROLE);

                setemail('')
                setPassword('')
                login();

                navigate("/admin/dashboard");

            }
            else {
                setMessage("Invalid Email or password")
                setPassword("")
                console.error('Login failed: ', res.statusText);
            }


        }
        catch (err) {
            console.error("Login Failed", err);

        }

    }

    return (
        <>
            <h1 id='adminLoginHeading'>Admin Panel Login</h1>
            <div className="adminLoginContainer">

                <div className='imgContainer'>
                    <img src="/MajesticTravels Logo.png" alt="Logo" />
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="formContainer">
                        <div className="admininput">
                            <label htmlFor="user">Email:</label>
                            <input
                                type="email"
                                name="user"
                                id="user"
                                value={email}
                                onChange={handleemailChange}
                                required
                                placeholder='Email'

                            />
                        </div>
                        <div className="admininput">
                            <label htmlFor="pass">Password:</label>
                            <input
                                type="password"
                                name="pass"
                                id="pass"
                                value={password}
                                onChange={handlePasswordChange}
                                required
                                placeholder='Password'
                            />
                        </div>
                        {message && <>
                            <p>{message}</p>
                        </>}
                        <input id="subBtn" className='adminLoginButton' type="submit" value="Login" />
                    </div>
                </form>
            </div>
        </>
    )
}

export default AdminLogin
