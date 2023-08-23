import axios from 'axios';
axios.defaults.headers.common['token'] = localStorage.getItem('token');
export const LoginApi = async (data)=>{
    return await axios.post("https://narenchoudhary.onrender.com/login",data)
    
}
export const SingupApi = async (data)=>{
    console.log(data);
    return await axios.post("https://narenchoudhary.onrender.com/singup",data)
    
}

export const tokenApi = async (data)=>{
    return await axios.post("https://narenchoudhary.onrender.com/token",data)
}

export const Addcar = async (data)=>{
    return await axios.post("https://narenchoudhary.onrender.com/addcar",data)
}

export const GetCar = async (data)=>{
    console.log(data);
    return await axios.get('https://narenchoudhary.onrender.com/allcars', {params: {price: data.price,mileage: data.mileage,color: data.color,},})
}
export const deletecar = async (id)=>{
    return await axios.delete(`https://narenchoudhary.onrender.com/delete/${id}`)
}
export const updatecar = async (id,data)=>{
    console.log(id);
        return  await axios.patch(`https://narenchoudhary.onrender.com/update/${id}`,{...data})
}