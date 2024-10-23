import React, { useState } from 'react';
import { jwtDecode } from "jwt-decode";
import { GoogleLogin } from '@react-oauth/google';
import { checkEmail, login, register, googleLogin, setAuthToken } from '../api/api';

const LoginModal = ({ isOpen, onClose, onLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [step, setStep] = useState('email');
    const [error, setError] = useState('');

    if (!isOpen) return null;

    const handleSuccessfulLogin = (method, email, token, role) => {
        setAuthToken(token);
        onLogin(method, email, token, role);
        //onClose();
    };

    const handleEmailSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const exists = await checkEmail(email);
            setStep(exists ? 'password' : 'signup');
        } catch (error) {
            setError('Error checking email. Please try again.');
        }
    };

    const handlePasswordSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const data = await login(email, password);
            handleSuccessfulLogin('email', email, data.accessToken, data.role);
        } catch (error) {
            setError('Invalid email or password. Please try again.');
        }
    };

    const handleSignUp = async (e) => {
        e.preventDefault();
        setError('');
        try {
            console.log('Signing up with:', { email, name });
            
            // First register the user
            const registerResponse = await register(email, password, name);
            console.log('Register response:', registerResponse);
    
            if (registerResponse.success) {
                // After successful registration, perform login
                const loginData = await login(email, password);
                console.log('Login response after registration:', loginData);
    
                if (loginData.accessToken) {
                    handleSuccessfulLogin('signup', email, loginData.accessToken, loginData.role);
                } else {
                    throw new Error('Login failed after registration');
                }
            } else {
                throw new Error(registerResponse.message || 'Registration failed');
            }
        } catch (error) {
            console.error('Signup/Login error:', error);
            setError(error.message || 'Error during signup process');
        }
    };

    const handleGoogleLogin = async (credentialResponse) => {
        try {
            const decoded = jwtDecode(credentialResponse.credential);
            const data = await googleLogin(credentialResponse.credential);
            handleSuccessfulLogin('google', decoded.email, data.accessToken, 'CUSTOMER');
        } catch (error) {
            setError('Error with Google login. Please try again.');
        }
    };

    const renderEmailStep = () => (
        <form onSubmit={handleEmailSubmit}>
            <input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md mb-3"
                required
            />
            <button
                type="submit"
                className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800"
            >
                Continue
            </button>
        </form>
    );

    const renderPasswordStep = () => (
        <form onSubmit={handlePasswordSubmit}>
            <p className="mb-2">Enter your password to log in as {email}</p>
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md mb-3"
                required
            />
            <button
                type="submit"
                className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800"
            >
                Log in
            </button>
        </form>
    );

    const renderSignUpStep = () => (
        <form onSubmit={handleSignUp}>
            <p className="mb-2">Create an account for {email}</p>
            <input
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md mb-3"
                required
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md mb-3"
                required
            />
            <button
                type="submit"
                className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800"
            >
                Sign Up
            </button>
        </form>
    );

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">Log in or sign up</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                        ×
                    </button>
                </div>
                <p className="text-gray-600 mb-4">Log in or sign up to complete your booking</p>

                {error && <p className="text-red-500 mb-4">{error}</p>}

                <GoogleLogin
                    width="400"
                    onSuccess={handleGoogleLogin}
                    onError={() => {
                        setError('Google Login Failed');
                    }}
                />

                <div className="relative my-4">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-300"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                        <span className="px-2 bg-white text-gray-500">OR</span>
                    </div>
                </div>

                {step === 'email' && renderEmailStep()}
                {step === 'password' && renderPasswordStep()}
                {step === 'signup' && renderSignUpStep()}
            </div>
        </div>
    );
};

export default LoginModal;