const express = require("express");

const https = require("https");
const bodyparser = require("body-parser")
const app = express();
app.use(bodyparser.urlencoded({extended: true}));

app.get("/", function(req, res){
  res.sendFile(__dirname + "/index.html");
});
app.post("/", function(req, res){
  const query = req.body.cityName
  const apiKey = "5c4ab144d7a601041b4af7db096cc157"
  const unit = "metric"
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=" + unit
  https.get(url, function(response){
    console.log(response.statusCode);

    response.on("data", function(data){
      const weatherData = JSON.parse(data)
      const temp = weatherData.main.temp
      const weatherDes = weatherData.weather[0].description
      const icon = weatherData.weather[0].icon
      const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png"
      res.write("<p>The weather is currently " + weatherDes + "</p>");
      res.write("<h1>The temperatue in " + query + " is " + temp + " degree Celcius.</h1>");
      res.write("<img src=" + imageURL +">");
      res.send()
    })

  })
})



app.listen(3000, function(){
  console.log("server running 3000 port.")
})
