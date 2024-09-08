import { useEffect, useState } from "react"

// token, id: user.id, role: user.role, name: user.name, username: user.username, permit: user.permit
interface User{
    token: string,
    id: number,
    role: string,
    name: string,
    username: string,
    permit: string[]
}

export function useUser() {
    const [user, setUser] = useState<User>()

    function setUserInfo(info: User) {
        setUser(info);
        localStorage.setItem('user', JSON.stringify(info))
    }

    function clearUserInfo() {
        setUser(undefined);
    }

    function loadUserInfo() {
        if(!user) {
            const info = JSON.parse(localStorage.getItem("user") || "{}")
            setUser(info)
        }
    }

    useEffect(() => {
        loadUserInfo()
    }, [])

    return {
        user,
        setUserInfo,
        loadUserInfo,
        clearUserInfo,
    }
}