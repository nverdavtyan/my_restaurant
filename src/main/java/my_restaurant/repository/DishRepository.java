package my_restaurant.repository;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import my_restaurant.model.Dish;

public interface DishRepository  extends JpaRepository<Dish, UUID>{
}

