import axios from 'axios';
axios.defaults.headers.common['token'] = localStorage.getItem('token');
export const LoginApi = async (data)=>{
    return await axios.post("http://localhost:8080/login",data)
    
}
export const SingupApi = async (data)=>{
    console.log(data);
    return await axios.post("http://localhost:8080/singup",data)
    
}

export const tokenApi = async (data)=>{
    return await axios.post("http://localhost:8080/token",data)
}

export const Addcar = async (data)=>{
    return await axios.post("http://localhost:8080/addcar",data)
}