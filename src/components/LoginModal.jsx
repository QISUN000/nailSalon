import React, { useState } from 'react';
import { jwtDecode } from "jwt-decode";
import { GoogleLogin } from '@react-oauth/google';

const LoginModal = ({ isOpen, onClose, onLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [step, setStep] = useState('email');

    if (!isOpen) return null;

    const checkUserExists = async (email) => {
        // This should be replaced with an actual API call
        // For now, we'll simulate a check
        return new Promise(resolve => setTimeout(() => resolve(Math.random() > 0.5), 500));
    };

    const handleEmailSubmit = async (e) => {
        e.preventDefault();
        const userExists = await checkUserExists(email);
        setStep(userExists ? 'password' : 'signup');
    };

    const handlePasswordSubmit = async (e) => {
        e.preventDefault();
        // Here you would typically send a login request to your backend
        console.log('Logging in with:', email, password);
        onLogin('email', email);
    };

    const handleSignUp = () => {
        // Redirect to sign up page or show sign up form
        console.log('Redirecting to sign up with email:', email);
        onLogin('signup', email);
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
        <div>
            <p className="mb-2">No account found for {email}. Would you like to sign up?</p>
            <button
                onClick={handleSignUp}
                className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800"
            >
                Sign Up
            </button>
        </div>
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

                <GoogleLogin
                    width="400"
                    onSuccess={credentialResponse => {
                        const decoded = jwtDecode(credentialResponse.credential);
                        console.log(credentialResponse);
                        console.log(decoded);
                        onLogin('google', decoded.email);
                    }}
                    onError={() => {
                        console.log('Login Failed');
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