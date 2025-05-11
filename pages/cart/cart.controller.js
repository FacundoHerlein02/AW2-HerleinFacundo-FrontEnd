import {cardsCart,detalleVenta,calcularTotal} from "../../components/cardCart.component.js";
const cartContainer=document.getElementById('ContainerProductos');
const detalleContainer=document.getElementById('detalleContainer');
const total= document.getElementById('totalCarrito');
document.addEventListener('DOMContentLoaded',async()=>{   
    let productos= obtenerProductos();
    ActualizarCarrito(productos);       
})
function ActualizarCarrito(productos){
    const cardsHTML = cardsCart(productos);
    const detalleHTML=detalleVenta(productos);
    const totalCarrito=calcularTotal(productos) 
    if (cardsHTML,detalleHTML,totalCarrito) {
        cartContainer.innerHTML = cardsHTML;
        detalleContainer.innerHTML=detalleHTML;        
        total.innerText=`$${totalCarrito}`
        asignarEventosCarrito();
    } else {
        cartContainer.innerHTML = `<p class="text-center text-lg text-red-500">Error al mostrar el carrito.</p>`;
        detalleContainer.innerHTML = `<p class="text-center text-lg text-red-500">Error al mostrar el detalle.</p>`;
        total.innerHTML = `<p class="text-center text-lg text-red-500">Error al calcular el total.</p>`;
    }
}
function asignarEventosCarrito() {
    const btnsCarrito = document.querySelectorAll('.btnEliminarCarrito');
    const btnsMenos=document.querySelectorAll('.btnMenos');
    const btnsMas=document.querySelectorAll('.btnMas');
    const btnComprar= document.querySelector('.btnComprar');
    btnsCarrito.forEach(btn => {
        btn.addEventListener('click',(e) => {
            const card = e.target.closest('[data-id]');
            const id = card?.getAttribute('data-id');
            if (!id) return alert("No se pudo obtener el ID del producto.");            
            let carritoObj = obtenerProductos();
            let carrito = carritoObj?.result || [];
            // Filtrar el carrito sin el producto que tiene ese ID
            carrito = carrito.filter(moto => moto.id !== Number(id));
            // Guardar el carrito actualizado
            localStorage.setItem('carrito', JSON.stringify(carrito));
            alert("Moto eliminada del carrito.");
            //Recarga la vista
            location.reload();         
        });
    });
    btnsMenos.forEach(btnM=>{
        btnM.addEventListener('click',(e)=>{
            const card = e.target.closest('[data-id]');
            const id = card?.getAttribute('data-id');
            if (!id) return alert("No se pudo obtener el ID del producto.");            
            let carritoObj = obtenerProductos();
            let carrito = carritoObj?.result || [];
            //busca por id      
            const index = carrito.findIndex(p => p.id === Number(id));
            if (index !== -1) {
                //Disminuye cantidad
                if(carrito[index].cantidad>1)
                {
                    carrito[index].cantidad -= 1;  
                }                      
            }        
            // Guardamos el carrito actualizado
            localStorage.setItem('carrito', JSON.stringify(carrito));          
            ActualizarCarrito(carritoObj);
        });        
    });
    btnsMas.forEach(btnMas=>{
        btnMas.addEventListener('click',(e)=>{
            const card = e.target.closest('[data-id]');
            const id = card?.getAttribute('data-id');
            if (!id) return alert("No se pudo obtener el ID del producto.");            
            let carritoObj = obtenerProductos();
            let carrito = carritoObj?.result || [];
            //busca por id      
            const index = carrito.findIndex(p => p.id === Number(id));
            if (index !== -1) {
                //Aumenta cantidad
                if(carrito[index].Stock > carrito[index].cantidad)
                {
                    carrito[index].cantidad += 1;  
                }
                else{
                    alert("Stock insuficiente");
                }                                     
            }        
            // Guardamos el carrito actualizado
            localStorage.setItem('carrito', JSON.stringify(carrito));            
            ActualizarCarrito(carritoObj);
        });        
    });
    btnComprar.addEventListener('click',()=>{
        alert("Finalizar compra")
    });
};
//Lee los productos del LocalStorage
function obtenerProductos(){
    const productosCarritoJSON = localStorage.getItem('carrito');
    if (!productosCarritoJSON) {
        cartContainer.innerHTML = `<p class="text-center text-lg">No hay productos en el carrito.</p>`;
        return;
    }
    const productosCarrito = JSON.parse(productosCarritoJSON);
    const productos = { result: productosCarrito };
    return productos
};
