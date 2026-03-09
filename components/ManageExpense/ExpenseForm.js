import { StyleSheet, Text, View } from "react-native";
import Input from "./Input";
import { useContext, useState } from "react";
import Button from "../../UI/Button";
import { getFormatedDate } from "../../util/date";

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
        amount: defaultValues ? defaultValues.amount.toString() : '',
        date: defaultValues ? getFormatedDate(defaultValues.date) : '',
        desc: defaultValues ? defaultValues.desc : ''
    })

    function inputChangedHandler(inputId, enteredText) {
        setInputValues((curState) => {
            return {
                ...curState,
                [inputId]: enteredText
            }
        });
       
    }


    function submitHandler() {
        const expenseData = {
            amount: +inputValues.amount,
            date: new Date(inputValues.date),
            desc: inputValues.desc
        }

         onSubmit(expenseData)
    }
    // function confirmHandler() {
    //     if (isEditing) {
    //         expensesContext.updateExpense(expenseId,
    //             inputValues
    //         )
    //     } else {
    //         expensesContext.addExpense(
    //             {
    //                 desc: 'test',
    //                 amount: 99,
    //                 date: new Date('2026-03-04')
    //             }
    //         )
    //     }
    //     navigation.goBack();
    // }
    return (
        <View style={styles.form}>
            <Text style={styles.title}>Track your Expenses</Text>
            <View style={styles.container}>
                <Input label='Amount' style={styles.rowInputstyle} textInputConfig={{
                    keyboardType: 'decimal-pad',
                    onChangeText: inputChangedHandler.bind(this, 'amount'),
                    value: inputValues.amount
                }} />
                <Input label='Date' style={styles.rowInputstyle} textInputConfig={{
                    placeholder: 'yyyy-mm-dd',
                    maxLength: 10,
                    onChangeText: inputChangedHandler.bind(this, 'date'),
                    value: inputValues.date
                }} />
            </View>

            <Input label='Desc' textInputConfig={{
                multiline: true,
                onChangeText: inputChangedHandler.bind(this, 'desc'),
                value: inputValues.desc
            }} />

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
    }
})