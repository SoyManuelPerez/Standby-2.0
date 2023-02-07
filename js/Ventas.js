$(document).ready( function () {
    $('#ventas').DataTable({
        dom: 'Bfrtip',
        buttons: [
            'excel', 'pdf', 'print'
        ]
    } 
    );
} );
let Registro = JSON.parse(localStorage.getItem("Registro")) || [];
function mostar() {
    let html  = "";
    Registro. forEach(({ id, Producto, Precio ,tipo,fecha}) => {
        html += `
            <tr>
                <td >${Producto}</td>
                <td>${Precio}</td>
                <td>${tipo}</td>
                <td>${fecha}</td>
            </tr>
        `;
    });
    contenido. innerHTML = html;
}
mostar();
