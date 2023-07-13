import { Component, OnInit } from '@angular/core';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { DishService } from 'src/app/core/services/dish.service';
import { SectionService } from 'src/app/core/services/section.service';
import { MenuService } from 'src/app/core/services/menu.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-admin-drag-drop',
  templateUrl: './drag-drop.component.html',
  styleUrls: ['./drag-drop.component.scss'],
})
export class DragDropComponent implements OnInit {
  sections: any[] = [];
  dishes: any[] = [];

  constructor(
    private dishService: DishService,
    private sectionService: SectionService,
    private menuService: MenuService,
    private notification: NzNotificationService
  ) {}

  ngOnInit() {
    this.fetchSections();
    this.fetchDishes();
  }

  fetchSections() {
    this.sectionService.getSections().subscribe((sections) => {
      this.sections = sections;
      this.fetchDishes();
    });
  }

  removeDishFromSection(dish: any, section: any) {
    this.menuService

      .removeDishFromSection(dish, section)
      .subscribe((section) => {
        this.fetchSections();
      });
  }

  fetchDishes() {
    this.dishService.getDishes().subscribe((allDishes) => {
      // Pour chaque section, vérifiez chaque plat
      // Si le plat est dans la section, ne l'ajoutez pas à 'this.dishes'
      this.dishes = allDishes.filter((dish: any) => {
        for (let section of this.sections) {
          if (
            section.dishes.some(
              (sectionDish: any) => sectionDish.id === dish.id
            )
          ) {
            return false; // si le plat est dans une section, on le filtre (on le retire)
          }
        }
        return true; // si le plat n'est dans aucune section, on le conserve
      });
    });
  }

  drop(event: CdkDragDrop<any[]>, section?: any) {
    const movedDish = event.container.data[event.currentIndex];
    console.log('movedDish', movedDish);

    // check if the dish is already in the section
    if (section && section.dishes.includes(movedDish)) {
      console.log('This dish already exists in the target section');
      this.notification.error(
        'Error',
        'This dish already exists in the target section'
      );
      return;
    }

    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );

      // If a dish is dropped into a section, update the dish's section_id
      if (section) {
        const movedDish = event.container.data[event.currentIndex];
        movedDish.section_id = section.id;
        
        this.menuService.addDishToSection(section.id, movedDish.id).subscribe();

       // this.removeDishFromPreviousSection(movedDish);
      }
    }
  }

  // Remove the dish from its previous section if it exists
  removeDishFromPreviousSection(dish: any) {
    this.sections.forEach((section) => {
      if (section.dishes.includes(dish)) {
        console.log('Removing dish from section', section.id, dish.id);

        this.menuService
          .removeDishFromSection(section.id, dish.id)
          .subscribe(() => {
            // Remove the dish from the local section object to avoid refreshing the page
            const index = section.dishes.indexOf(dish);
            if (index > -1) {
              section.dishes.splice(index, 1);
            }
          });
      }
    });
  }
}
