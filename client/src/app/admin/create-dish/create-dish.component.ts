import { Component, Input, OnInit } from '@angular/core';
import { DishService } from '../../core/services/dish.service'; // Assumant que vous avez un service pour les plats.
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Observer, Subscription, switchMap } from 'rxjs';
import { NzUploadChangeParam, NzUploadFile } from 'ng-zorro-antd/upload';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { NzModalService } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-admin-create-dish',
  templateUrl: './create-dish.component.html',
})
export class CreateDishComponent implements OnInit {
  previewImage: string | undefined = '';
  previewVisible = false;
  dishes: any[] = [];
  dish: any;

  editMode = false;

  validateForm!: FormGroup;
  selectedImage: File | undefined;

  private subscriptions: Subscription[] = [];
  isConfirmLoading = false;
  createIsVisible = false;
  updateIsVisible = false;

  fileList: NzUploadFile[] = [];

  constructor(
    private fb: FormBuilder,
    private dishService: DishService,
    private router: Router,
    private msg: NzMessageService,
    private notification: NzNotificationService,
    private modal: NzModalService
  ) {}

  handleOk(): void {
    setTimeout(() => {
      this.isConfirmLoading = false;
      this.createIsVisible = false;
      this.updateIsVisible = false;
      this.editMode = false;
      this.getDishes();
      this.validateForm.reset();
    }, 500);
  }

  handleCancel(): void {
    this.createIsVisible = false;
    this.updateIsVisible = false;
  }

  showCreateModal(): void {
    this.createIsVisible = true;
  }

  showEditModal(dish: any): void {
    this.editMode = true;
    this.dish = dish;
    this.validateForm.patchValue(dish);
    this.createIsVisible = true;
  }
  ngOnInit(): void {
    this.getDishes();
    this.validateForm = this.fb.group({
      file: [null],
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', Validators.required],
      allergens: ['', Validators.required],
    });
  }
  register(): void {
    this.isConfirmLoading = true;
    const formData = this.buildFormData();

    this.dishService.post(formData).subscribe(
      () => {
        this.notification.success('Succès', 'Le plat a été créé avec succès');
        this.handleOk();
      },
      (error) => {
        console.log(error);
        this.notification.error('Error', "Erreur lors de l'ajout du plat");
        this.isConfirmLoading = false;
      }
    );
  }

  updateDish(id: any): void {
    this.isConfirmLoading = true;
    const formData = this.buildFormData();
    console.log(id);

    this.dishService.updateDish(id, formData).subscribe(
      (data) => {
        this.notification.success(
          'Succès',
          'Le plat a été mis à jour avec succès'
        );
        this.handleOk();
      },
      (error) => {
        console.log(error);
        this.notification.error(
          'Error',
          'Erreur lors de la mise à jour du restaurant'
        );
        this.isConfirmLoading = false;
      }
    );
  }

  buildFormData(): FormData {
    const formData = new FormData();
    this.fileList.forEach((file: any) => {
      formData.append('file', file);
    });
    formData.append('name', this.validateForm.value.name);
    formData.append('description', this.validateForm.value.description);
    formData.append('price', this.validateForm.value.price);
    formData.append('allergens', this.validateForm.value.allergens);

    return formData;
  }

  beforeUpload = (file: NzUploadFile): boolean => {
    this.fileList = this.fileList.concat(file);
    return false;
  };

  getDishes(): void {
    this.dishService.getDishes().subscribe((dishes) => (this.dishes = dishes));
  }

  deleteDish(id: any): void {
    this.dishService
      .deleteDish(id)
      .pipe(switchMap(async () => this.getDishes()))
      .subscribe((dish) => {
        // Ici, vous devez mettre à jour la liste de vos restaurants avec les données retournées
        // par la méthode getRestaurant()
        this.dish = dish;
      });
  }

  showDeleteConfirm(id: any): void {
    this.modal.confirm({
      nzTitle: `Êtes-vous sûr(e) de supprimer votre restaurant?`,
      nzOkText: 'Oui',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () => this.deleteDish(id),
      nzCancelText: 'Non',
    });
  }
}
