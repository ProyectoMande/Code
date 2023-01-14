//-------------------------------------------------------------------------
//----------------------------EMPLOYEE REGISTER----------------------------
//-------------------------------------------------------------------------
function employeeRegister(){
    $("#alertSi").hide();
    $("#alertNo").hide();
 }
  
 function cerrarAlertaNo(){
    $('#alertNo').hide();
 }

 function cerrarAlertaSi(){
    $('#alertSi').hide();
 }
  
 function datosIncompletos(){   
    $('#alertNoDetails').html('Has introducido datos equivocados');
    $('#alertNo').show();
 }

 function comprobarDatos(){
    //var empt = document.forms["form"]["nombreCompleto"].value; <- Otra manera de obtener los valores

    //Obtenemos cada valor guardado en los campos de texto y los guardamos en una variable
    var nombreCompleto = document.getElementById('form').nombreCompleto.value;
    var celular = document.getElementById('form').celular.value;
    var id = document.getElementById('form').id.value;
    var email = document.getElementById('form').email.value;
    var direccion = document.getElementById('form').direccion.value;
    var fotoId = document.getElementById('form').fotoId.value;
    var fotoPerfil = document.getElementById('form').fotoPerfil.value;

    
    if (nombreCompleto && celular && id && email && direccion && fotoId && fotoPerfil){
        $('#alertSiDetails').html('');
        $('#alertSi').show();
    } else {
        $('#alertNoDetails').html('');
        $('#alertNo').show();
    }
 }


 