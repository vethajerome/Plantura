import { Button, Typography, Paper, Box, Input, Grid, Card, CardContent, CardActions, Dialog, DialogTitle, DialogContent,DialogActions, IconButton, Tooltip } from '@mui/material';
import {  Info } from '@mui/icons-material';
import axios from 'axios';
import { useState } from 'react';

const Home = ({ theme }) => {
  const [loading, setLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [prediction, setPrediction] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [currentDisease, setCurrentDisease] = useState(null);

  const plantDiseases = [
    {
      name: 'Powdery Mildew',
      description: 'A fungal disease that appears as a white powdery substance on leaves.',
      solution: 'Use fungicides and ensure proper air circulation around plants.',
      details: 'Powdery mildew is a common problem in many plants and can spread quickly in warm, dry conditions. It is often seen in greenhouses or areas with poor ventilation. To control it, maintain proper spacing between plants and avoid watering late in the day to reduce humidity. Reapply fungicides as needed to keep the disease in check.',
      imageUrl: 'https://www.greenlife.co.ke/wp-content/uploads/2022/04/mango_powdery_mildew.jpg'
    },
    {
      name: 'Leaf Spot',
      description: 'Characterized by dark spots on leaves which can cause them to fall off.',
      solution: 'Remove affected leaves and avoid overhead watering.',
      details: 'Leaf spots can be caused by various fungi or bacteria, and can spread rapidly in wet conditions. Ensure that plants have good air circulation and avoid watering in the evening. Regularly inspect plants for signs of infection and practice crop rotation to prevent reoccurrence. Using copper-based fungicides can also help control certain types of leaf spots.',
      imageUrl: 'https://nwdistrict.ifas.ufl.edu/hort/files/2012/06/cercospora_hydrangea-300x224.jpg'
    },
    {
      name: 'Mosaic Virus',
      description: 'Mosaic virus causes mottled patterns of light and dark green on leaves.',
      solution: 'Remove infected plants, control insect vectors, and use virus-free seeds.',
      details: 'There are many types of mosaic viruses, affecting a wide range of plants including vegetables, flowers, and ornamentals. They are often spread by aphids and other insect vectors. Symptoms include mottling and distortion of leaves, reduced growth, and lower yields. To manage the virus, use resistant varieties, control insect vectors, and practice good garden hygiene to prevent the spread of the disease.',
      imageUrl: 'https://www.planetnatural.com/wp-content/uploads/2021/11/Rose-Mosaic-Virus-scaled.jpg'
    },
    {
      name: 'Blight',
      description: 'A rapid and complete browning of leaves, twigs, or flowers.',
      solution: 'Prune and destroy affected parts and apply appropriate fungicides.',
      details: 'Blight can be caused by fungal or bacterial infections and can quickly destroy plant tissues. It is often exacerbated by wet weather and poor air circulation. Prune infected plant parts and dispose of them properly. Improve air circulation around plants and apply fungicides as recommended for the specific type of blight. Regular monitoring and early intervention are key to controlling blight outbreaks.',
      imageUrl: 'https://cdn.mos.cms.futurecdn.net/aTdWJvnG8t43BaAJkFizKY.jpg'
    },
    {
      name: 'Rust',
      description: 'Appears as orange or reddish spots on the undersides of leaves.',
      solution: 'Use rust-resistant plant varieties and apply fungicides.',
      details: 'Rust diseases are common in many plants and thrive in humid environments. They cause characteristic pustules on the undersides of leaves, which release spores to spread the infection. Implementing crop rotation, selecting resistant varieties, and applying fungicides can help manage rust. Additionally, avoid watering from above and keep plant foliage dry to reduce the risk of rust infection.',
      imageUrl: 'https://cdn.britannica.com/06/128606-050-34D3D9C8/Soybean-rust.jpg'
    },
    {
      name: 'Anthracnose',
      description: 'Causes dark, sunken lesions on leaves, stems, flowers, and fruits.',
      solution: 'Remove and destroy infected plants and use fungicides.',
      details: 'Anthracnose affects many plants and is usually triggered by wet weather conditions. The disease causes dark, sunken lesions on various plant parts, and can lead to significant damage if not controlled. Remove and destroy infected plant parts to reduce the spread of the disease. Ensure good air circulation around plants, avoid overhead irrigation, and use fungicides as needed to manage anthracnose outbreaks.',
      imageUrl: 'https://images1.farms.com/farms-production-images/Portals/0/anthracnose-300-1_1.png'
    },
    {
      name: 'Fusarium Wilt',
      description: 'Leads to wilting, yellowing, and stunted growth in plants.',
      solution: 'Use resistant plant varieties and ensure proper soil drainage.',
      details: 'Fusarium wilt is caused by a soil-borne fungus that affects the vascular system of plants, leading to wilting and stunted growth. The fungus can persist in the soil for several years, making it difficult to eradicate. Use resistant plant varieties where available and ensure proper soil drainage to minimize the impact. Practice crop rotation and avoid planting susceptible crops in affected soil to help control Fusarium wilt.',
      imageUrl: 'https://www.almanac.com/sites/default/files/images/fusarium%20wilt%20tomatoes-AmBNPHOTO-SS.jpeg'
    },
    {
      name: 'Botrytis (Gray Mold)',
      description: 'A fungal disease causing gray mold on flowers, fruits, and leaves.',
      solution: 'Remove affected areas and use fungicides.',
      details: 'Gray mold thrives in cool, damp conditions and can affect a wide range of plants. It often starts on flowers and fruits but can spread to leaves and stems. Improve air circulation, reduce humidity, and remove affected plant parts to manage gray mold. Fungicides may be needed to control severe outbreaks, especially in greenhouse environments where humidity is higher.',
      imageUrl: 'https://cdn.mos.cms.futurecdn.net/9qZaFZkT2k6us4aCP7eyQJ-1200-80.jpg'
    },
    {
      name: 'Verticillium Wilt',
      description: 'Causes yellowing and wilting of leaves, often one-sided on the plant.',
      solution: 'Use resistant varieties and rotate crops.',
      details: 'Verticillium wilt is a soil-borne fungus that blocks water flow in plants, causing symptoms such as yellowing and wilting. The disease affects a wide range of plants and can persist in the soil for long periods. Implement crop rotation and use resistant varieties to manage Verticillium wilt. Ensure proper soil drainage and avoid excessive watering to reduce the risk of infection.',
      imageUrl: 'https://images.immediate.co.uk/production/volatile/sites/10/2022/03/2048X1365-Verticillium-Wilt-SEO-GettyImages-1290967505-cf880c3.jpg?quality=90&resize=940,627'
    },
    {
      name: 'Downy Mildew',
      description: 'Characterized by yellow or white spots on the tops of leaves with downy growth.',
      solution: 'Increase air circulation and use fungicides.',
      details: 'Downy mildew is more common in cool, wet environments and can severely damage crops. The disease starts as yellow or white spots on the upper leaf surfaces, eventually leading to a downy, grayish growth. Increase air circulation, use fungicides, and avoid late watering to help manage downy mildew. Removing affected plant parts and improving garden hygiene can also help control the spread.',
      imageUrl: 'https://morningchores.com/wp-content/uploads/2019/09/Downy-Mildew-Identification-Plants-at-Risk-Prevention-and-Treatment-FI.jpg'
    },
  ];
  
  

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true); // Start loading
    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const response = await axios.post('http://localhost:5000/predict', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setPrediction(response.data.prediction);
    } catch (error) {
      console.error('There was an error!', error);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  const handleDialogOpen = (disease) => {
    setCurrentDisease(disease);
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
    setCurrentDisease(null);
  };

  const cardBackgroundColor = theme === 'light' ? '#ffffff' : '#000000';
  const cardContentColor = theme === 'light' ? '#000000' : '#ffffff';
  const dialogBackgroundColor = theme === 'light' ? '#ffffff' : '#333333';
  const dialogContentColor = theme === 'light' ? '#000000' : '#ffffff';

  return (
    <div style={{
      padding: 20,
      backgroundImage: 'url("/path/to/your/plant-background.jpg")',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      minHeight: '100vh',
    }}>
     <Paper
  style={{
    padding: 20,
    marginBottom: 20,
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    height:190
  }}
>
  <Box display="flex" flexDirection="row" alignItems="center">
    <Box flex={1}>
      <Typography variant="h4" component="h1" gutterBottom>
        Upload the Diseased Plant Image
      </Typography>
      <form onSubmit={handleSubmit}>
        <Box display="flex" alignItems="center" gap={2} flexDirection="column">
          <Input type="file" onChange={handleFileChange} style={{ marginBottom: 10 }} />
          <Button type="submit" variant="contained" color="primary" disabled={loading}>
            {loading ? 'Detecting...' : 'Detect Disease'}
          </Button>
        </Box>
      </form>
    </Box>
    <Box>
      <img src="https://images.pexels.com/photos/25409646/pexels-photo-25409646/free-photo-of-woman-taking-a-photo-of-coffee.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" alt="Plant" style={{ height: 150, marginLeft: 20, width:140}} />
    </Box>
  </Box>
</Paper>

      {prediction && (
        <Paper style={{ padding: 20, marginBottom: 20, boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', backgroundColor: 'rgba(255, 255, 255, 0.8)' }}>
          <center><Typography variant="h6"><b>Detection Result</b></Typography>
          <Typography variant="h5">{prediction}</Typography></center>
        </Paper>
      )}
      <Typography variant="h5" component="h4" gutterBottom style={{ color: theme === 'light' ? '#000000' : '#ffffff', fontWeight: "bold" }}>
        Common Plant Diseases and Solutions:-
      </Typography>
      <Grid container spacing={3}>
        {plantDiseases.map((disease, index) => (
          <Grid item xs={12} md={6} key={index}>
            <Card
              style={{
                backgroundColor: cardBackgroundColor,
                color: cardContentColor,
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                transition: '0.3s',
                position: 'relative',
                overflow: 'hidden',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.02)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              <CardContent>
                <Typography variant="h6" component="h3">
                  {disease.name}
                  <Tooltip title={disease.details}>
                    <IconButton size="small" style={{ marginLeft: 8, color: theme === 'light' ? '#000000' : '#ffffff' }}>
                      <Info />
                    </IconButton>
                  </Tooltip>
                </Typography>
                <Typography variant="body2" style={{ color: theme === 'light' ? '#000000' : '#ffffff' }} gutterBottom>
                  {disease.description}
                </Typography>
                <Typography variant="body2" style={{ color: theme === 'light' ? '#000000' : '#ffffff' }}>
                  <strong>Solution:</strong> {disease.solution}
                </Typography>
                <img
                  src={disease.imageUrl}
                  alt={disease.name}
                  style={{
                    position: 'absolute',
                    top: 5,
                    right: 10,
                    width: 150,
                    height: 150,
                    borderRadius: '0%',
                    border: '2px solid white',
                  }}
                />
              </CardContent>
              <CardActions disableSpacing>
                <Button
                  size="small"
                  onClick={() => handleDialogOpen(disease)}
                >
                  Learn More
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Dialog
        open={openDialog}
        onClose={handleDialogClose}
        PaperProps={{
          style: {
            backgroundColor: dialogBackgroundColor,
            color: dialogContentColor,
          },
        }}
      >
        <DialogTitle
          style={{ 
            borderBottom: `2px solid ${dialogContentColor}`, 
            display: 'flex', 
            justifyContent: 'space-between',
            alignItems: 'center'
          }}
        >
          <Typography variant="h6">{currentDisease?.name}</Typography>
        </DialogTitle>
        <DialogContent dividers>
          <Typography gutterBottom>{currentDisease?.details}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Home;