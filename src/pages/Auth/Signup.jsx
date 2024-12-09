import React, { useEffect, useState } from 'react';
import './Auth.css';

import { FaEye, FaEyeSlash } from "react-icons/fa";

import { useAuth } from './AuthContext';

const Signup = ({ setModal, closeModal }) => {
    const { login } = useAuth();

    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [termsAccepted, setTermsAccepted] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setshowConfirmPassword] = useState(false);



    const handleLoginClick = () => {
        setModal('login');
    };

    // Separate onChange functions
    function handleFullNameChange(event) {
        setError('')
        setSuccess('')
        setFullName(event.target.value);
    }

    function handleEmailChange(event) {
        setError('')
        setSuccess('')
        setEmail(event.target.value);
    }

    function handlePasswordChange(event) {
        setError('')
        setSuccess('')
        setPassword(event.target.value);
    }

    function handleConfirmPasswordChange(event) {
        setError('')
        setSuccess('')
        setConfirmPassword(event.target.value);
    }

    function handleTermsChange(event) {
        setError('')
        setSuccess('')
        setTermsAccepted(event.target.checked);
    }

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

            const data = await res.json();


            if (!res.ok) {
                setError(data.error || "An Error Occurred. Please try again later");
                return;
            }


            setFullName('');
            setEmail('');
            setPassword('');
            setConfirmPassword('');
            localStorage.setItem('email', email);
            localStorage.setItem('username', fullName);
            localStorage.setItem('role', "User");
            localStorage.setItem('userID', data.rows[0].USERID);
            console.log(localStorage.getItem('userID'));


            setSuccess(data.message || "Registration Successful!");

            const timer = setTimeout(() => {
                closeModal(false);
                login();
            }, 2000);

        } catch (error) {
            setError(error.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword((prev) => !prev);
    };

    const toggleConfirmPasswordVisibility = () => {
        setshowConfirmPassword((prev) => !prev);
    };


    return (
        <div className="auth-container">
            <div className="auth-form">
                <div className="image-section">
                    <img
                        src='/LoginSignup.png'
                        alt="Mountain"
                        className="auth-image"
                    />
                    <img id="loginSignupLogo" src="/MajesticTravels Logo.png" alt="Logo" />
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
                            onChange={handleFullNameChange}
                            required
                        />
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={handleEmailChange}
                            required
                        />
                        <div className='passwordEyeContainer'>
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="Password"
                                value={password}
                                onChange={handlePasswordChange}
                                required
                            />
                            <button
                                type="button"
                                onClick={togglePasswordVisibility}
                            >
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>
                        <div className='passwordEyeContainer'>
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                placeholder="Re-Enter Password"
                                value={confirmPassword}
                                onChange={handleConfirmPasswordChange}
                                required
                            />
                            <button
                                type="button"
                                onClick={toggleConfirmPasswordVisibility}
                            >
                                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>
                        <div className="remember">
                            <input
                                type="checkbox"
                                checked={termsAccepted}
                                onChange={handleTermsChange}
                            />
                            <div className='rem-text'>I accept all Terms and Conditions</div>
                        </div>
                        {error && <div className="error-text">{error}</div>}
                        {success && <div className="success-text">{success}</div>}
                        <button className="signup-btn-new" type="submit" disabled={isSubmitting}>
                            {isSubmitting ? 'Signing up...' : 'Signup'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Signup;
