import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CustomerService } from '../../core/services/customer.service';
import { Subscription } from 'rxjs';
import { Customer } from '../../shared/models/customer.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-customer-create',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './customer-create.component.html',
  styleUrl: './customer-create.component.css'
})
export class CustomerCreateComponent {
  customerForm: FormGroup;
  customerService = inject(CustomerService);
  private subscription: Subscription;

  constructor(private fb: FormBuilder,private toastr: ToastrService,) {
    this.customerForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(100)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required]],
      address: ['', [Validators.required, Validators.maxLength(255)]],
    });

    this.subscription = this._submitSubscription();
  }
  private _submitSubscription(){
      // Subscribe to the submit event
      return this.customerService.submitForm$.subscribe(() => {
        this.onSubmit();
      });
  }
  onSubmit(): void {
    if (this.customerForm.valid) {
      let formValue = this.customerForm.value as Customer;
      this.customerService.post(formValue).subscribe(res=>{
        if(res.statusCode === 201){
          this.toastr.success(res.message, res.statusCode);
          this.customerForm.reset(); 
        }
       
      });
     
    } else {
      console.error('Form is invalid');
    }
  }
  ngOnDestroy(): void {
    // Unsubscribe to prevent memory leaks
    this.subscription.unsubscribe();
  }
}
