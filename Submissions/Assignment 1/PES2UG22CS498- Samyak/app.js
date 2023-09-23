const express=require('express')
const app=express()
const bodyParser=require('body-parser')
const https= require('https')
const _= require('lodash')
let temp=[]
let iconCode=[]
let desc=[]
let pressure=[]
let humidity=[]
let cityArray=[]
app.use(bodyParser.urlencoded({extended:true}))
app.set('view engine','ejs')
app.use(express.static('public'))

app.get('/', (req,res) => {
    res.render('index')
})

app.post('/', (req,res) => {
    let fname=req.body.fname
    let lname=req.body.lname
    let email=req.body.email
    let city=req.body.city
    cityArray.push(city)
    
    const data= {
        members :[
            {
                email_address:email,
                status:'subscribed',
                merge_fields: {
                    FNAME: fname,
                    LNAME:lname
                }
            }
        ]
    }
 
    const jsonData= JSON.stringify(data)
    const url='https://us11.api.mailchimp.com/3.0/lists/67ff72c5ed'

    const options= {
        method:'POST',
        auth: 'Samyak_130:351be85ec8e736a031814c62ff4200e7-us11'
    }

const request= https.request(url,options, function(response) {
    if(response.statusCode===200){
        console.log('mail sent')
        
    } else {
        console.log('mail not sent')
    }



})
request.write(jsonData)
request.end()


const weatherUrl= "https://api.openweathermap.org/data/2.5/weather?q="+cityArray.slice(-1)+"&appid=31ca7ce672b4854fd83a288a5b75fe08&units=metric"
https.get(weatherUrl,function(response){
    if(response.statusCode===200){
        response.on('data',function(data){
            const weatherData= JSON.parse(data)
            temp.push(weatherData.main.temp)
            desc.push(weatherData.weather[0].description)
            iconCode.push(weatherData.weather[0].icon)
            humidity.push(weatherData.main.humidity)
            pressure.push(weatherData.main.pressure)
            res.redirect('/success')
            
        })
    } else{
        res.redirect('/failure')
    }
})
})

app.get('/success', (req,res) => {
    
    res.render('success', {city: _.startCase(cityArray.slice(-1)), temp: temp.slice(-1), 
        desc: _.startCase(desc.slice(-1)), icon: iconCode.slice(-1), pressure:pressure.slice(-1),
        humidity:humidity.slice(-1)
    })

})

app.get('/failure', (req,res) => {
    res.render('failure')
})

app.listen(3000,function(){
    console.log('Server started on port 3000')
})