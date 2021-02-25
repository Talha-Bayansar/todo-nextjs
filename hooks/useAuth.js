import { createContext, useContext, useEffect, useState } from "react";
import firebaseInit from "../db/firestore";
import "firebase/auth";
import { useRouter } from "next/router";

const authContext = createContext({ user: {} });
const { Provider } = authContext;
export function AuthProvider(props) {
    const auth = useAuthProvider();
    return <Provider value={auth}>{props.children}</Provider>;
}
export const useAuth = () => {
    return useContext(authContext);
};

// Provider hook that creates an auth object and handles it's state
const useAuthProvider = () => {
    const [user, setUser] = useState(null);

    const router = useRouter();
    const login = async (email, password) => {
        const firebase = await firebaseInit();
        const auth = firebase.auth();
        auth.signInWithEmailAndPassword(email, password)
            .then((user) => {
                setUser(user.user);
                router.push("/");
            })
            .catch((e) => console.log(e));
    };
    const logout = async () => {
        const firebase = await firebaseInit();
        const auth = firebase.auth();
        return auth.signOut().then(() => setUser(null));
    };
    const handleAuthStateChanged = (user) => {
        setUser(user);
    };
    useEffect(() => {
        const init = async () => {
            const firebase = await firebaseInit();
            const auth = firebase.auth();
            const unsub = auth.onAuthStateChanged(handleAuthStateChanged);
            unsub();
        };
        init();
    }, []);
    // const createUser = (user) => {
    //     return db
    //         .collection("users")
    //         .doc(user.uid)
    //         .set(user)
    //         .then(() => {
    //             setUser(user);
    //             return user;
    //         })
    //         .catch((error) => {
    //             return { error };
    //         });
    // };
    // const signUp = ({ name, email, password }) => {
    //     return auth
    //         .createUserWithEmailAndPassword(email, password)
    //         .then((response) => {
    //             auth.currentUser.sendEmailVerification();
    //             return createUser({ uid: response.user.uid, email, name });
    //         })
    //         .catch((error) => {
    //             return { error };
    //         });
    // };
    return {
        user,
        login,
        logout,
    };
};
