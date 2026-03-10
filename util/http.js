import axios from "axios";
const url = 'https://rn-basic-51130-default-rtdb.firebaseio.com/'

export async function storeExpense(expenseData) {
    const response = await axios.post(url + 'expenses.json', expenseData);
    const id  =  response.data.name;
    return id;
}

export async function getExpenses() {
    const response = await axios.get(url + 'expenses.json');
    console.log(response.data)
    const expenses = [];
    for (const key in response.data) {
        const expenseObj = {
            id: key,
            amount: response.data[key].amount,
            date: new Date(response.data[key].date),
            desc: response.data[key].desc
        }
        expenses.push(expenseObj);
    }
    return expenses
}