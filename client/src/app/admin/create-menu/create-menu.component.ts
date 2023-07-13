import { Component, OnInit } from '@angular/core';
import { DishService } from 'src/app/core/services/dish.service';
import { SectionService } from 'src/app/core/services/section.service';
import { MenuService } from 'src/app/core/services/menu.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-admin-create-menu',
  templateUrl: './create-menu.component.html',
})
export class CreateMenuComponent implements OnInit {
  sections: any[] = [];
  dishes: any[] = [];

  constructor(
    private dishService: DishService,
    private sectionService: SectionService,
    private menuService: MenuService
  ) {}

  ngOnInit() {
    this.fetchSections();
    this.fetchDishes();
  }

  fetchSections() {
    this.sectionService.getSections().subscribe((sections) => {
      this.sections = sections;
    });
  }

  fetchDishes() {
    this.dishService.getDishes().subscribe((dishes) => {
      this.dishes = dishes;
    });
  }

  removeDishFromList(dishId: any) {
    const index = this.dishes.findIndex((dish) => dish.id === dishId);
    if (index !== -1) {
      this.dishes.splice(index, 1);
    }
  }

  addDishToSection(sectionId: any, dishId: any) {
    this.menuService
      .addDishToSection(sectionId, dishId)
      .subscribe((updatedSection) => {
        const index = this.sections.findIndex(
          (section) => section.id === sectionId
        );
        if (index !== -1) {
          this.sections[index] = updatedSection;
        }
        this.removeDishFromList(dishId);
      });
  }

  removeDishFromSection(sectionId: any, dishId: any) {
    this.menuService
      .removeDishFromSection(sectionId, dishId)
      .subscribe((updatedSection) => {
        const index = this.sections.findIndex(
          (section) => section.id === sectionId
        );
        if (index !== -1) {
          this.sections[index] = updatedSection;
        }
        this.fetchDishes();
      });
  }
}
