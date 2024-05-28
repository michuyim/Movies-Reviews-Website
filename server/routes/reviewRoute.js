const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');
const authenticateToken = require('../middleware/authenticateToken');

// Route to create a review (protected)
router.post('/reviews', authenticateToken, reviewController.createReview);

// Route to get reviews for a movie by title
router.get('/movies/:title/reviews', reviewController.getReviewsForMovie);

// Route to search reviews
router.get('/reviews/search', reviewController.searchReviews);

// Route to get all reviews
router.get('/reviews', reviewController.getAllReviews);

module.exports = router;