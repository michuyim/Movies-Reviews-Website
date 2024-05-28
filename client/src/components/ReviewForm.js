import React, { useState } from 'react';
import { Container, TextField, Button, Grid, Typography } from '@mui/material';
import Rating from '@mui/lab/Rating';  // Import Rating component from MUI Lab
import { useUser } from './UserContext'; // Import the UserContext

function ReviewForm({ addReview }) {
  const { user } = useUser(); // Get the user from context
  const [title, setTitle] = useState('');
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(0); // Initialize rating with 0
  const [wordCount, setWordCount] = useState(0); // State to keep track of word count
  const [titleCount, setTitleCount] = useState(0);

  const handleCommentChange = (event) => {
    const words = event.target.value.match(/\b[-?(\w+)?]+\b/gi);
    if (words && words.length <= 30) {
      setComment(event.target.value);
      setWordCount(words.length);
    } else if (!words) {
      setComment('');
      setWordCount(0);
    }
  };

  const handleTitleChange = (e) => {
    const words = e.target.value.match(/\b[-?(\w+)?]+\b/gi);
    if (words && words.length <= 10) {
      setTitle(e.target.value);
      setTitleCount(words.length);
    } else if (!words) {
      setTitle('');
      setTitleCount(0);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const reviewData = { title, comment, rating };

    // Fetch API call to POST data to the server
    fetch('http://localhost:2003/api/reviews', { // Adjust this URL to match your server configuration
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include', // Send cookies with the request
      body: JSON.stringify(reviewData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Success:', data);
        addReview(data); // Assuming addReview updates state in parent component
      })
      .catch((error) => {
        console.error('Error:', error);
      });

    // Resetting form fields
    setTitle('');
    setComment('');
    setRating(0); // Reset rating
    setWordCount(0);
    setTitleCount(0);
  };

  return (
    <Container maxWidth="sm">
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography variant="h4" component="h1" gutterBottom>
              Submit Your Review
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6" component="h2">
              Username: {user?.username}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Movie Title (10 words max)"
              variant="outlined"
              fullWidth
              value={title}
              onChange={handleTitleChange}
              helperText={`${titleCount}/10 words`}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Your Review (30 words max)"
              variant="outlined"
              fullWidth
              multiline
              rows={4}
              value={comment}
              onChange={handleCommentChange}
              helperText={`${wordCount}/30 words`}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <Typography component="legend">Your Rating</Typography>
            <Rating
              name="rating"
              value={rating}
              onChange={(event, newValue) => {
                setRating(newValue);
              }}
              precision={1}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Submit Your Review
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
}

export default ReviewForm;