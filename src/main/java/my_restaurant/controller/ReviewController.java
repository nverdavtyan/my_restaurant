package my_restaurant.controller;

import org.springframework.web.bind.annotation.*;

import my_restaurant.Exceptions.CustomException;
import my_restaurant.model.Restaurant;
import my_restaurant.model.Review;

import org.springframework.http.HttpStatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cloud.gateway.support.NotFoundException;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;

import my_restaurant.service.ReviewServiceInterface;
import my_restaurant.service.RestaurantServiceInterface;

@RestController
@RequestMapping("review")
public class ReviewController {

    @Autowired
    private ReviewServiceInterface reviewService;
    @Autowired
    private RestaurantServiceInterface restaurantService;

    @GetMapping
    public List<Review> getAllReviews() throws Exception {
        return reviewService.getAllReviews();
    }

    @GetMapping("/{id}")
    public Review getReview(@PathVariable UUID id) throws Exception {
        return reviewService.getReview(id);
    }

    @PostMapping
    public Review createReview(@RequestBody Map<String, Object> payload) throws Exception {
        UUID restaurantId = UUID.fromString((String) payload.get("restaurantId"));
        Restaurant restaurant = restaurantService.getRestaurantById(restaurantId);

        Review review = new Review();
        review.setName((String) payload.get("name"));
        review.setEmail((String) payload.get("email"));
        review.setComment((String) payload.get("comment"));
        review.setRating((Integer) payload.get("rating"));
        review.setRestaurant(restaurant); // Here is where the Restaurant object is set to the Review

        return reviewService.saveReview(review);
    }

    @DeleteMapping("/{id}")
    public void deleteReview(@PathVariable UUID id) throws Exception {
        reviewService.deleteReview(id);
    }
}
