const { ApiKeyManager } = require('@esri/arcgis-rest-request');
const { geocode ,reverseGeocode } = require('@esri/arcgis-rest-geocoding');

const apiKey = "AAPK033d780cf881480283ce6a19870d5640wMjAD5rJ0f9tiNZSXX2u2h9cWyTRHxC-dMMDwoetCt8BWfWC1xXt4Mh0gfzelm_z";
const authentication = ApiKeyManager.fromKey(apiKey);

const getCoordenadas = async (direccion) => {
    
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
    
    return dir.location;
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