import React, { useState } from 'react'
import './AdminLogin.css'

const AdminLogin = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();

    }

    return (
        <>
            <h1 id='adminLoginHeading'>Admin Panel Login</h1>
            <div className="adminLoginContainer">

                <div className='imgContainer'>
                    <img src="/Uploads/MajesticTravels Logo.png" alt="Logo" />
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="formContainer">
                        <div className="admininput">
                            <label htmlFor="user">Username:</label>
                            <input
                                type="text"
                                name="user"
                                id="user"
                                value={username}
                                onChange={handleUsernameChange}
                                required
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
                            />
                        </div>
                        <input id="subBtn" type="submit" value="Login" />
                    </div>
                </form>
            </div>
        </>
    )
}

export default AdminLogin
