// import axios from "axios";
import axios from "../config/axios";

const loginUser = async ( Email, Password ) => {
    const response = await axios.post('/api/v1/login', {
        Email, Password
    } , {
        withCredentials: true
    })
    return response.data;
}

const registerUser = async ( Email, Password, Name, Address, Phone, ShopName, ShopAddress ) => {
    const response = await axios.post('/api/v1/shopowner/register', {
        Email, Password, Name, Address, Phone, ShopName, ShopAddress
    } , {
        withCredentials: true
    })
    return response.data;
}

const homePage = async () => {
    const response =await axios.get('/api/v1/home',{
        withCredentials: true
    })
    return response.data;
}

export {
    loginUser,
    registerUser,
    homePage,

}