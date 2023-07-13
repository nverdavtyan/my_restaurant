package my_restaurant.controller;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import jakarta.servlet.http.HttpServletRequest;
import my_restaurant.Dto.RestaurantDTO;
import my_restaurant.Exceptions.CustomException;
import my_restaurant.config.JwtService;
import my_restaurant.model.Restaurant;
import my_restaurant.service.RestaurantServiceInterface;

@RestController
@RequestMapping("restaurant")
public class RestaurantController {

    @Autowired
    private RestaurantServiceInterface restaurantService;

    @Autowired
    public JwtService jwtService;

    @PostMapping
    public ResponseEntity<?> saveRestaurant(
            HttpServletRequest request,
            @RequestParam("file") MultipartFile file,
            @RequestParam("name") String name,
            @RequestParam("url") String url,
            @RequestParam("linkColor") String linkColor,
            @RequestParam("kitchen") String kitchen,
            @RequestParam("address") String address,
            @RequestParam("phone") String phone) {
        try {

            String token = request.getHeader("Authorization").substring(7);

            // Décoder le token JWT et extraire l'ID de l'utilisateur
            UUID userId = jwtService.getUserIdFromToken(token);

            restaurantService.addRestaurant(
                    file,
                    name,
                    url,
                    linkColor,
                    kitchen,
                    address,
                    phone,
                    userId.toString());

            return new ResponseEntity<>("Restaurant added successfully.", HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping
    public ResponseEntity<?> updateRestaurant(
            HttpServletRequest request,
            @RequestParam("file") MultipartFile file,
            @RequestParam("name") String name,
            @RequestParam("url") String url,
            @RequestParam("linkColor") String linkColor,
            @RequestParam("kitchen") String kitchen,
            @RequestParam("address") String address,
            @RequestParam("phone") String phone) {
        try {

            String token = request.getHeader("Authorization").substring(7);

            // Décoder le token JWT et extraire l'ID de l'utilisateur
            UUID userId = jwtService.getUserIdFromToken(token);
            Restaurant restaurant = restaurantService.getRestaurantByUserId(userId);

            restaurantService.updateRestaurant(
                    file,
                    name,
                    url,
                    linkColor,
                    kitchen,
                    address,
                    phone,
                    userId.toString());

            return new ResponseEntity<>("Restaurant updated successfully.", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping
    public ResponseEntity<List<RestaurantDTO>> getList() {
        try {
            List<RestaurantDTO> restaurants = restaurantService.getList();
            return new ResponseEntity<>(restaurants, HttpStatus.OK);
        } catch (CustomException e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("all")
    public ResponseEntity<?> getAllList() {
        try {
            List<Restaurant> restaurants = restaurantService.getAllList();
            return new ResponseEntity<>(restaurants, HttpStatus.OK);
        } catch (CustomException e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("{id}")
    public ResponseEntity<?> getRestaurantById(@PathVariable("id") UUID id) {
        try {
            Restaurant restaurant = restaurantService.getRestaurantById(id);
            return new ResponseEntity<>(restaurant, HttpStatus.OK);
        } catch (CustomException e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/manage")
    public ResponseEntity<?> getRestaurantByOwnerId(HttpServletRequest request) {
        try {
            // Obtenir le token JWT à partir de l'en-tête Authorization
            String token = request.getHeader("Authorization").substring(7);

            // Décoder le token JWT et extraire l'ID de l'utilisateur
            UUID userId = jwtService.getUserIdFromToken(token);

            // Récupérer le restaurant en utilisant l'ID de l'utilisateur
            Restaurant restaurant = restaurantService.getRestaurantByUserId(userId);

            if (restaurant == null) {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }

            return new ResponseEntity<>(restaurant, HttpStatus.OK);
        } catch (IllegalArgumentException e) {

            return new ResponseEntity<>("Invalid UUID format: " + e.getMessage(), HttpStatus.BAD_REQUEST);
        } catch (CustomException e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping
    public ResponseEntity<?> deleteRestaurant(HttpServletRequest request) {
        try {
            // Obtenir le token JWT à partir de l'en-tête Authorization
            String token = request.getHeader("Authorization").substring(7);

            // Décoder le token JWT et extraire l'ID de l'utilisateur
            UUID userId = jwtService.getUserIdFromToken(token);

            // Récupérer le restaurant en utilisant l'ID de l'utilisateur
            Restaurant restaurant = restaurantService.getRestaurantByUserId(userId);

            // Vérifier si le restaurant existe avant de le supprimer
            if (restaurant == null) {
                return new ResponseEntity<>("Restaurant not found.", HttpStatus.NOT_FOUND);
            }
            restaurantService.deleteRestaurant(restaurant.getId());
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (CustomException e) {
            e.printStackTrace();
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}