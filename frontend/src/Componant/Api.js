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

export const GetCar = async (data)=>{
    console.log(data);
    return await axios.get('http://localhost:8080/allcars', {params: {price: data.price,mileage: data.mileage,color: data.color,},})
}
export const deletecar = async (id)=>{
    return await axios.delete(`http://localhost:8080/delete/${id}`)
}
export const updatecar = async (id,data)=>{
    console.log(id);
        return  await axios.patch(`http://localhost:8080/update/${id}`,{...data})
}