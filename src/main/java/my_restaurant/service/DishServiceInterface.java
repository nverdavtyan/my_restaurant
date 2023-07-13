package my_restaurant.service;

import java.util.List;
import java.util.UUID;

import org.springframework.web.multipart.MultipartFile;

import my_restaurant.Exceptions.CustomException;
import my_restaurant.model.Dish;

public interface DishServiceInterface {

    Dish addDish(MultipartFile file, String name, String description, Number price, String allergens,
            UUID restaurantId)
            throws CustomException;

    Dish updateDish(MultipartFile file, String name, String description, Number price, String allergens,
            UUID restaurantId, UUID dishId) throws CustomException;

    List<Dish> getDishes() throws CustomException;

    void deleteDish(UUID id) throws CustomException;

    Dish getDishById(UUID id) throws CustomException;

}
