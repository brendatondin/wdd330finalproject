import axios from "axios";

export const api = axios.create({
    baseURL: "https://api.nasa.gov/planetary",
})

export const getNasaImgs = async (date) => {
    try{
        return await api.get(`apod?api_key=qQll8YHtQi7NtYVK3hkf4Qy6mYY4pIM45mBJNN7z&date=${date}`);
    } catch(err){
        return err.response;
    }
};
