import { useState } from "react";

const useLocalStorage = (label = "token")=>{
    const [data, setData] = useState();

    const saveToLocalStorage = (data)=>{
        localStorage.setItem(label, data);
    }

    const getFromLocalStorage = ()=>{
        const item = localStorage.getItem(label);   
        setData(item);
    }


    return [data, setData, saveToLocalStorage, getFromLocalStorage]
}

export default useLocalStorage;