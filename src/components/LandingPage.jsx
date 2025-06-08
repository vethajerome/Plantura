import React, { useState, useEffect } from "react";
import Paper from "@mui/material/Paper";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const cardData = [
  {
    title: "See the sky ⛅",
    image:
      "https://c8.alamy.com/comp/2BJ4H6R/indian-farmer-looking-at-sky-2BJ4H6R.jpg",
  },
  {
    title: "Turn the soil 🚜",
    image:
      "https://www.patelagroindustries.com/public/images/blog/UpIOdGietvKuqkgFVPdEvMaVDX8FIQVOj5MT3RIB.jpg",
  },
  {
    title: "Sow the seeds 🌱",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Naathu_Naduthal.jpg/1200px-Naathu_Naduthal.jpg?20111119042659",
  },
  {
    title: "Watch it grow 🪴",
    image:
      "https://watermark.lovepik.com/photo/20211118/large/lovepik-paddy-field-in-irrigation-picture_500092544.jpg",
  },
  {
    title: "Reap the reward 🌾",
    image:
      "https://i0.wp.com/robhoskins.onehope.net/wp-content/uploads/2013/07/Harvest-Field.jpg?ssl=1",
  },
  {
    title: "Feed the World 🍚",
    image:
      "https://5.imimg.com/data5/SELLER/Default/2023/7/327598017/SR/BP/AF/161365654/paddy-rice-500x500.jpg",
  },
  {
    title: "Sustain the Future 🌏",
    image:
      "https://www.datocms-assets.com/46272/1638990473-1638990472556.jpg?auto=format&fit=max&w=1200",
  },
];

const LandingPage = () => {
  const navigate = useNavigate();
  const [weather, setWeather] = useState(null);
  const [locationEnabled, setLocationEnabled] = useState(false);
  const [irrigationTip, setIrrigationTip] = useState("");

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const apiKey = "5881ac4dfc43a476cfdfbde5698d476e";
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;

        axios
          .get(apiUrl)
          .then((response) => {
            const data = response.data;
            setWeather(data);
            setLocationEnabled(true);

            const weatherCondition = data.weather[0].main;
            const temperature = data.main.temp;

            let tip = "Weather looks good for irrigation.";
            if (weatherCondition.includes("Rain")) {
              tip = "There is a chance of rain. Avoid irrigating today.";
            } else if (temperature > 303.15) {
              tip = "It's hot outside. Consider irrigating more frequently.";
            }
            setIrrigationTip(tip);
          })
          .catch((error) => {
            console.error("Error fetching weather data:", error);
          });
      },
      (error) => {
        console.error("Error accessing location:", error);
      }
    );
  }, []);

  return (
    <div style={{ padding: "20px", backgroundColor: "#f0f8ff" }}>
      {/* Header Section */}
      <Paper
        elevation={3}
        style={{
          marginBottom: "20px",
          padding: "20px",
          textAlign: "center",
          backgroundColor: "#e6ffe6",
        }}
      >
        <Typography
          variant="h3"
          style={{
            fontWeight: "bold",
            color: "darkgreen",
            marginBottom: "10px",
          }}
        >
          Agriculture: From Seed to Success
        </Typography>
        <Typography
          variant="h6"
          style={{ color: "darkslategrey", fontStyle: "italic" }}
        >
          Empowering Farmers, Sustaining the Future
        </Typography>
      </Paper>

      {/* Weather Section */}
      {locationEnabled && weather && (
        <div>
          <Typography variant="h4" style={{ textAlign: "center" }}>
            Current Weather
          </Typography>
          <div style={{ textAlign: "center" }}>
            <p>Temperature: {Math.round(weather.main.temp - 273.15)}°C</p>
            <p>Condition: {weather.weather[0].main}</p>
            <Typography variant="h5">{irrigationTip}</Typography>
          </div>
        </div>
      )}

      {/* Top Section with Button and Text over Background Image */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
          padding: "20px",
          height: "200px",
          backgroundImage:
            'url("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsNt5aNNtwd5ldAFvU0LNsDYw-I6UmIcHe1Q&s")',
          backgroundSize: "cover",
          backgroundPosition: "center",
          borderRadius: "10px",
          color: "white",
        }}
      >
        <div style={{ flex: 1, textAlign: "center" }}>
          <Typography
            variant="h4"
            style={{
              fontWeight: "bold",
              marginBottom: "10px",
              color: "darkgreen",
            }}
          >
            {/* Need to know your disease */}
            <Typography
              variant="h4"
              style={{
                fontWeight: "bold",
                marginBottom: "10px",
                color: "black", // Set font color to black
              }}
            >
              Need to know your disease?
            </Typography>
          </Typography>
          <Button
            variant="contained"
            color="success"
            style={{ fontSize: "18px", padding: "10px 20px" }}
            onClick={() => navigate("/login")}
          >
            Login
          </Button>
        </div>
      </div>

      {/* Cards Section */}
      <Grid container spacing={3} justifyContent="center">
        {cardData.map((card, index) => (
          <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
            <Card
              sx={{ maxWidth: 345 }}
              style={{
                border: "2px solid #006400",
                boxShadow: "0 4px 8px rgba(0, 100, 0, 0.3)",
                borderRadius: "15px",
              }}
            >
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="140"
                  image={card.image}
                  alt={card.title}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {card.title}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Call to Action Section */}
      <div
        style={{
          marginTop: "40px",
          textAlign: "center",
          padding: "20px",
          backgroundColor: "#f0fff4",
          borderRadius: "10px",
        }}
      >
        <Typography
          variant="h4"
          style={{ color: "#006400", fontWeight: "bold" }}
        >
          Join Our Community of Farmers!
        </Typography>
        <Button
          variant="contained"
          color="success"
          style={{ marginTop: "20px" }}
          onClick={() => navigate("/register")}
        >
          Register
        </Button>
      </div>

      {/* Testimonials Section */}
      <Paper
        style={{
          marginTop: "40px",
          padding: "20px",
          backgroundColor: "#e6ffe6",
        }}
      >
        <Typography
          variant="h5"
          style={{
            color: "#006400",
            fontWeight: "bold",
            marginBottom: "10px",
            textAlign: "center",
          }}
        >
          What Our Farmers Say
        </Typography>
        <Typography style={{ textAlign: "center", fontStyle: "italic" }}>
          "Plantura has transformed my farming experience! The insights and
          guidance are priceless."
        </Typography>
      </Paper>

      {/* Newsletter Signup */}
      <div
        style={{
          marginTop: "40px",
          textAlign: "center",
          padding: "20px",
          backgroundColor: "#f0fff4",
          borderRadius: "10px",
        }}
      >
        <Typography
          variant="h5"
          style={{ color: "#006400", fontWeight: "bold" }}
        >
          Stay Informed with Our Newsletter
        </Typography>
        <TextField
          variant="outlined"
          label="Enter your email"
          style={{ marginTop: "20px", width: "300px" }}
        />
        <br />
        <Button
          variant="contained"
          color="success"
          style={{ marginTop: "20px" }}
        >
          Subscribe
        </Button>
      </div>
    </div>
  );
};

export default LandingPage;
