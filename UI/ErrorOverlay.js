import {StyleSheet, Text, View } from "react-native";
import { GlobalStyles } from "../constants/styles";
import Button from "./Button";

function ErrorOverlay({message, onConfirm}) {
    return(
        <View style={styles.conatiner}>
            <Text style={[styles.text, styles.title]}>Error Occured</Text>
            <Text style={styles.text}>{message}</Text>
            <Button onPress={onConfirm} >Okay</Button>
        </View>
    )
}

export default ErrorOverlay;

const styles = StyleSheet.create({
    conatiner: {
        flex: 1, 
        justifyContent: 'center',
        alignItems: 'center',
        padding: 24,
        backgroundColor: GlobalStyles.colors.primary700
    },
    text: {
        textAlign: 'center',
        marginBottom: 8,
        color: 'white'
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',

    }
})