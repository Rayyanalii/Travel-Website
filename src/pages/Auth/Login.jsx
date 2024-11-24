import React, { useState } from 'react';
import './Auth.css';
import { useAuth } from './AuthContext';


const Login = ({ setModal, closeModal }) => {
    const { login } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');


    function handleLoginClick() {
        setModal('signup');
    }

    function handleEmailChange(e) {
        setError('')
        setEmail(e.target.value);
    }

    function handlePasswordChange(e) {
        setError('')

        setPassword(e.target.value);
    }

    function handleRememberMeChange() {
        setError('')

        setRememberMe(!rememberMe);
    }

    async function handleSubmit(e) {
        e.preventDefault();

        const formData = new FormData();
        formData.append('email', email);
        formData.append('password', password);

        try {
            const res = await fetch("http://localhost:3000/api/login", {
                method: 'POST',
                body: formData,
            });
            const data = await res.json();
            if (res.ok) {
                if (data[0].USERROLE == "Admin" && location.pathname != "/admin") {
                    setError("Email already exists");
                    setEmail('')
                    setPassword('')
                    setRememberMe('')
                    return
                }
                setEmail('');
                setPassword('');
                setError('');
                setRememberMe(false)
                setSuccess("Login Successful!");

                localStorage.setItem('email', data[0].EMAIL);
                localStorage.setItem('username', data[0].FULLNAME);

                localStorage.setItem('role', data[0].USERROLE);
                localStorage.setItem('userID', data[0].USERID);
                const timer = setTimeout(() => {
                    closeModal(false);
                    login();
                }, 1000);
            } else {
                setError(data.message || 'Invalid Email Or Password');
                setPassword('')
            }
        } catch (err) {
            setError('Something went wrong');
        }
    }

    return (
        <div className="auth-container">
            <div className="auth-form">
                <div className="image-section">
                    <img
                        src='/Uploads/LoginSignup.png'
                        alt="Mountain"
                        className="auth-image"
                    />
                    <img id="loginSignupLogo" src="/Uploads/MajesticTravels Logo.png" alt="Logo" />
                </div>
                <div className="form-section">
                    <div className="auth-header">
                        <button className="active-btn">Login</button>
                        <button className="inactive-btn" onClick={handleLoginClick}>Signup</button>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={handleEmailChange}
                            required
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={handlePasswordChange}
                            required
                        />
                        <div className="remember">
                            <div>
                                <input
                                    type="checkbox"
                                    checked={rememberMe}
                                    onChange={handleRememberMeChange}
                                />
                            </div>
                            <div className='rem-text'>Remember me</div>
                        </div>
                        {error && <p className="error-text">{error}</p>}
                        {success && <div className="success-text">{success}</div>}

                        <button className="login-btn-new" type='submit'>Login</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
