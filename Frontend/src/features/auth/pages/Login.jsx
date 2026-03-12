import React, { useState } from 'react'
import "../style/login.scss"
import FormGroup from '../components/FormGroup'
import { Link, useNavigate } from 'react-router'
import { useAuth } from '../hooks/useAuth'
import axios from 'axios'

const BACKEND = import.meta.env.VITE_BACKEND_URL

const Login = () => {
    const { loading, handleLogin, handleGuestLogin } = useAuth()
    const navigate = useNavigate()

    const [email,        setEmail]        = useState("")
    const [password,     setPassword]     = useState("")
    const [guestLoading, setGuestLoading] = useState(false)

    // ── Normal login ──────────────────────
    async function handleSubmit(e) {
        e.preventDefault()
        await handleLogin({ email, password })
        navigate("/")
    }

    // ── Guest login ───────────────────────
    async function onGuestLogin() {
        setGuestLoading(true)
        try {
            await handleGuestLogin()
            navigate("/")
        } catch (err) {
            console.error("Guest login failed:", err)
        } finally {
            setGuestLoading(false)
        }
    }

    return (
        <main className="login-page">
            <div className="form-container">
                <h1>Login</h1>
                <form onSubmit={handleSubmit}>
                    <FormGroup
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        label="Email"
                        placeholder="Enter your email"
                    />
                    <FormGroup
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        label="Password"
                        placeholder="Enter your password"
                    />
                    <button className='button' type="submit" disabled={loading}>
                        {loading ? "Logging in..." : "Login"}
                    </button>
                </form>

                {/* Divider */}
                <div className="auth-divider">
                    <span>or</span>
                </div>

                {/* Guest Login */}
                <button
                    className="guest-btn"
                    onClick={onGuestLogin}
                    disabled={guestLoading}
                >
                    {guestLoading ? "Loading..." : "👤 Continue as Guest"}
                </button>
                <p className="guest-note">No account needed — explore all features instantly</p>

                <p>Don't have an account? <Link to="/register">Register here</Link></p>
            </div>
        </main>
    )
}

export default Login