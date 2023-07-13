package my_restaurant.service.Impl;

import my_restaurant.Dto.RestaurantDTO;
import my_restaurant.Exceptions.CustomException;
import my_restaurant.model.Dish;
import my_restaurant.model.Restaurant;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.multipart.MultipartFile;

import com.cloudinary.Cloudinary;
import com.cloudinary.api.*;
import com.cloudinary.api.ApiResponse;
import com.cloudinary.utils.ObjectUtils;

import jakarta.servlet.http.HttpServletRequest;
import my_restaurant.repository.RestaurantRepository;
import my_restaurant.service.RestaurantServiceInterface;
import my_restaurant.user.User;
import my_restaurant.user.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.Arrays;
import java.util.List;
import java.util.UUID;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class RestaurantImplement implements RestaurantServiceInterface {

  @Autowired
  private RestaurantRepository restaurantRepository;

  @Autowired
  private Cloudinary cloudinary;

  @Autowired
  private BCryptPasswordEncoder bCryptPasswordEncoder;

  @Autowired
  private UserRepository userRepository;

  @Override
  public Restaurant addRestaurant(
      MultipartFile file,
      String name,
      String url,
      String linkColor,
      String kitchen,
      String address,
      String phone,
      String userId) {
    try {
      // Upload the file to Cloudinary
      Map uploadResult = cloudinary.uploader().upload(file.getBytes(),
          ObjectUtils.asMap("folder", "my_restaurant/restaurants"));
      String imageUrl = (String) uploadResult.get("url");
      String imagePublicId = (String) uploadResult.get("public_id");

      // Find the user
      User user = userRepository.findById(UUID.fromString(userId)).orElse(null);
      if (user == null) {
        throw new RuntimeException("Could not find user with ID " + userId);
      }

      // Create new Restaurant
      Restaurant restaurant = new Restaurant();
      restaurant.setId(UUID.randomUUID());
      restaurant.setName(name);
      restaurant.setUrl(url);
      restaurant.setLinkColor(linkColor);
      restaurant.setAddress(address);
      restaurant.setPhone(phone);
      restaurant.setHeaderImage(imageUrl); // Store the url returned by Cloudinary
      restaurant.setImagePublicId(imagePublicId);
      ;
      restaurant.setKitchen(kitchen);
      restaurant.setUser(user); // Set the user as the owner of the restaurant

      // Save restaurant
      return restaurantRepository.save(restaurant);
    } catch (IOException e) {
      throw new RuntimeException("Could not save restaurant data: " + e.getMessage());
    }
  }

  @Override
  public Restaurant updateRestaurant(
      MultipartFile file,
      String name,
      String url,
      String linkColor,
      String kitchen,
      String address,
      String phone,
      String userId) {
    try {
      // Find the restaurant
      User user = userRepository.findById(UUID.fromString(userId)).orElse(null);
      if (user == null) {
        throw new RuntimeException("Could not find user with ID " + userId);
      }

      Restaurant restaurant = restaurantRepository.findByUserId(user.getId());
      // Update the fields
      restaurant.setName(name);
      restaurant.setUrl(url);
      restaurant.setLinkColor(linkColor);
      restaurant.setAddress(address);
      restaurant.setPhone(phone);
      restaurant.setKitchen(kitchen);

      // Update the image if provided
      if (file != null) {
        // Upload the new file to Cloudinary
        Map uploadResult = cloudinary.uploader().upload(file.getBytes(),
            ObjectUtils.asMap("folder", "my_restaurant/restaurants"));
        String imageUrl = (String) uploadResult.get("url");
        String imagePublicId = (String) uploadResult.get("public_id");

        // Delete the previous image from Cloudinary
        cloudinary.uploader().destroy(restaurant.getImagePublicId(), ObjectUtils.emptyMap());

        // Update the image fields
        restaurant.setHeaderImage(imageUrl);
        restaurant.setImagePublicId(imagePublicId);
      }

      // Save the updated restaurant
      return restaurantRepository.save(restaurant);
    } catch (IOException e) {
      throw new RuntimeException("Could not update restaurant data: " + e.getMessage());
    }
  }

  @Override
  public List<RestaurantDTO> getList() {
    return restaurantRepository.findAll().stream().map(this::convertEntityToDto).collect(Collectors.toList());
  }

  @Override
  public List<Restaurant> getAllList() {
    return restaurantRepository.findAll();
  }

  @Override
  public RestaurantDTO convertEntityToDto(Restaurant r) {
    RestaurantDTO restaurantDTO = new RestaurantDTO();
    restaurantDTO.setId(r.getId());
    restaurantDTO.setName(r.getName());
    restaurantDTO.setUrl(r.getUrl());
    restaurantDTO.setLinkColor(r.getLinkColor());
    restaurantDTO.setHeaderImage(r.getHeaderImage());
    restaurantDTO.setAddress(r.getAddress());
    restaurantDTO.setPhone(r.getPhone());
    return restaurantDTO;
  }

  @Override
  public Restaurant getRestaurantById(UUID id) throws CustomException {
    return restaurantRepository.findById(id)
        .orElseThrow(() -> new CustomException("Restaurant not found"));
  }

  @Override
  public Restaurant getRestaurantByUserId(UUID userId) throws CustomException {
    Restaurant restaurant = restaurantRepository.findByUserId(userId);

    if (restaurant == null) {
      throw new CustomException("Restaurant not found for user ID: " + userId);
    }

    return restaurant;
  }

  @Override
  public void deleteRestaurant(UUID id) throws CustomException {
    Restaurant restaurant = restaurantRepository.findById(id).orElseThrow(
        () -> new CustomException("Restaurant not found by id", HttpStatus.BAD_REQUEST));

    // Supprimer l'image du restaurant de Cloudinary
    try {
      ApiResponse apiResponse = cloudinary.api().deleteResources(Arrays.asList(restaurant.getImagePublicId()),
          ObjectUtils.asMap("type", "upload", "resource_type", "image"));
      System.out.println(apiResponse);
    } catch (Exception e) {
      System.out.println(e.getMessage());
    }

    // Supprimer les images des plats de Cloudinary
    for (Dish dish : restaurant.getDishes()) {
      try {
        ApiResponse apiResponse = cloudinary.api().deleteResources(Arrays.asList(dish.getImagePublicId()),
            ObjectUtils.asMap("type", "upload", "resource_type", "image"));
        System.out.println(apiResponse);
      } catch (Exception e) {
        System.out.println(e.getMessage());
      }
    }

    // Supprimer le restaurant de la base de données
    restaurantRepository.delete(restaurant);
  }

}
