package my_restaurant.service.Impl;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import my_restaurant.model.Review;
import my_restaurant.repository.ReviewRepository;
import my_restaurant.service.ReviewServiceInterface;

@Service
public class ReviewImplement implements ReviewServiceInterface {

    @Autowired
    private ReviewRepository reviewRepository;


    public List<Review> getAllReviews() {
        return reviewRepository.findAll();
    }

    public Review getReview(UUID id) {
        return reviewRepository.findById(id).orElse(null);
    }

    public Review saveReview(Review review) {
        return reviewRepository.save(review);
    }

    public void deleteReview(UUID id) {
        reviewRepository.deleteById(id);
    }

}
