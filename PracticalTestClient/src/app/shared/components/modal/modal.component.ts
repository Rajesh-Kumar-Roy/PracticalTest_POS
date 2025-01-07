import { CommonModule } from '@angular/common';
import { Component, ElementRef, EventEmitter, Input, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { BsModalRef, BsModalService, ModalDirective } from 'ngx-bootstrap/modal';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomerCreateComponent } from '../../../pages/customer-create/customer-create.component';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule,CustomerCreateComponent],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss'
})
export class ModalComponent implements OnInit {

  @Input() title: string = '';
  @Input() showModal: boolean = false;
  @Output() closeModalEvent = new EventEmitter<void>();
  @Input() modalSizeClass: string = 'modal-lg';
  @Input() modalLeftButtonName: string = 'close';
  @Input() modalRightButtonName: string = 'Save';
  @Input() modalLeftClassName: string = 'secondary';
  @Input() modalRightClassName: string = 'primary';
  @Input() isModelHeader: boolean = true;
  @Input() isModelFooter: boolean = true;
  @Output() submitButtonEvent: EventEmitter<any> = new EventEmitter<any>(); 

  ngOnInit(): void {

  }


  closeModal() {
    this.showModal = false;
    this.closeModalEvent.emit();
  }
  submitButton(){
    this.submitButtonEvent.emit();
  }
 
}
