package my_restaurant.service.Impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.cloudinary.utils.ObjectUtils;

import my_restaurant.Exceptions.CustomException;
import my_restaurant.model.Dish;
import my_restaurant.model.Restaurant;
import my_restaurant.model.Section;
import my_restaurant.repository.DishRepository;
import my_restaurant.repository.RestaurantRepository;
import my_restaurant.repository.SectionRepository;
import my_restaurant.service.SectionServiceInterface;
import my_restaurant.user.User;

import java.io.IOException;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@Service
public class SectionImplement implements SectionServiceInterface {

    @Autowired
    private SectionRepository sectionRepository;

    @Autowired
    private DishRepository dishRepository;

    @Autowired
    private RestaurantRepository restaurantRepository;

    public Section createSection(Section section) throws CustomException {
        try {
            return sectionRepository.save(section);
        } catch (Exception e) {
            e.printStackTrace(); // Ajouter cette ligne pour imprimer la pile des exceptions.
            throw new CustomException("Could not create section", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public List<Section> getAllSections() {
        return sectionRepository.findAll();

    }

    @Override
    public Section getSection(UUID id) throws CustomException {
        return sectionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Section not found"));
    }

    public Section updateSection(Section section) {
        return sectionRepository.save(section);
    }

    public void deleteSection(UUID id) {
        sectionRepository.deleteById(id);
    }

    @Override
    public Section saveSection(Section section) {
        // Persist the section and make sure the relationships are properly cascaded
        return sectionRepository.save(section);
    }

    @Override
    public Section getSectionById(UUID id) throws CustomException {
        Section section = sectionRepository.findById(id).orElseThrow(
                () -> new CustomException("get student by id - not found ", HttpStatus.BAD_REQUEST));
        return section;
    }

    @Override
    public Section addDishToSection(UUID sectionId, UUID dishId) {
        Section section = sectionRepository.findById(sectionId).orElse(null);
        Dish dish = dishRepository.findById(dishId).orElse(null);

        if (section != null && dish != null) {
            section.getDishes().add(dish);
            dish.getSections().add(section);
            sectionRepository.save(section);
            dishRepository.save(dish);
        }

        return section;
    }

    @Override
    public Section removeDishFromSection(UUID sectionId, UUID dishId) {
        Section section = sectionRepository.findById(sectionId).orElse(null);
        Dish dish = dishRepository.findById(dishId).orElse(null);

        if (section != null && dish != null) {
            section.getDishes().remove(dish);
            dish.getSections().remove(section);
            sectionRepository.save(section);
            dishRepository.save(dish);
        }

        return section;
    }

}
