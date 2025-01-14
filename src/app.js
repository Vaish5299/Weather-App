const path = require('path')
const express = require('express')
const hbs= require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();

//define path for express
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath= path.join(__dirname,"../templates/partials");



//setup handle barand views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
app.use(express.static(publicDirectoryPath));
hbs.registerPartials(partialsPath);

//handle bar- used for dynamic html

//below are for handlebar code- need to use "render"

app.get("/", (req, res)=>{
res.render('index',{
    title:"Weather app",
    name:"Vaishnavi"
})
});

app.get("/about",(req,res)=>{
    res.render('about',{
        title:"About me",
        name:"vaish"
    })
});

app.get("/help",(req,res)=>{
    res.render('help',{
        title:"Help",
        helpText:"This is help text",
        name:"vaish"
    })
});

app.get('/weather', (req, res) => {
    const address= req.query.address;
   if(!req.query.address){
    return res.send({
        error: "Please Enter an Address to fetch the weather"
    })
   }


geocode(address, (error, {latitude,longitude,location}={}) => {
    if (error) {
        return res.send(error);
    }

    forecast(latitude, longitude, (error, forecastData) => {
        if (error) {
            return res.send(error)
        }

        res.send({


            location:location,
            
            forecastData:forecastData
        })

    })
})
})

app.get("/products",(req,res)=>{

    if(!req.query.search){
       return res.send({
            error:"You must provide an search"
        })
    }

    console.log(req.query.search);

    res.send({
        products:[]
    })
})

app.get("/help/*",(req,res)=>{
    res.render('404',{
        errorMessage:"help article not found"
    })
})

app.get("*", (req,res)=>{
    res.render('404',{
        errorMessage:"your page not found"
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})