//-------------------------------------------------------------------------
//----------------------------EMPLOYEE REGISTER----------------------------
//-------------------------------------------------------------------------
function employeeRegister(){
    $("#alertSi").hide();
    $("#alertNo").hide();
 }

 function cerrarAlerta(nombreAlerta){
   nombreAlerta = '#' + nombreAlerta
   $(nombreAlerta).hide()
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
        
        if (!nombreCompleto){
            document.getElementById('form').nombreCompleto.classList.add('error');
        }

        if (!celular){
            document.getElementById('form').celular.classList.add('error');
        }

        if (!id){
            document.getElementById('form').id.classList.add('error');
        }

        if (!email){
            document.getElementById('form').email.classList.add('error');
        }

        if (!direccion){
            document.getElementById('form').direccion.classList.add('error');
        }

        if (!fotoId){
            document.getElementById('form').fotoId.classList.add('error');
        }

        if (!fotoPerfil){
            document.getElementById('form').fotoPerfil.classList.add('error');
        }

        window.scrollTo(0, document.body.scrollHeight);

    }
 }

 function normalBorder(elemento){
    elemento.classList.add('borderNormal');
 }

//-------------------------------------------------------------------------
//----------------------------EMPLOYEE-------------------------------------
//-------------------------------------------------------------------------



//-------------------------------------------------------------------------
//----------------------------EMPLOYEE LOGIN-------------------------------
//-------------------------------------------------------------------------


//-------------------------------------------------------------------------
//--------------------------------HOME-------------------------------------
//-------------------------------------------------------------------------


//-------------------------------------------------------------------------
//----------------------------USER REGISTER-------------------------------
//-------------------------------------------------------------------------

 