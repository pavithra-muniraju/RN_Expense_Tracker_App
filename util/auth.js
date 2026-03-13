import axios from "axios";
const API_KEY = 'AIzaSyDOEueG0jEG41k7c1JZ0iQmDRqBVqC6OIE'


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