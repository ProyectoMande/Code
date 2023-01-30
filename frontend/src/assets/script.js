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

    //Creamos el REGEX para la dirección
    let patternDireccion = /^(Autopista|Avenida|Avenida Calle|Avenida Carrera|Avenida|Carrera|Calle|Carrera|Circunvalar|Diagonal|Kilometro|Transversal|AUTOP|AV|AC|AK|CL|KR|CCV|DG|KM|TV)(\s)?([a-zA-Z]{0,15}|[0-9]{1,3})(\s)?[a-zA-Z]?(\s)?(bis)?(\s)?(Este|Norte|Occidente|Oeste|Sur)?(\s)?(#(\s)?[0-9]{1,2}(\s)?[a-zA-Z]?(\s)?(bis)?(\s)?(Este|Norte|Occidente|Oeste|Sur)?(\s)?(-)?(\s)?[0-9]{1,3}(\s)?(Este|Norte|Occidente|Oeste|Sur)?)?((\s)?(Agrupación|Altillo|Apartamento|Apartamento Sótano|Barrio|Bloque|Bodega|Cabecera Municipal|Callejón|Camino|Carretera|Casa|Caserio|Célula|Centro|Centro Comercial|Centro Urbano|Circular|Condominio|Conjunto|Consultorio|Corregimiento|Deposito|Deposito |Sótano|Edificio|Entrada|Esquina|Etapa|Finca|Garaje|Garaje Sótano|Grada|Inferior|Inspección de Policia|Interior|Kilometro|Local|Local Mezzanine|Local Sótano|Lote|Manzana|Manzanita|Mejora|Mezzanine|Módulo|Municipio|Núcleo|Oficina|Oficina Sótano|Parcela|Parcelación|Pasaje|Penthouse|Piso|Porteria|Predio|Principal|Puente|Quebrada|Salon|Sector|Semisótano|Suite|Supermanzana|Terraza|Torre|Troncal|Unidad|Urbanización|Vereda|Via|Zona|AGN|AL|APTO|AS|BR|BL|BG|CM|CLJ|CN|CT|CA|CAS|CEL|CE|CECO|CEUR|CIR|CDM|CONJ|CS|CO|DP|DS|ED|EN|ESQ|ET|FCA|GJ|GS|GR|INF|IP|IN|KM|LC|LM|LS|LT|MZ|MZTA|MJ|MN|MD|MUN|NCO|OF|OS|PA|PCN|PSJ|PH|PI|PT|PD|PPAL|PN|QDA|SA|SEC|SS|SU|SMZ|TZ|TO|TRL|UN|URB|VDA|VIA|ZN)?(\s)?[1-9][0-9]{0,3})*$/;

    //Obtenemos el condicional que nos indicará si la dirección se encuentra correcto y si todos los datos se encuentran rellenados
    const esCorrecto = elementosValores.every(elemento => elemento) && patternDireccion.test(elementosValores[4])

    //Si cada elemento de elementosValores contiene texto, se mostrará la ventana afirmativa
    //De lo contrario, se mostrará la ventana negativa
    if (esCorrecto){
        $('#alertSiDetails').html('');
        $('#alertSi').show();
        
        //Limpiar los campos de texto
        elementos.forEach((elemento) => {
            elemento.value = '';
        })

    } else {
        $('#alertNoDetails').html('');
        $('#alertNo').show();

        //Por cada elemento en elementos, si este no contiene texto, se le añaderá el borde rojo.
        elementos.forEach((elemento) => {
            if (!elemento.value){
                elemento.classList.toggle('borderError');
            }
        })

    }
    window.scrollTo(0, document.body.scrollHeight);
 }

 function comprobarDireccion(elemento){
    //Creamos el REGEX para la dirección
    let patternDireccion = /^(Autopista|Avenida|Avenida Calle|Avenida Carrera|Avenida|Carrera|Calle|Carrera|Circunvalar|Diagonal|Kilometro|Transversal|AUTOP|AV|AC|AK|CL|KR|CCV|DG|KM|TV)(\s)?([a-zA-Z]{0,15}|[0-9]{1,3})(\s)?[a-zA-Z]?(\s)?(bis)?(\s)?(Este|Norte|Occidente|Oeste|Sur)?(\s)?(#(\s)?[0-9]{1,2}(\s)?[a-zA-Z]?(\s)?(bis)?(\s)?(Este|Norte|Occidente|Oeste|Sur)?(\s)?(-)?(\s)?[0-9]{1,3}(\s)?(Este|Norte|Occidente|Oeste|Sur)?)?((\s)?(Agrupación|Altillo|Apartamento|Apartamento Sótano|Barrio|Bloque|Bodega|Cabecera Municipal|Callejón|Camino|Carretera|Casa|Caserio|Célula|Centro|Centro Comercial|Centro Urbano|Circular|Condominio|Conjunto|Consultorio|Corregimiento|Deposito|Deposito |Sótano|Edificio|Entrada|Esquina|Etapa|Finca|Garaje|Garaje Sótano|Grada|Inferior|Inspección de Policia|Interior|Kilometro|Local|Local Mezzanine|Local Sótano|Lote|Manzana|Manzanita|Mejora|Mezzanine|Módulo|Municipio|Núcleo|Oficina|Oficina Sótano|Parcela|Parcelación|Pasaje|Penthouse|Piso|Porteria|Predio|Principal|Puente|Quebrada|Salon|Sector|Semisótano|Suite|Supermanzana|Terraza|Torre|Troncal|Unidad|Urbanización|Vereda|Via|Zona|AGN|AL|APTO|AS|BR|BL|BG|CM|CLJ|CN|CT|CA|CAS|CEL|CE|CECO|CEUR|CIR|CDM|CONJ|CS|CO|DP|DS|ED|EN|ESQ|ET|FCA|GJ|GS|GR|INF|IP|IN|KM|LC|LM|LS|LT|MZ|MZTA|MJ|MN|MD|MUN|NCO|OF|OS|PA|PCN|PSJ|PH|PI|PT|PD|PPAL|PN|QDA|SA|SEC|SS|SU|SMZ|TZ|TO|TRL|UN|URB|VDA|VIA|ZN)?(\s)?[1-9][0-9]{0,3})*$/;

    //Obtenemos el condicional que nos indicará si la dirección se encuentra correcto y si todos los datos se encuentran rellenados
    var esCorrecto = patternDireccion.test(elemento.value)

    if (esCorrecto){
        if (!elemento.classList.contains('borderNormal')){
            elemento.classList.remove('borderError')
            elemento.classList.toggle('borderNormal')    
        }
    } else {
        //Si el elemento ya contiene el estilo de borde Rojo, pues para que se lo va cambiar ome?
        if (!elemento.classList.contains('borderError')){
            elemento.classList.remove('borderNormal')
            elemento.classList.toggle('borderError');
        }       
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