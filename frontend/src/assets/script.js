//-------------------------------------------------------------------------
//--------------------------FUNCIONES GENERALES----------------------------
//-------------------------------------------------------------------------

function normalBorder(elemento){
    elemento.classList.add('borderNormal');
 }

function cerrarAlerta(nombreAlerta){
    nombreAlerta = '#' + nombreAlerta
    $(nombreAlerta).hide()
  }

function comprobarDatos(elementos){
    //Maneras de obtener los valores
    //var empt = document.forms["form"]["nombreCompleto"].value; <- Otra manera de obtener los valores
    //var nombreCompleto = document.getElementById('form').nombreCompleto.value;

    //Obtenemos cada valor guardado en los campos de texto y los guardamos en un array
    var elementosValores = []
    for (var i = 0; i < elementos.length; i++){
        elementosValores.push(elementos[i].value);
    }

    //Si cada elemento de elementosValores contiene texto, se mostrará la ventana afirmativa
    //De lo contrario, se mostrará la ventana negativa
    if (elementosValores.every(elemento => elemento)){
        $('#alertSiDetails').html('');
        $('#alertSi').show();
    } else {
        $('#alertNoDetails').html('');
        $('#alertNo').show();

        //Por cada elemento en elementos, si este no contiene texto, se le añaderá el borde rojo.
        elementos.forEach((elemento) => {
            if (!elemento.value){
                elemento.classList.add('borderError');
            }
        })

        window.scrollTo(0, document.body.scrollHeight);

    }
 }

//-------------------------------------------------------------------------
//----------------------------EMPLOYEE REGISTER----------------------------
//-------------------------------------------------------------------------
function employeeRegister(){
    $("#alertSi").hide();
    $("#alertNo").hide();
 }


//-------------------------------------------------------------------------
//----------------------------USER REGISTER-------------------------------
//-------------------------------------------------------------------------
function userRegister(){
    $("#alertSi").hide();
    $("#alertNo").hide();
}

//-------------------------------------------------------------------------
//----------------------------EMPLOYEE LOGIN-------------------------------
//-------------------------------------------------------------------------


//-------------------------------------------------------------------------
//--------------------------------HOME-------------------------------------
//-------------------------------------------------------------------------



 