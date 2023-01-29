const { ApiKeyManager } = require('@esri/arcgis-rest-request');
const { geocode ,reverseGeocode } = require('@esri/arcgis-rest-geocoding');

const apiKey = "AAPK033d780cf881480283ce6a19870d5640wMjAD5rJ0f9tiNZSXX2u2h9cWyTRHxC-dMMDwoetCt8BWfWC1xXt4Mh0gfzelm_z";
const authentication = ApiKeyManager.fromKey(apiKey);

const getCoordenadas = async (direccion) => {
    
    //Creamos el REGEX para la dirección
    let patternDireccion = /^(Autopista|Avenida|Avenida Calle|Avenida Carrera|Avenida|Carrera|Calle|Carrera|Circunvalar|Diagonal|Kilometro|Transversal|AUTOP|AV|AC|AK|CL|KR|CCV|DG|KM|TV)(\s)?([a-zA-Z]{0,15}|[0-9]{1,3})(\s)?[a-zA-Z]?(\s)?(bis)?(\s)?(Este|Norte|Occidente|Oeste|Sur)?(\s)?(#(\s)?[0-9]{1,2}(\s)?[a-zA-Z]?(\s)?(bis)?(\s)?(Este|Norte|Occidente|Oeste|Sur)?(\s)?(-)?(\s)?[0-9]{1,3}(\s)?(Este|Norte|Occidente|Oeste|Sur)?)?((\s)?(Agrupación|Altillo|Apartamento|Apartamento Sótano|Barrio|Bloque|Bodega|Cabecera Municipal|Callejón|Camino|Carretera|Casa|Caserio|Célula|Centro|Centro Comercial|Centro Urbano|Circular|Condominio|Conjunto|Consultorio|Corregimiento|Deposito|Deposito |Sótano|Edificio|Entrada|Esquina|Etapa|Finca|Garaje|Garaje Sótano|Grada|Inferior|Inspección de Policia|Interior|Kilometro|Local|Local Mezzanine|Local Sótano|Lote|Manzana|Manzanita|Mejora|Mezzanine|Módulo|Municipio|Núcleo|Oficina|Oficina Sótano|Parcela|Parcelación|Pasaje|Penthouse|Piso|Porteria|Predio|Principal|Puente|Quebrada|Salon|Sector|Semisótano|Suite|Supermanzana|Terraza|Torre|Troncal|Unidad|Urbanización|Vereda|Via|Zona|AGN|AL|APTO|AS|BR|BL|BG|CM|CLJ|CN|CT|CA|CAS|CEL|CE|CECO|CEUR|CIR|CDM|CONJ|CS|CO|DP|DS|ED|EN|ESQ|ET|FCA|GJ|GS|GR|INF|IP|IN|KM|LC|LM|LS|LT|MZ|MZTA|MJ|MN|MD|MUN|NCO|OF|OS|PA|PCN|PSJ|PH|PI|PT|PD|PPAL|PN|QDA|SA|SEC|SS|SU|SMZ|TZ|TO|TRL|UN|URB|VDA|VIA|ZN)?(\s)?[1-9][0-9]{0,3})*$/;

    //En caso de que la dirección no cumpla con el REGEX, la función no se realizará y por lo tanto
    //No se añadirá el respectivo Usuario/Trabajador
    if (!patternDireccion.test(direccion)){
      console.log("La dirección ingresada no cumple con el REGEX")
      return;
    }
    
    var candidates;
    
    const geo = await geocode({
        address: direccion,
        countryCode: "CO",
        authentication,
      }).then((res) => {
        candidates = res.candidates;
      })
      .catch(err => console.log(err));

    // Direccion coincidente
    const dir = candidates[0];
    
    try {
      return dir.location;
    } catch (error){
      console.log("La dirección ingresada probablemente es inválida")
      return;
    }
};

const getDireccion = async (long, lat) => {

  var direccion;

  const reverseGeo = await reverseGeocode([long, lat], {authentication}).then(
    res => {
      direccion = res.address.Address
    }
  )
  .catch(err => console.log(err))

  return direccion;
}

module.exports = {getCoordenadas, getDireccion};