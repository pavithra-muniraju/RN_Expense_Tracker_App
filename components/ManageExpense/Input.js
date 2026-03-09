import { StyleSheet, Text, TextInput, View } from "react-native";
import { GlobalStyles } from "../../constants/styles";

function Input({ label, style, textInputConfig }) {

    const inputStyles = [styles.input]
    
    if(textInputConfig && textInputConfig.multiline) {
        inputStyles.push(styles.desc)
    }
    return (
        <View style={[styles.inputContainer, style]}>
            <Text style={styles.label}>{label}</Text>
            <TextInput style={inputStyles} {...textInputConfig} />
        </View>
    )
}

export default Input;

const styles = StyleSheet.create({
    inputContainer: {
        marginVertical: 8,
        marginHorizontal: 8,
    },
    label: {
        fontSize: 14,
        color: GlobalStyles.colors.primary100,
        marginBottom: 4
    },
    input: {
        backgroundColor: GlobalStyles.colors.primary100,
        color: GlobalStyles.colors.primary800,
        padding: 6,
        borderRadius: 8,
        fontSize: 16,
    },
    desc: {
        minHeight: 100,
        textAlignVertical: 'top'
    }
})