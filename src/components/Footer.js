import React from 'react';
import { Box, Typography, Grid, Link, IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

const FooterContainer = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(4),
  marginTop: theme.spacing(4),
  borderTop: `1px solid ${theme.palette.divider}`
}));

const Footer = () => {
  return (
    <FooterContainer>
      <Grid container spacing={4}>
        <Grid item xs={12} md={4}>
          <Typography variant="h6" gutterBottom>
            Quick Links
          </Typography>
          <Link href="/home" color="inherit" underline="none">
            Home
          </Link>
          <br />
          <Link href="/solution" color="inherit" underline="none">
            More
          </Link>
          <br />
          <Link href="/about" color="inherit" underline="none">
            About Us
          </Link>
          <br />
          <Link href="/" color="inherit" underline="none">
            Logout
          </Link>
          
        </Grid>
        <Grid item xs={12} md={4}>
          <Typography variant="h6" gutterBottom>
            Contact Us
          </Typography>
          <Typography variant="body1">
            123 Xavier St.
          </Typography>
          <Typography variant="body1">
            Fictionland, 45678
          </Typography>
          <Typography variant="body1">
            Email: contact@plantura.com
          </Typography>
          <Typography variant="body1">
            Phone: (123) 456-7890
          </Typography>
        </Grid>
        <Grid item xs={12} md={4}>
          <Typography variant="h6" gutterBottom>
            Follow Us
          </Typography>
          <IconButton href="https://www.facebook.com" target="_blank" color="inherit">
            <FacebookIcon />
          </IconButton>
          <IconButton href="https://www.twitter.com" target="_blank" color="inherit">
            <TwitterIcon />
          </IconButton>
          <IconButton href="https://www.instagram.com" target="_blank" color="inherit">
            <InstagramIcon />
          </IconButton>
          <IconButton href="https://www.linkedin.com" target="_blank" color="inherit">
            <LinkedInIcon />
          </IconButton>
        </Grid>
      </Grid>
      <Box textAlign="center" pt={4}>
        <Typography variant="body2" color="textSecondary">
          &copy; {new Date().getFullYear()} Plant Detector. All rights reserved.
        </Typography>
      </Box>
    </FooterContainer>
  );
};

export default Footer;
