package my_restaurant.repository;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import my_restaurant.model.Restaurant;

public interface RestaurantRepository extends JpaRepository<Restaurant, UUID> {
    Restaurant findByUserId(UUID userId);
}
