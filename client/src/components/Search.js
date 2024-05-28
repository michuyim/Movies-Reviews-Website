import React, { useEffect, useState } from 'react';
import { Container, Grid, Card, CardContent, CardHeader, Typography, CircularProgress, Alert } from '@mui/material';
import { useLocation } from 'react-router-dom';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function Search() {
  const query = useQuery().get('q');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (query) {
      setLoading(true);
      setError('');
      setResults([]);

      fetch(`http://localhost:2003/api/reviews/search?q=${query}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then((data) => {
          setResults(data);
          setLoading(false);
        })
        .catch((error) => {
          console.error('Error:', error);
          setError('Failed to fetch search results');
          setLoading(false);
        });
    }
  }, [query]);

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
      <Typography variant="h4" component="h1" gutterBottom>
        Search Results for "{query}"
      </Typography>
      <Grid container spacing={4}>
        {results.map((review) => (
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

export default Search;