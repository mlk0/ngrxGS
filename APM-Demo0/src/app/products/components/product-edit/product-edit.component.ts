import { Component, OnInit, OnDestroy, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


import { Product } from '../../product';
import { GenericValidator } from '../../../shared/generic-validator';
import { NumberValidators } from '../../../shared/number.validator';

import * as fromProductState from '../../state';



@Component({
  selector: 'pm-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit, OnChanges {
  ngOnChanges(changes: SimpleChanges): void {
    console.log( `ProductEditComponent.OnChanges - SimpleChanges : ${JSON.stringify(changes)}`);
    this.displayProduct();
  }
  
  @Input() errorMessage: string;
  @Input() selectedProduct : Product;

  
  @Output() deleteProductId = new EventEmitter<number>();
  @Output() saveOrUpdateProduct = new EventEmitter<Product>(); 
  @Output() clearCurrentProduct = new EventEmitter();
  
  pageTitle = 'Product Edit';
  productForm: FormGroup;

   

  // Use with the generic validation message class
  displayMessage: { [key: string]: string } = {};
  private validationMessages: { [key: string]: { [key: string]: string } };
  private genericValidator: GenericValidator;
  
  

  constructor(private fb: FormBuilder,
            ) {

    // Defines all of the validation messages for the form.
    // These could instead be retrieved from a file or database.
    this.validationMessages = {
      productName: {
        required: 'Product name is required.',
        minlength: 'Product name must be at least three characters.',
        maxlength: 'Product name cannot exceed 50 characters.'
      },
      productCode: {
        required: 'Product code is required.'
      },
      starRating: {
        range: 'Rate the product between 1 (lowest) and 5 (highest).'
      }
    };

    // Define an instance of the validator for use with this form,
    // passing in this form's set of validation messages.
    this.genericValidator = new GenericValidator(this.validationMessages);
  }

  ngOnInit(): void {

   // this.displayProduct();

    // Define the form group
    this.productForm = this.fb.group({
      productName: ['', [Validators.required,
                         Validators.minLength(3),
                         Validators.maxLength(50)]],
      productCode: ['', Validators.required],
      starRating: ['', NumberValidators.range(1, 5)],
      description: ''
    });

    

     
    // Watch for value changes
    this.productForm.valueChanges.subscribe(
      value => this.displayMessage = this.genericValidator.processMessages(this.productForm)
    );
    
  }

   

  // Also validate on blur
  // Helpful if the user tabs through required fields
  blur(): void {
    this.displayMessage = this.genericValidator.processMessages(this.productForm);
  }

 

  displayProduct(): void {
    // Set the local product property
   // this.product = product;


    if (this.selectedProduct) {
      // Reset the form back to pristine
      this.productForm.reset();

      // Display the appropriate page title
      if (this.selectedProduct.id === 0) {
        this.pageTitle = 'Add Product';
      } else {
        this.pageTitle = `Edit Product: ${this.selectedProduct.productName}`;
      }

      // Update the data on the form
      this.productForm.patchValue({
        productName: this.selectedProduct.productName,
        productCode: this.selectedProduct.productCode,
        starRating: this.selectedProduct.starRating,
        description: this.selectedProduct.description
      });
    }
  }

  

  cancelEdit(): void {
    // Redisplay the currently selected product
    // replacing any edits made
    this.displayProduct();
  }

  deleteProduct(): void {
    if (this.selectedProduct && this.selectedProduct.id) {
      if (confirm(`Really delete the product: ${this.selectedProduct.productName}?`)) {

      //  this.store.dispatch(new fromProductActions.DeleteProduct(this.product.id));

      this.deleteProductId.emit(this.selectedProduct.id);


        

      }
    } else {
      // No need to delete, it was never saved
      

      this.clearCurrentProduct.emit();

    }
  }

  saveProduct(): void {
    if (this.productForm.valid) {
      if (this.productForm.dirty) {
        // Copy over all of the original product properties
        // Then copy over the values from the form
        // This ensures values not on the form, such as the Id, are retained
        const p = { ...this.selectedProduct, ...this.productForm.value };

        this.saveOrUpdateProduct.emit(p);
 

      }
    } else {
      this.errorMessage = 'Please correct the validation errors.';
    }
  }

}
