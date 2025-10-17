"use client";
import { useRouter } from "next/navigation";

import React, {
    createContext,
    useContext,
    useState,
    useCallback,
    useEffect,
    ReactNode,
} from "react";

interface AuthContextData {
    signIn: (token:string, user: Usuario) => void;
    signOut: unknown;
    token: string;
    user: Usuario;
}

interface Usuario {
    email: string;
    id: number;
    nome: string;
    roles: string;
}  


const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export default function AuthContextProvider({ children }: { readonly children: ReactNode }) {
    const [token, setToken] = useState("");
    const [user, setUser] = useState<Usuario>({
        id: 0,
        nome: "",
        email: "",
        roles: ""
    });

    const router = useRouter();

    const loadStoragedData = useCallback(async () => {

        const token = await localStorage.getItem("@Makers:token")
        const user = await localStorage.getItem("@Makers:user")

        if (token && user) {
            setToken(token);
            setUser(JSON.parse(user));
        }
    }, []);

    const signIn = useCallback(async (acess_token: string, payload: Usuario) => {
    console.log("teste SignIn - armazenar token");
    localStorage.setItem("@Makers:token", acess_token);
    console.log("Token armazenado no storage");

    setToken(acess_token);

    console.log("teste armazenar info usuário");
    localStorage.setItem("@Makers:user", JSON.stringify(payload));
    console.log("Usuário armazenado no storage");

    setUser(payload);
}, []);

    const signOut = useCallback(async () => { //remove token e user do localStorage e remove token do useState
        await localStorage.removeItem("@Makers:token");
        localStorage.removeItem("@Makers:user");
        setToken("");
        setUser({
            id: 0,
            nome: "",
            email: "",
            roles: ""
        });
        router.push("/login");
    }, []);

    useEffect(() => {
        loadStoragedData();
    }, []);

    return (
        <AuthContext.Provider
            value={{
                signIn,
                signOut,          
                token,
                user,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    
    const context = useContext(AuthContext);
    console.log(context)
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}