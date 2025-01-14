//code converts address to lat/long


const request= require("postman-request");
const geocode=(address, callback)=>{
    const url='https://api.mapbox.com/search/geocode/v6/forward?q=' +encodeURIComponent(address) +'&limit=2&access_token=pk.eyJ1IjoidmFpc2gtOTkiLCJhIjoiY201b3Zpd3gxMG93bzJwc2ljcDRkeTlkaCJ9.7OcuG1N1Pteyi1f0_mDoNQ'
    request({url: url, json: true},(error, response)=>{
        if(error){
            callback('Unable to connect to the services');
        }
        else if(response.body.features.length==0){
            callback({
                error: "Please Enter an valid address to fetch the weather"
            })
        }
        else{

            callback(undefined, {
            latitude: response.body.features[0].properties.coordinates.latitude,
            longitude: response.body.features[0].properties.coordinates.longitude,
            location: response.body.features[0].properties.name
            })

        }

    });


    }

   module.exports=geocode