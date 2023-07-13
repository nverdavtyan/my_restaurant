package my_restaurant.controller;

import org.springframework.web.bind.annotation.*;

import jakarta.servlet.http.HttpServletRequest;
import my_restaurant.Exceptions.CustomException;
import my_restaurant.config.JwtService;
import my_restaurant.model.Dish;
import my_restaurant.model.Restaurant;
import my_restaurant.model.Section;
import my_restaurant.repository.DishRepository;
import my_restaurant.repository.SectionRepository;
import my_restaurant.service.DishServiceInterface;
import my_restaurant.service.RestaurantServiceInterface;
import my_restaurant.service.SectionServiceInterface;

import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;

@RestController
@RequestMapping("section")
public class SectionController {

    @Autowired
    private SectionServiceInterface sectionService;

    @Autowired
    private RestaurantServiceInterface restaurantService;

    @Autowired
    public JwtService jwtService;

    @Autowired
    private SectionRepository sectionRepository;

    @Autowired
    private DishRepository dishRepository;

    @PostMapping
    @ResponseBody
    public ResponseEntity<?> createSection(HttpServletRequest request, @RequestBody Section section) {
        try {

            // Obtenir le token JWT à partir de l'en-tête Authorization
            String token = request.getHeader("Authorization").substring(7);

            // Décoder le token JWT et extraire l'ID de l'utilisateur
            UUID userId = jwtService.getUserIdFromToken(token);

            // Récupérer le restaurant en utilisant l'ID de l'utilisateur
            Restaurant restaurant = restaurantService.getRestaurantByUserId(userId);

            if (restaurant == null) {
                return new ResponseEntity<>("No restaurant found for user", HttpStatus.NOT_FOUND);
            }
            section.setRestaurant(restaurant);
            Section createdSection = sectionService.createSection(section);

            return new ResponseEntity<>(createdSection, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getSection(@PathVariable UUID id) {
        try {
            Section section = sectionService.getSection(id);
            return new ResponseEntity<>(section, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping("/update")
    public ResponseEntity<?> updateSection(@RequestBody Section section) {
        try {
            Section updatedSection = sectionService.updateSection(section);
            return new ResponseEntity<>(updatedSection, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteSection(@PathVariable UUID id) {
        try {
            sectionService.deleteSection(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping
    public ResponseEntity<?> getAllSections() {
        try {
            List<Section> sections = sectionService.getAllSections();
            return new ResponseEntity<>(sections, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/{sectionId}/dishes/{dishId}")
    public ResponseEntity<Section> addDishToSection(
            @PathVariable UUID sectionId,
            @PathVariable UUID dishId) {
        Section section = sectionService.addDishToSection(sectionId, dishId);

        if (section != null) {
            return ResponseEntity.ok(section);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{sectionId}/dishes/{dishId}")
    public ResponseEntity<Section> removeDishFromSection(
            @PathVariable UUID sectionId,
            @PathVariable UUID dishId) {
        Section section = sectionService.removeDishFromSection(sectionId, dishId);
        System.out.println("section: " + section);
        if (section != null) {
            return ResponseEntity.ok(section);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

}
