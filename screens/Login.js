import { useState } from "react";
import Authform from "../components/Auth/Authform";
import { authenticateUser } from "../util/auth";
import LoadingOverlay from "../UI/LoadingOverlay";
import { Alert } from "react-native";

function Login() {
    const [isLoading, setIsLoading] = useState(false);

    async function signupHandler({ email, password }) {
        console.log(email, password);
        setIsLoading(true)
        try {
            const response = await authenticateUser(email, password, 'signInWithPassword');
            console.log(response);

            Alert.alert('User Logged in Succesfull')
        } catch (error) {
            console.log(error.response.data);
          console.log(error.response.data.error.message)
            Alert.alert('Unable to register, please try again later',error.response.data.error.message )
        }
        setIsLoading(false);
    }
    if (isLoading) {
        return <LoadingOverlay message="User Loggin in..." />
    }
    return (
        <Authform type="Login" onAuthenticate={signupHandler} />
    )
}
export default Login;