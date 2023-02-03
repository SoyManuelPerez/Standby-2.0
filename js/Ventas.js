$(document).ready( function () {
    $('#Ventas').DataTable({
        dom: 'Bfrtip',
        buttons: [
            'excel', 'pdf', 'print'
        ]
    } 
    );
} );
