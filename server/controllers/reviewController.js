const Review = require('../model/Reviews');

// Controller to create a review
exports.createReview = async (req, res) => {
  const { title, comment, rating } = req.body;
  const userId = req.user.userId; // Assuming the user ID is added to req by authentication middleware

  try {
    const review = new Review({
      title,
      comment,
      rating,
      user: userId
    });

    const savedReview = await review.save();

    res.status(201).json({ message: 'Review created successfully', savedReview });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Controller to fetch reviews for a movie by title
exports.getReviewsForMovie = async (req, res) => {
  const { title } = req.params;

  try {
    const reviews = await Review.find({ title }).populate('user', 'username');
    res.status(200).json(reviews);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Controller to fetch and search reviews
exports.searchReviews = async (req, res) => {
  const { query } = req.query;

  try {
    const searchCriteria = query
      ? { $text: { $search: query } }
      : {};

    const reviews = await Review.find(searchCriteria).populate('user', 'username');
    res.status(200).json(reviews);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Controller to fetch all reviews
exports.getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.find().populate('user', 'username');
    res.status(200).json(reviews);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
};