package my_restaurant.controller;

import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import jakarta.servlet.http.HttpServletRequest;

import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;

import my_restaurant.Exceptions.CustomException;
import my_restaurant.config.JwtService;
import my_restaurant.model.Dish;
import my_restaurant.model.Restaurant;
import my_restaurant.service.DishServiceInterface;
import my_restaurant.service.RestaurantServiceInterface;

@RestController
@RequestMapping("dish")
public class DishController {

    @Autowired
    private DishServiceInterface dishService;

    @Autowired
    private RestaurantServiceInterface restaurantService;

    @Autowired
    public JwtService jwtService;

    public DishController(DishServiceInterface dishService) {
        this.dishService = dishService;
    }

    @GetMapping()
    public ResponseEntity<?> getDishesList() {
        try {
            List<Dish> dishes = dishService.getDishes();
            return new ResponseEntity<>(dishes, HttpStatus.OK);
        } catch (CustomException e) {
            return new ResponseEntity<>(e.getMessage(), e.getHttpStatus());
        }
    }

    @GetMapping("{id}")
    public ResponseEntity<?> getDishById(@PathVariable UUID id) {
        try {
            Dish dish = dishService.getDishById(id);
            return new ResponseEntity<>(dish, HttpStatus.OK);
        } catch (CustomException e) {
            return new ResponseEntity<>(e.getMessage(), e.getHttpStatus());
        }
    }

    @PostMapping()
    public ResponseEntity<?> saveDish(HttpServletRequest request, @RequestParam("file") MultipartFile file,
            @RequestParam("name") String name,
            @RequestParam("description") String description,
            @RequestParam("price") Number price,
            @RequestParam("allergens") String allergens) {

        try {

            String token = request.getHeader("Authorization").substring(7);
            UUID userId = jwtService.getUserIdFromToken(token);
            Restaurant restaurant = restaurantService.getRestaurantByUserId(userId);


            if (restaurant == null) {
                return new ResponseEntity<>("No restaurant found for the provided user ID", HttpStatus.NOT_FOUND);
            }

            dishService.addDish(
                    file,
                    name,
                    description,
                    price,
                    allergens,
                    restaurant.getId()

            );

            return new ResponseEntity<>("Restaurant added successfully.", HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateDish(HttpServletRequest request, @RequestParam("file") MultipartFile file,
            @RequestParam("name") String name,
            @RequestParam("description") String description,
            @RequestParam("price") Number price,
            @RequestParam("allergens") String allergens,
            @PathVariable UUID id) {

        try {

            String token = request.getHeader("Authorization").substring(7);
            UUID userId = jwtService.getUserIdFromToken(token);
            Restaurant restaurant = restaurantService.getRestaurantByUserId(userId);

            System.out.println(restaurant);

            if (restaurant == null) {
                return new ResponseEntity<>("No restaurant found for the provided user ID", HttpStatus.NOT_FOUND);
            }

            dishService.updateDish(
                    file,
                    name,
                    description,
                    price,
                    allergens,
                    restaurant.getId(),
                    id

            );

            return new ResponseEntity<>("Dish updated successfully.", HttpStatus.OK);

        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteDish(@PathVariable UUID id) {
        try {
            dishService.deleteDish(id);
            return new ResponseEntity<>("dish with id " + id + " was removed", HttpStatus.OK);
        } catch (CustomException e) {
            return new ResponseEntity<>(e.getMessage(), e.getHttpStatus());
        }
    }
}
