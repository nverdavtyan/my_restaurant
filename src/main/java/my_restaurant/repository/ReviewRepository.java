package my_restaurant.repository;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import my_restaurant.model.Review;

public interface ReviewRepository  extends JpaRepository<Review, UUID>{
}

