package my_restaurant.service;

import java.util.List;
import java.util.UUID;

import my_restaurant.Exceptions.CustomException;
import my_restaurant.model.Restaurant;
import my_restaurant.model.Section;

public interface SectionServiceInterface {

    Section createSection(Section section) throws Exception;

    List<Section> getAllSections() throws CustomException;

    Section getSection(UUID id) throws Exception;

    Section updateSection(Section section) throws Exception;

    void deleteSection(UUID id) throws Exception;

    Section getSectionById(UUID id) throws Exception;

    Section saveSection(Section section);

    Section addDishToSection(UUID sectionId, UUID dishId);

    Section removeDishFromSection(UUID sectionId, UUID dishId);

}
