import { Alert, StyleSheet, Text, View } from "react-native";
import Input from "./Input";
import { useContext, useState } from "react";
import Button from "../../UI/Button";
import { getFormatedDate } from "../../util/date";
import { GlobalStyles } from "../../constants/styles";

function ExpenseForm({ isEditing, onCancel, onSubmit, defaultValues }) {

    // const [amount, setAmount] = useState("");
    // const [date, setDate] = useState(new Date());
    // const [desc, setDesc] = useState("");

    // function amountChangeHandler(enteredText) {
    //     setAmount(enteredText);
    // }

    // function dateChangeHandler(enteredText) {
    //     setDate(enteredText)

    // }

    // function descChangeHandler(enteredText) {
    //     setDesc(enteredText);
    // } or u can use below

    const [inputValues, setInputValues] = useState({
        amount: {
            value: defaultValues ? defaultValues.amount.toString() : '',
            isValid: defaultValues ? true : false
        },
        date: {
            value: defaultValues ? getFormatedDate(defaultValues.date) : '',
            isValid: defaultValues ? true : false
        },
        desc: {
            value: defaultValues ? defaultValues.desc : '',
            isValid: !!defaultValues
        },
    })

    function inputChangedHandler(inputId, enteredText) {
        setInputValues((curState) => {
            return {
                ...curState,
                // [inputId]: enteredText
                [inputId]: { value: enteredText, isValid: true }
            }
        });

    }

    function submitHandler() {
        const expenseData = {
            amount: +inputValues.amount.value,
            date: new Date(inputValues.date.value),
            desc: inputValues.desc.value,
        };

        // if (isNaN(expenseData.amount) || expenseData.amount < 1) {
        //     Alert.alert('Amount should be a number greater than 0');
        // } else if (expenseData.date.toString() === 'Invalid Date') {
        //     Alert.alert('Please enter a proper date')
        // } else if (expenseData.desc.trim().length < 1) {
        //     Alert.alert('Please enter the Description')
        // } else {
        //     onSubmit(expenseData)
        // }

        const amountIsValid = !isNaN(expenseData.amount) && expenseData.amount > 0;
        const dateIsValid = expenseData.date?.toString() !== 'Invalid Date';
        const descriptionIsValid = expenseData.desc?.trim().length > 0;

        if (!amountIsValid || !dateIsValid || !descriptionIsValid) {
            // Alert.alert('Invalid input', 'Please check your input values');
            setInputValues((curInputs) => {
                return {
                    amount: { value: curInputs.amount.value, isValid: amountIsValid },
                    date: { value: curInputs.date.value, isValid: dateIsValid },
                    desc: {
                        value: curInputs.desc.value,
                        isValid: descriptionIsValid,
                    },
                };
            });
            return;
        }

        onSubmit(expenseData);
    }

    const formIsInvalid = !inputValues.amount.isValid || !inputValues.date.isValid || !inputValues.desc.isValid;
    return (
        <View style={styles.form}>
            <Text style={styles.title}>Track your Expenses</Text>
            <View style={styles.container}>
                <Input label='Amount'
                    style={styles.rowInputstyle}
                    invalid={!inputValues.amount.isValid} textInputConfig={{
                        keyboardType: 'decimal-pad',
                        onChangeText: inputChangedHandler.bind(this, 'amount'),
                        value: inputValues.amount.value
                    }} />
                <Input label='Date' style={styles.rowInputstyle}
                    invalid={!inputValues.date.isValid} textInputConfig={{
                        placeholder: 'yyyy-mm-dd',
                        maxLength: 10,
                        onChangeText: inputChangedHandler.bind(this, 'date'),
                        value: inputValues.date.value
                    }} />
            </View>

            <Input label='Desc' invalid={!inputValues.desc.isValid}
                textInputConfig={{
                    multiline: true,
                    onChangeText: inputChangedHandler.bind(this, 'desc'),
                    value: inputValues.desc.value
                }} />

            {formIsInvalid && <Text style={styles.errorText}>Invalid Inputs, please  checjk data</Text>}
            <View style={styles.buttonStyles}>
                <Button children='Cancel' mode='flat'
                    onPress={onCancel}
                    style={styles.backButton} />

                <Button children={isEditing ? 'Update' : 'Add'}
                    onPress={submitHandler} style={styles.backButton} />
            </View>
        </View>
    )
}

export default ExpenseForm;

const styles = StyleSheet.create({
    form: {
        marginTop: 20
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center',
        marginBottom: 20,
        textDecorationLine: 'underline'
    },
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    rowInputstyle: {
        flex: 1,
        height: 50
    },
    backButton: {
        minWidth: 120,
        marginHorizontal: 8
    },
    buttonStyles: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    errorText: {
        textAlign: 'center',
        color: GlobalStyles.colors.error500,
        margin: 8
    }
})