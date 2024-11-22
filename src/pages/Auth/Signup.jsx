// src/components/Signup.js
import React, { useState } from 'react';
import './Auth.css';


const Signup = ({ setModal }) => {
    const { login } = useAuth();

    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [termsAccepted, setTermsAccepted] = useState(false);
    const [error, setError] = useState('');
    const [success, setsuccess] = useState('')

    const handleLoginClick = () => {
        setModal('login');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();


        if (password !== confirmPassword) {
            setError('Passwords do not match.');
            return;
        }

        if (!termsAccepted) {
            setError('You must accept the Terms and Conditions.');
            return;
        }

        setError('');
        setIsSubmitting(true);

        const formData = new FormData();
        formData.append('fullName', fullName);
        formData.append('email', email);
        formData.append('password', password);

        try {
            const res = await fetch("http://localhost:3000/api/signup", {
                method: 'POST',
                body: formData,
            });

            if (!res.ok) {
                throw new Error('Failed to sign up. Please try again.');
            }

            const data = await res.json();

            setFullName('')
            setEmail('')
            setPassword('')
            setConfirmPassword('')
            localStorage.setItem('email', data[0].EMAIL);
            localStorage.setItem('username', data[0].FULLNAME);

            localStorage.setItem('role', data[0].USERROLE);
            setsuccess("Registration Successful")


            setTimeout(() => {
                setModal(false);
                login();

            }, 2000);

        } catch (error) {
            setError(error.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-form">
                <div className="image-section">
                    <img
                        src='/Uploads/LoginSignup.png'
                        alt="Mountain"
                        className="auth-image"
                    />
                    <img id="loginSignupLogo" src="Uploads/MajesticTravels Logo.png" alt="Logo" />
                </div>
                <div className="form-section">
                    <div className="auth-header">
                        <button className="inactive-btn" onClick={handleLoginClick}>Login</button>
                        <button className="active-btn">Signup</button>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            placeholder="Full Name"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            required
                        />
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <input
                            type="password"
                            placeholder="Re-Enter Password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                        <div className="remember">
                            <input
                                type="checkbox"
                                checked={termsAccepted}
                                onChange={(e) => setTermsAccepted(e.target.checked)}
                            />
                            <div className='rem-text'>I accept all Terms and Conditions</div>
                        </div>
                        {error && <div className="error-text">{error}</div>}
                        {success && <div className="success-text">{success}</div>}
                        <button className="signup-btn-new" type="submit">Signup</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Signup;
