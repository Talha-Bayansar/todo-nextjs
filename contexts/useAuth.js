import { useState, useEffect, useContext, createContext } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { destroyCookie, parseCookies, setCookie } from "nookies";

const AuthContext = createContext();

export function AuthProvider(props) {
    const [user, setUser] = useState({});
    const [isLogout, setIsLogout] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    useEffect(() => {
        async function getUser() {
            setUser(JSON.parse(parseCookies().user));
        }
        if (parseCookies().user) {
            getUser();
        }
    }, []);

    const signIn = async (email, password) => {
        setIsLoading(true);
        await axios
            .post(`${process.env.NEXT_PUBLIC_API_URL}/auth/local`, {
                identifier: email,
                password: password,
            })
            .then((res) => {
                setUser(res.data.user);
                setCookie(null, "jwt", res.data.jwt);
                setCookie(null, "user", JSON.stringify(res.data.user));
                setCookie(null, "userId", res.data.user.id);
                setErrorMessage(null);
                setIsLoading(false);
                router.push("/");
            })
            .catch((error) => {
                setIsLoading(false);
                setErrorMessage("Failed to login!\nTry again.");
            });
    };

    const signOut = () => {
        setUser({});
        destroyCookie(null, "jwt");
        destroyCookie(null, "user");
        destroyCookie(null, "userId");
        router.push("/login");
    };

    const api = {
        user,
        setUser,
        signIn,
        signOut,
        isLogout,
        setIsLogout,
        errorMessage,
        isLoading,
    };

    return (
        <AuthContext.Provider value={api}>
            {props.children}
        </AuthContext.Provider>
    );
}
export const useAuth = () => useContext(AuthContext);
