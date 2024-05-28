const mongoose = require('mongoose');
const { Schema } = mongoose;

const reviewSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    }
  },
  {
    timestamps: true,
  }
);

// Add text index for search
reviewSchema.index({ title: 'text', comment: 'text' });

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;