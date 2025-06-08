import React, { useState } from 'react';
import './Feedback.css';
import { TextField, Button, Paper, Typography, Box } from '@mui/material';
import emailjs from 'emailjs-com';

const Feedback = () => {
  const [email, setEmail] = useState('');
  const [feedback, setFeedback] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    
    // Prepare the email details
    const templateParams = {
      from_name: email, // The email address of the user
      message: feedback, // The feedback message
      to_email: 'your_email@example.com', // Replace with your email ID
    };

    // Send the email using EmailJS
    emailjs.send('service_cnxcf0m', 'template_kqqi7dq', templateParams, 'OziAHA2n8yrHlO8uc')
      .then((response) => {
        console.log('SUCCESS!', response.status, response.text);
        setSubmitted(true);
        setError(false); // Reset the error state
      }, (err) => {
        console.log('FAILED...', err);
        setError(true); // Show error message on failure
      });

    // Clear form fields
    setEmail('');
    setFeedback('');
  };

  return (
    <Paper elevation={3} className="feedback-container">
      <Typography variant="h4" gutterBottom className="feedback-header">
        Feedback Form
      </Typography>
      <form onSubmit={handleSubmit}>
        <Box mb={3}>
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Box>
        <Box mb={3}>
          <TextField
            label="Feedback"
            variant="outlined"
            fullWidth
            multiline
            rows={4}
            required
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
          />
        </Box>
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Submit
        </Button>
      </form>
      {submitted && (
        <Typography variant="body1" color="success" style={{ marginTop: '20px' }}>
          Thank you for your feedback! We will get back to you soon.
        </Typography>
      )}
      {error && (
        <Typography variant="body1" color="error" style={{ marginTop: '20px' }}>
          Failed to send feedback. Please try again later.
        </Typography>
      )}
    </Paper>
  );
};

export default Feedback;