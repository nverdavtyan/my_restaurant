package my_restaurant.service;

import java.util.List;
import java.util.UUID;

import my_restaurant.model.Review;

public interface ReviewServiceInterface {
    

    List<Review> getAllReviews() throws Exception;

    Review getReview(UUID id) throws Exception;

    Review saveReview(Review review) throws Exception;


    void deleteReview(UUID id) throws Exception;
    
}
