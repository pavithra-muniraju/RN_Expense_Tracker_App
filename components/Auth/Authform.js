import { useState } from "react";
import { Alert, StyleSheet, Text, TextInput, TouchableWithoutFeedback, View } from "react-native";
import { GlobalStyles } from "../../constants/styles";
import Button from "../../UI/Button";
import { useNavigation } from "@react-navigation/native";
import Input from "../ManageExpense/Input";

function Authform({ type }) {
    const navigation = useNavigation();
    const [credentials, setCredentials] = useState({
        email: {
            value: '',
            isValid: true
        },
        password: {
            value: '',
            isValid: true
        },
        cPassword: {
            value: '',
            isValid: true
        },
    })

    function switchHandler() {
        if (type == 'Login') {
            navigation.navigate("Signup")
        } else {
            navigation.navigate("Login")
        }
    }

    function inputChangedHandler(inputId, enteredText) {
        setCredentials((curState) => {
            return {
                ...curState,
                // [inputId]: enteredText
                [inputId]: { value: enteredText, isValid: true }
            }
        });

    }
    function loginSignupHandler() {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!emailRegex.test(credentials.email.value)) {
            credentials.email.isValid = false;
            Alert.alert('Invalid Email')
        } else if(credentials.password.value.length < 1) {
            credentials.password.isValid = false;
            Alert.alert('Please enter password')
        }
        if(type == 'Signup' && credentials.cPassword.value !== credentials.password.value) {
           credentials.cPassword.isValid = false
           Alert.alert('Passwords do not match')
        }
        console.log(credentials)
    }
    return (
        <View style={styles.outerContainer}>
            <View style={styles.container}>
                {/* <Text style={styles.label}>Email Address</Text>
                <TextInput onChangeText={inputChangedHandler.bind(this,'email')} value={credentials.email.value} style={styles.input} /> */}

                <Input label='Email Address'
                    invalid={!credentials.email.isValid} textInputConfig={{
                        onChangeText: inputChangedHandler.bind(this, 'email'),
                        value: credentials.email.value
                    }} />

                <Input label='Password'
                    invalid={!credentials.password.isValid} textInputConfig={{
                        onChangeText: inputChangedHandler.bind(this, 'password'),
                        value: credentials.password.value,
                        secureTextEntry: true
                    }} />
                {/* <Text style={styles.label}>Password</Text>
                <TextInput onChangeText={setPassword} value={password} style={styles.input} secureTextEntry={true} /> */}

                {type === 'Signup' ?
                    <Input label='Confirm Password'
                        invalid={!credentials.cPassword.isValid} textInputConfig={{
                            onChangeText: inputChangedHandler.bind(this, 'cPassword'),
                            value: credentials.cPassword.value,
                            secureTextEntry: true
                        }} /> : <></>
                }

                <Button onPress={loginSignupHandler} style={styles.width}>{type}</Button>
                <TouchableWithoutFeedback onPress={switchHandler}>
                    <Text style={styles.switch}>{type == 'Login' ? 'Create new User' : 'Back to Login'}</Text>
                </TouchableWithoutFeedback>
                {/* <Button mode="flat" onPress={switchHandler}></Button> */}
            </View>
        </View>
    )
}

export default Authform;

const styles = StyleSheet.create({
    outerContainer: {
        // backgroundColor: GlobalStyles.colors.primary50,
        height: '100%'
    },
    container: {
        marginTop: 32,
        marginHorizontal: 24,
        backgroundColor: GlobalStyles.colors.primary800,
        padding: 20,
        borderRadius: 8
    },
    label: {
        color: 'white'
    },
    input: {
        backgroundColor: GlobalStyles.colors.primary50,
        borderRadius: 8,
        marginBottom: 20
    },
    switch: {
        textAlign: 'center',
        color: 'white',
        fontSize: 14,
        marginVertical: 10
    },
    width: {
        marginHorizontal: 10,
        marginVertical: 10,
        borderRadius: 10
    }
})