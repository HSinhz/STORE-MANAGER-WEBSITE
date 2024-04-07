// import axios from "axios";
import Employee from "../components/Manager/Employee/Employee";
import axios from "../config/axios";



const showEmployee = async ( page, limit) => {
    const response =  await axios.get(`/api/v1/mgr/Employee?page=${page}&limit=${limit}`,  {
        withCredentials: true
    })
    return response.data;
}

const createEmployee = async ( Email, Name,  Phone, Address, Description ) => {
    return await axios.post('/api/v1/mgr/createemployee', {
        Email,Name,  Phone, Address,  Description
    }, {
        withCredentials : true
    } )
}

const deleteEmloyee = async ( idEmployee ) => {
    const response = await axios.delete(`/api/v1/mgr/deleteemployee/${idEmployee}`,{
        withCredentials: true
    })
    return response.data;
}

const updateEmployee = async ( idEmployee, Name,  Phone, Address, Description ) => {
    const response = await axios.put(`/api/v1/mgr/updateemployee/${idEmployee}`, {
        Name,  Phone, Address,  Description
    }, {
        withCredentials : true
    });
    return response.data;
}

const showProduct = async ( page, limit) => {
    const response =  await axios.get(`/api/v1/mgr/product/show?page=${page}&limit=${limit}`,  {
        withCredentials: true
    })
    return response.data;
}

const createProduct = async (Name,  Price, ImageUrl, Description ) => {
    return await axios.post('/api/v1/mgr/product/create', {
        Name,  Price, ImageUrl, Description
    }, {
        withCredentials : true
    } )
}

const updateProduct = async (productId, Name, Price, ImageUrl, Description) => {
    let response = await axios.put(`/api/v1/mgr/product/${productId}/update` , {
        Name, Price, ImageUrl, Description
    } ,{
        withCredentials: true
    })
    return response.data;

}

const deleteProduct = async (productId) => {
    let response = await axios.delete(`/api/v1/mgr/product/${productId}/delete` , {
        withCredentials: true
    })
    return response.data;
}

const getProduct = async () => {
    const response = await axios.get('/api/v1/mgr/get/product', {
        withCredentials: true
    })
    return response.data;
}

const getMethodPayment = async () => {
    const response = await axios.get('/api/v1/mgr/methodpayment/show', {
        withCredentials: true
    })
    return response.data;
}

const getStatusOrderById = async ( StatusId) => {
    const response = await axios.get(`/api/v1/mgr/get/order/status?id=${StatusId}`, {
        withCredentials: true
    })
    return response.data;
}

const createOrder = async (dataOrder) =>{
    let response = await  axios.post('/api/v1/mgr/create/order', {
        dataOrder
    } ,{
        withCredentials: true
    })
    return response.data;
    
}

const getOrderWithPagination = async (page, limit ) => {
    let response = await axios.get(`/api/v1/mgr/show/order?page=${page}&limit=${limit}`,{
        withCredentials: true
    })
    return response.data;
}

const getCustomerById = async (CustomerId) => {
    let response = await axios.get(`/api/v1/mgr/get/customer?id=${CustomerId}`,{
        withCredentials: true
    })
    return response.data;
}

const getProductById = async (ProductId) => {
    let response = await axios.get(`/api/v1/mgr/get/product/order?id=${ProductId}`, {
        withCredentials: true
    })
    return response.data;
}

const getMethodPaymentById = async (MethodId) => {
    let response = await axios.get(`/api/v1/mgr/get/order/method/payment?id=${MethodId}`, {
        withCredentials: true
    })
    return response.data;
}

const getReportSalesWeek = async () => {
    let response = await axios.get('/api/v1/mgr/get/sales/week' ,{
        withCredentials: true
    })
    return response.data;
}

const getEmployeeWithId = async (EmployeeId) => {
    let response = await axios.get(`/api/v1/mgr/get/employee/${EmployeeId}` ,{
        withCredentials: true
    })
    return response.data;
}
export {
    createEmployee,
    showEmployee,
    deleteEmloyee,
    updateEmployee,
    showProduct,
    createProduct,
    updateProduct,
    deleteProduct,
    getProduct,
    getMethodPayment,
    getStatusOrderById,
    createOrder,
    getOrderWithPagination,
    getCustomerById,
    getProductById,
    getMethodPaymentById,
    getReportSalesWeek,
    getEmployeeWithId
}