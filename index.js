import axios from "axios"
import express from "express";
import bodyParser from "body-parser";

const port = 3000;
const app = express();
const apiKey = "33a6f918edb424e39cb92bad7cd980e0";

app.use(express.static('public/'));
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', (req, res) =>{
    var city = "Tashkent";

    async function getWeather() {
        try {
            var response = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
                params:{
                    q: city,
                    appid: apiKey,
                    units: "metric"
                }
            }
          );

          var date = new Date();
          var dateArray = date.toDateString().split(' ');
          var timeArray = date.toTimeString().split(':');

          var cityTime = `${dateArray[1]} ${dateArray[2]}, ${timeArray[0]}:${timeArray[1]}`;
          console.log(cityTime);

          res.locals = {
            data: response.data,
            cityTime: cityTime
          };
        //   console.log(response.data);
          res.render('index.ejs');
        
        } catch (error) {
          console.error(error);
          console.log('errorrrrrr')
        }
      }
     getWeather();
});

app.post('/search', (req, res) => {
    var city = req.body.city;

    async function getWeather() {
        try {
            var response = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
                params:{
                    q: city,
                    appid: apiKey,
                    units: "metric"
                }
            }
          );

          
          if (response.data.cod != '404'){

          var date = new Date();
          date.setTime(date.getTime() + response.data.timezone * 1000 + date.getTimezoneOffset() * 60 * 1000);
          var dateArray = date.toDateString().split(' ');
          var timeArray = date.toTimeString().split(':');

          var cityTime = `${dateArray[1]} ${dateArray[2]}, ${timeArray[0]}:${timeArray[1]}`;
          console.log(cityTime);
          res.locals = {
            data: response.data,
            cityTime: cityTime
          };
        }
          res.render('index.ejs');
          
        } catch (error) {
            res.render('index.ejs');
        }
        
      }
     getWeather();
    }
    //   res.send((data));
)

app.listen(port, () => {
    console.log(`Server is running on port ${port}.`);
})