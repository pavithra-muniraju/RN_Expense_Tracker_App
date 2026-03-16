import { createContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
export const AuthContext = createContext({
    token: '',
    isAuthenticated: false,
    authenticate: () => { },
    logout: () => { }
});

export default function AuthContextProvider({ children }) {

    const [authToken, setAuthToken] = useState();

    function authenticate(token) {
        AsyncStorage.setItem('token', token);

        // need to write a logic to check token validity wrt token expiry 
        console.log('in set token')
        setAuthToken(token);
    }

    function logout() {
        setAuthToken(null);
        AsyncStorage.removeItem('token');
    }

    const value = {
        token: authToken,
        isAuthenticated: !!authToken,
        authenticate: authenticate,
        logout: logout
    }

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>

}