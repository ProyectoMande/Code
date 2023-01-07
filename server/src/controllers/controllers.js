const { ApiKeyManager } = require('@esri/arcgis-rest-request');
const { geocode } = require('@esri/arcgis-rest-geocoding');

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
    
    console.log(dir);
    return dir.location;
};

module.exports = getCoordenadas;