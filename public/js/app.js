
// fetch('https://puzzle.mead.io/puzzle')
// .then(response=>response.json())
// .then(data=>console.log(data))


const weatherForm= document.querySelector('form');
const search= document.querySelector('input');
const messageOne= document.querySelector('#message-one');
const messageTwo= document.querySelector("#message-two");
//messageOne.textContent=''

weatherForm.addEventListener('submit',(e)=>{
e.preventDefault();
const location= search.value;

messageOne.textContent='Loading...';
messageTwo.textContent='';



fetch('http://localhost:3000/weather?address='+location)
.then(response=>{
    response.json().then(data=>{

        if(data.error){
            messageOne.textContent=data.error
        }

        else{
messageOne.textContent=data.location;
messageTwo.textContent="It is currently " + data.forecastData.temperature +" degress out and there is mostly "+data.forecastData.prediction+".";


        }
    })
})

})