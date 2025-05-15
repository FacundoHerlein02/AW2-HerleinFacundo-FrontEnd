import {logIn} from "./api/login.api.js"
import {footer} from"/components/footer.component.js";
const frmLogin= document.getElementById("frmLogin");
const footerContainer= document.getElementById('footerContainer');
document.addEventListener('DOMContentLoaded',async()=>{   
    footerContainer.innerHTML=footer;    
    frmLogin.addEventListener('submit',async(e)=>{
        e.preventDefault();    
        const usuario= document.getElementById('user').value;
        const clave=document.getElementById('pass').value;
        const Res=await logIn(usuario,clave);
        if(Res.error)
        {
            alert(Res.error);        
        }
        else
        {
            alert(Res.mensaje)
            sessionStorage.setItem('usuario', JSON.stringify(Res.user));     
            window.location.href='./pages/home/home.html'
        }
    });    
});




