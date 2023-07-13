package my_restaurant.service;

import java.util.List;
import java.util.UUID;

import org.springframework.web.multipart.MultipartFile;

import my_restaurant.Dto.RestaurantDTO;
import my_restaurant.Exceptions.CustomException;
import my_restaurant.model.Restaurant;

public interface RestaurantServiceInterface {

    Restaurant addRestaurant(MultipartFile file, String name, String url,
            String linkColor,
            String kitchen,

            String address, String phone, String userId) throws CustomException;

    Restaurant updateRestaurant(MultipartFile file, String name, String url,
            String linkColor,
            String kitchen,

            String address, String phone, String userId) throws CustomException;

    List<RestaurantDTO> getList() throws CustomException;

    List<Restaurant> getAllList() throws CustomException;

    RestaurantDTO convertEntityToDto(Restaurant r) throws CustomException;

    Restaurant getRestaurantById(UUID id) throws CustomException;

    Restaurant getRestaurantByUserId(UUID userId) throws CustomException;

    void deleteRestaurant(UUID id) throws CustomException;
}
