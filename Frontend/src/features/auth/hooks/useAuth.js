import { register, login, getMe, logout, guestLogin } from "../services/auth.api";
import { useContext, useEffect } from "react";
import { AuthContext } from "../auth.context";

export const useAuth = () => {
    const context = useContext(AuthContext)
    const { user, setUser, loading, setLoading } = context

    async function handleRegister({ email, username, password }) {
        setLoading(true)
        const data = await register({ email, username, password })
        setUser(data.user)
        setLoading(false)
    }

    async function handleLogin({ email, username, password }) {
        setLoading(true)
        const data = await login({ email, username, password })
        setUser(data.user)
        setLoading(false)
    }

    async function handleGuestLogin() {
        setLoading(true)
        const data = await guestLogin()
        setUser(data.user)
        setLoading(false)
    }

    async function handleGetMe() {
        setLoading(true)
        const data = await getMe()
        setUser(data.user)
        setLoading(false)
    }

    async function handleLogout() {
        setLoading(true)
        await logout()
        setUser(null)
        setLoading(false)
    }

    useEffect(() => {
        handleGetMe()
    }, [])

    return {
        user, loading,
        handleRegister,
        handleLogin,
        handleGuestLogin,
        handleGetMe,
        handleLogout
    }
}