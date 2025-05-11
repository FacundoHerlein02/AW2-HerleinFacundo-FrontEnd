import {api} from "./API.js"
export const logIn =async(usuario,clave)=>{
    try 
    {
        const Res= await fetch(`${api}/usuarios/login`,{
            method:'POST',
            headers:{
                'Content-Type' : 'application/json'
            },
            body:JSON.stringify({usuario,clave}),
        });
        if (!Res.ok) {
            const errorData = await Res.json();
            throw new Error(errorData.error || "Error desconocido en login");
        }
        const data= await Res.json();        
        return data;  
    } 
    catch (error) {
        console.error("Error en logIn:", error.message);
        return { error: error.message };
    }
}

