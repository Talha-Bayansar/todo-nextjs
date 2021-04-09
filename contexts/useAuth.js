import { useState, useEffect, useContext, createContext } from "react";
import { useRouter } from "next/router";
import axios from "axios";

const AuthContext = createContext();

export function AuthProvider(props) {
    const [user, setUser] = useState({});
    const router = useRouter();

    const signIn = async (email, password) => {
        console.log("LOGIN");
        await axios
            .post(`${process.env.NEXT_PUBLIC_API_URL}/auth/local`, {
                identifier: email,
                password: password,
            })
            .then((res) => {
                setUser(res.data);
                router.push("/");
            })
            .catch((error) => {
                console.log("An error occured:", error.response);
            });
    };

    const signOut = () => {
        console.log("LOGOUT");
    };

    const api = {
        user,
        setUser,
        signIn,
        signOut,
    };

    return (
        <AuthContext.Provider value={api}>
            {props.children}
        </AuthContext.Provider>
    );
}
export const useAuth = () => useContext(AuthContext);
