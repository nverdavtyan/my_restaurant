package my_restaurant.service.Impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.cloudinary.Cloudinary;
import com.cloudinary.api.ApiResponse;
import com.cloudinary.utils.ObjectUtils;

import my_restaurant.Exceptions.CustomException;
import my_restaurant.model.Dish;
import my_restaurant.model.Restaurant;
import my_restaurant.repository.DishRepository;
import my_restaurant.repository.RestaurantRepository;
import my_restaurant.service.DishServiceInterface;
import my_restaurant.user.User;

import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import org.springframework.http.HttpStatus;

@Service
public class DishImplement implements DishServiceInterface {

    @Autowired
    private DishRepository dishRepository;

    @Autowired
    private RestaurantRepository restaurantRepository;

    @Autowired
    private Cloudinary cloudinary;

    public List<Dish> getDishes() {
        return dishRepository.findAll();
    }

    @Override
    public Dish addDish(MultipartFile file, String name, String description, Number price, String allergens,
            UUID restaurantId)
            throws CustomException {
        try {
            Map uploadResult = cloudinary.uploader().upload(file.getBytes(),
                    ObjectUtils.asMap("folder", "my_restaurant/dishes"));

            String imageUrl = (String) uploadResult.get("url");
            String imagePublicId = (String) uploadResult.get("public_id");

            Restaurant restaurant = restaurantRepository.findById(restaurantId).orElse(null);
            if (restaurant == null) {
                throw new CustomException("Could not find restaurant with ID " + restaurantId, HttpStatus.NOT_FOUND);
            }

            Dish dish = Dish.builder()
                    .name(name)
                    .description(description)
                    .price(price.doubleValue())
                    .allergens(allergens)
                    .imageUrl(imageUrl)
                    .imagePublicId(imagePublicId)
                    .restaurant(restaurant)
                    .build();

            Dish savedDish = dishRepository.save(dish);

            return savedDish;
        } catch (Exception e) {
            throw new CustomException("Could not upload file", HttpStatus.BAD_REQUEST);
        }
    }

  public Dish updateDish(MultipartFile file, String name, String description, Number price, String allergens,
        UUID restaurantId, UUID dishId)
        throws CustomException {
    try {
        Dish existingDish = dishRepository.findById(dishId).orElse(null);
        if (existingDish == null) {
            throw new CustomException("Could not find dish with ID " + dishId, HttpStatus.NOT_FOUND);
        }
        
        // Delete existing image from Cloudinary
        if (existingDish.getImagePublicId() != null) {
            cloudinary.uploader().destroy(existingDish.getImagePublicId(), ObjectUtils.emptyMap());
        }
        
        // Upload new image to Cloudinary
        Map uploadResult = cloudinary.uploader().upload(file.getBytes(),
                ObjectUtils.asMap("folder", "my_restaurant/dishes"));

        String imageUrl = (String) uploadResult.get("url");
        String imagePublicId = (String) uploadResult.get("public_id");

        Restaurant restaurant = restaurantRepository.findById(restaurantId).orElse(null);
        if (restaurant == null) {
            throw new CustomException("Could not find restaurant with ID " + restaurantId, HttpStatus.NOT_FOUND);
        }

        // Update dish details
        existingDish.setName(name);
        existingDish.setDescription(description);
        existingDish.setPrice(price.doubleValue());
        existingDish.setAllergens(allergens);
        existingDish.setImageUrl(imageUrl);
        existingDish.setImagePublicId(imagePublicId);
        existingDish.setRestaurant(restaurant);

        Dish savedDish = dishRepository.save(existingDish);

        return savedDish;
    } catch (Exception e) {
        throw new CustomException("Could not upload file", HttpStatus.BAD_REQUEST);
    }
}


    @Override
    public Dish getDishById(UUID id) throws CustomException {
        Dish dish = dishRepository.findById(id).orElseThrow(
                () -> new CustomException("get student by id - not found ", HttpStatus.BAD_REQUEST));
        return dish;
    }

    @Override
    public void deleteDish(UUID id) throws CustomException {
        Dish dish = dishRepository.findById(id).orElseThrow(
                () -> new CustomException("Dish not found by id", HttpStatus.BAD_REQUEST));

        try {
            ApiResponse apiResponse = cloudinary.api().deleteResources(Arrays.asList(dish.getImagePublicId()),
                    ObjectUtils.asMap("type", "upload", "resource_type", "image"));
            System.out.println(apiResponse);
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }

        dishRepository.deleteById(id);

    }
}
