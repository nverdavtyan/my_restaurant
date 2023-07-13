import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SectionService } from '../../core/services/section.service';

@Component({
  selector: 'app-admin-create-section',
  templateUrl: './create-section.component.html',
})
export class CreateSectionComponent implements OnInit {
  
  sections: any[] = [];
  validateForm: FormGroup;

  constructor(
    private sectionService: SectionService,
    private formBuilder: FormBuilder
  ) {
    this.validateForm = this.formBuilder.group({
      name: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.getSections();
  }

  getSections(): void {
    this.sectionService
      .getSections()
      .subscribe((sections) => (this.sections = sections));
  }

  submitForm(): void {

    if (this.validateForm.valid) {
      this.sectionService
        .createSection(this.validateForm.value)
        .subscribe((section) => {
          this.validateForm.reset();
          this.getSections();
        });
    }
  }

  onDelete(id: string): void {
    this.sectionService.deleteSection(id).subscribe((section) => {
      this.getSections();
    });
  }
}
