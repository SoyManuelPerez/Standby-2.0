$(document).ready( function () {
    $('#productos').DataTable();
} )
let Productos = JSON.parse(localStorage.getItem("inventario")) || [];
let Cuenta = JSON.parse(localStorage.getItem("CuentaM6")) || [];
let Registro = JSON.parse(localStorage.getItem("Registro")) || [];
let Suma = JSON.parse(localStorage.getItem("SumaM6")) || [];
let contador = JSON.parse(localStorage.getItem("contadorM6")) || [];
const contenido = document.querySelector("#contenido");
const contenidoC = document.querySelector("#contenidoC");
const contenidosuma = document.querySelector("#contenidosuma");
if(parseInt(localStorage.getItem("SumaM6"))!=1||Cuenta==[]){
    let ini = 0
Suma.push(ini)
localStorage.setItem("SumaM6",Suma)}


function mostar() {
    let html  = "";

    Productos. forEach(({ id, Producto, Precio ,tipo}) => {
        html += `
            <tr>
                <td >${Producto}</td>
                <td>${Precio}</td>
                <td>${tipo}</td>
                <td id="${id}">
                    <button type="button" class="btn btn-success">Agregar</button>
                </TD>
            </tr>
        `;
    });
    contenido. innerHTML = html;
}
function mostar2() {
    let html  = "";
    Cuenta. forEach(({ id, Producto, Precio ,tipo}) => {
        html += `
            <tr>
                <td >${Producto}</td>
                <td>${Precio}</td>
                <td>${tipo}</td>
                <td id="${id}">
                <button type="button" class="btn btn-danger">Eliminar</button>
                    <button type="button" class="btn btn-success">Pago</button>
                </TD>
            </tr>
        `;
    });
    contenidoC. innerHTML = html;
}
function mostar3() {
    let total = parseInt(localStorage.getItem("contadorM6"))
    console.log()
    let html  = "";
        html += `
            <tr>
                <td >`+total+`</td>
            </tr>
        `;
    
    contenidosuma. innerHTML = html;
}
function sumatoria(precio){
    if (parseInt(localStorage.getItem("SumaM6"))==0){let sumatoria =[]
        sumatoria.push(precio)
        localStorage.setItem("contadorM6",sumatoria)
        ini=1
        localStorage.removeItem("SumaM6")
        let sum=[]
        sum.push(ini)
        localStorage.setItem("SumaM6",sum)
        }
        else if(parseInt(localStorage.getItem("SumaM6"))==1){
            let con = parseInt(localStorage.getItem("contadorM6")) 
            let total= con + precio
            localStorage.setItem("contadorM6",total)
        }
}
function resta(valor){
            let con = parseInt(localStorage.getItem("contadorM6"))
            let total= con - valor
            localStorage.setItem("contadorM6",total)
            mostar3()
}
contenido.addEventListener("click", (e) => {
    if (e.target.classList.contains("btn-success")) {
        const id = e.target.parentElement.id;
        const Prod = Productos.find(((Productos) => Productos.id === id));
        const Producto = Prod.Producto;
        const Precio = Prod.Precio;
        const suma = parseInt(Prod.Precio);
        sumatoria(suma)
        const tipo = Prod.tipo
        const formUser = { id: crypto.randomUUID(),Producto, Precio, tipo };
        Cuenta.push(formUser);
        localStorage.setItem("CuentaM6", JSON.stringify(Cuenta));
        mostar();
        mostar2()
        mostar3()
    }
});
contenidoC.addEventListener("click", (e) => {
    if (e.target.classList.contains("btn-danger")) {
        const id = e.target.parentElement.id;
        const res = confirm("Estas seguro que quieres eliminar");

        if (!res) return;
        const Prod = Cuenta.find(((Cuenta) => Cuenta.id === id));
        const valor = parseInt(Prod.Precio);
        resta(valor)
        const newArray = Cuenta.filter((Cuenta) => Cuenta.id !== id);
        Cuenta = newArray;
        mostar();
        mostar2()
        mostar3()
        localStorage.setItem("CuentaM6", JSON.stringify(Cuenta));
    }
    if (e.target.classList.contains("btn-success")) {
        const id = e.target.parentElement.id;
        const Prod = Cuenta.find(((Cuenta) => Cuenta.id === id));
        const Producto = Prod.Producto;
        const Precio = Prod.Precio;
        const tipo = Prod.tipo
        var date = new Date();
        resta(Precio)
        const formatDate = (date)=>{
            let formatted_date = date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear()
                return formatted_date;
            }
        let fecha = formatDate(date);
        const formUser = { id: crypto.randomUUID(),Producto, Precio, tipo, fecha };
        Registro.push(formUser);
        localStorage.setItem("Registro", JSON.stringify(Registro));
        const newArray = Cuenta.filter((Cuenta) => Cuenta.id !== id);
        Cuenta = newArray;
        localStorage.setItem("CuentaM6", JSON.stringify(Cuenta));
        mostar();
        mostar2()
    }
});
mostar();
mostar2()
mostar3()
