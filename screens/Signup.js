import { useContext, useState } from "react";
import Authform from "../components/Auth/Authform";
import { authenticateUser } from "../util/auth";
import LoadingOverlay from "../UI/LoadingOverlay";
import { Alert } from "react-native";
import { AuthContext } from "../store/AuthContext";

function Signup() {
    const [isLoading, setIsLoading] = useState(false);
    
    const authContext = useContext(AuthContext);

    async function signupHandler({ email, password }) {
        setIsLoading(true);
        console.log(email, password);
        try {
            const respo = await authenticateUser(email, password, 'signUp');
            console.log(respo, '1');
            Alert.alert('User Create Succesfully', 'Please Login to continue');
            authContext.authenticate(respo.idToken)
        } catch (error) {
            console.log(error.response.data);
            console.log(error.response.data.error.message)
            Alert.alert('Unable to register, please try again later',error.response.data.error.message )
        }
        setIsLoading(false);

    }

    if (isLoading) {
        return <LoadingOverlay message="Creating User" />
    }
    return (
        <Authform type="Signup" onAuthenticate={signupHandler} />
    )
}

export default Signup;