import axios from "axios";
const API_KEY = 'PAIzaSyCKJ1V1_XA_Pvt2XxKefwUtnqRwElBGVVM_Muniraju'


export async function authenticateUser(email, password, mode) {
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:${mode}?key=${API_KEY}`
    const  body =  {
        email: email,
        password: password,
        returnSecureToken: true
    }
    const response = await axios.post(url, body)
    return response.data;
}