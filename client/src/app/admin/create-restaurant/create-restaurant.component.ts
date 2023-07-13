import {
  Component,
  ElementRef,
  EventEmitter,
  Inject,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { RestaurantService } from '../../core/services/restaurant.service';
import { AdminService } from '../../core/services/admin.service'; // Assumant que vous avez un service d'authentification.
import {
  FormBuilder,
  FormGroup,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Observer, Subscription, switchMap } from 'rxjs';
import { NzUploadChangeParam, NzUploadFile } from 'ng-zorro-antd/upload';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { NzModalService } from 'ng-zorro-antd/modal';
import { DOCUMENT } from '@angular/common';
import { Address } from 'ngx-google-places-autocomplete/objects/address';
import { environment } from '../../../environments/environment';

const googleApiKey = environment.googleApiKey;

@Component({
  selector: 'app-admin-create-restaurant',
  templateUrl: './create-restaurant.component.html',
  
})
export class CreateRestaurantComponent implements OnInit {
  options: any = {
    types: ['address'],
    componentRestrictions: { country: 'FR' },
    
  };
  editMode = false;

  previewImage: string | undefined = '';
  previewVisible = false;
  restaurant: any;

  registerForm!: FormGroup;
  selectedImage: File | undefined;

  isConfirmLoading = false;
  createIsVisible = false;
  updateIsVisible = false;

  fileList: NzUploadFile[] = [];

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private elementRef: ElementRef,
    private fb: FormBuilder,
    private adminService: AdminService,
    private notification: NzNotificationService,
    private modal: NzModalService
  ) {}

  showEditModal(restaurant: any): void {
    this.editMode = true;
    this.restaurant = restaurant;
    this.registerForm.patchValue(restaurant);
    this.createIsVisible = true;
  }

  handleOk(): void {
    setTimeout(() => {
      this.isConfirmLoading = false;
      this.createIsVisible = false;
      this.updateIsVisible = false;
      this.editMode = false; // reset edit mode
      this.getRestaurant();
      this.registerForm.reset();
    }, 1000);
  }

  handleCancel(): void {
    this.createIsVisible = false;
    this.updateIsVisible = false;
  }

  showCreateModal(): void {
    this.createIsVisible = true;
  }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      file: [null],
      name: ['', Validators.required],
      url: ['', Validators.required],
      linkColor: ['', Validators.required],
      kitchen: ['', Validators.required],
      address: ['', Validators.required],
      phone: ['', Validators.required],
    });

    this.adminService.currentRestaurant.subscribe(
      (restaurant) => (this.restaurant = restaurant)
    );
    this.getRestaurant();

    this.loadScript()
      .then(() => {
        console.log('Google Maps JavaScript API script loaded successfully');
      })
      .catch((error) => {
        console.error(
          'Error occurred while loading Google Maps JavaScript API script: ',
          error
        );
      });
  }

  handleAddressChange(address: Address) {
    console.log(address.formatted_address);
    console.log(address.geometry.location.lat());
    console.log(address.geometry.location.lng());
  }

  loadScript() {
    return new Promise((resolve, reject) => {
      const element = this.document.createElement('script');
      element.type = 'text/javascript';
      element.src = `https://maps.googleapis.com/maps/api/js?key=${googleApiKey}&libraries=places&language=en`;
      element.onload = resolve;
      element.onerror = reject;
      this.elementRef.nativeElement.appendChild(element);
    });
  }

  register(): void {
    this.isConfirmLoading = true;
    const formData = this.buildFormData();

    this.adminService.post(formData).subscribe(
      (data) => {
        this.notification.success(
          'Succès',
          'Le restaurant a été créé avec succès'
        );
        this.handleOk();
      },
      (error) => {
        console.log(error);
        this.notification.error(
          'Error',
          "Erreur lors de l'ajout du restaurant"
        );
        this.isConfirmLoading = false;
      }
    );
  }

  updateRestaurant(): void {
    this.isConfirmLoading = true;
    const formData = this.buildFormData();

    this.adminService.updateRestaurant(formData).subscribe(
      (data) => {
        this.notification.success(
          'Succès',
          'Le restaurant a été mis à jour avec succès'
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
    formData.append('name', this.registerForm.value.name);
    formData.append('url', this.registerForm.value.url);
    formData.append('linkColor', this.registerForm.value.linkColor);
    formData.append('kitchen', this.registerForm.value.kitchen);
    formData.append('address', this.registerForm.value.address);
    formData.append('phone', this.registerForm.value.phone);

    return formData;
  }

  handleImageUpload(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedImage = input.files[0];
    }
  }

  beforeUpload = (file: NzUploadFile): boolean => {
    this.fileList = this.fileList.concat(file);
    return false;
  };

  getRestaurant(): void {
    this.adminService.getRestaurantById().subscribe(
      (data) => {
        this.adminService.changeRestaurant(data);
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }

  deleteRestaurant(): void {
    this.adminService
      .deleteRestaurant()
      .pipe(switchMap(async () => this.getRestaurant()))
      .subscribe((restaurant) => {
        this.adminService.changeRestaurant(restaurant);
      });
  }

  showDeleteConfirm(): void {
    this.modal.confirm({
      nzTitle: `Êtes-vous sûr(e) de supprimer votre restaurant?`,
      nzOkText: 'Oui',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () => this.deleteRestaurant(),
      nzCancelText: 'Non',
    });
  }
}
