import React, { useEffect, useState } from 'react';
import {
  Container,
  Typography,
  CircularProgress,
  Grid,
  Card,
  CardContent,
  CardHeader,
  Alert
} from '@mui/material';

function ReviewList() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('http://localhost:2003/api/reviews')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setReviews(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error:', error);
        setError('Failed to fetch reviews');
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <Container sx={{ mt: 3, textAlign: 'center' }}>
        <CircularProgress />
      </Container>
    );
  }

  if (error) {
    return (
      <Container sx={{ mt: 3 }}>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  return (
    <Container sx={{ mt: 5 }}>
      <Typography variant="h4" component="h2" align="center" gutterBottom>
        Movie Reviews
      </Typography>
      <Grid container spacing={4}>
        {reviews.map((review) => (
          <Grid item xs={12} sm={6} md={4} key={review._id}>
            <Card sx={{ boxShadow: 3 }}>
              <CardHeader
                title={<strong>{review.user.username}</strong>}
                subheader={`reviewed "${review.title}"`}
              />
              <CardContent>
                <Typography variant="body2" color="text.secondary">
                  <strong>Rating:</strong> {review.rating} stars
                </Typography>
                <Typography variant="body1" sx={{ mt: 1 }}>
                  {review.comment}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default ReviewList;