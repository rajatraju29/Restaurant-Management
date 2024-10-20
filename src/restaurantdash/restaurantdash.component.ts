import { Component, OnInit } from '@angular/core';
import { SharedService } from '../shared.service'; // Adjust the path as necessary
import { FormBuilder, FormGroup, Validators,FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RestaurantData } from './restaurant.model'; // Ensure you have a model defined for restaurant data
import { NgToastService } from 'ng-angular-popup'; // Import toast service for notifications
import { CommonModule } from '@angular/common'; // <-- Import CommonModule for ngFor and other directives
import { MatIconModule } from '@angular/material/icon'; // Import MatIconModule
import { NgxPaginationModule } from 'ngx-pagination'; // Import NgxPaginationModule
import { Router } from '@angular/router';


@Component({
  selector: 'app-restaurantdash',
  standalone: true,
  templateUrl: './restaurantdash.component.html',
  styleUrls: ['./restaurantdash.component.css'],
  imports: [FormsModule, ReactiveFormsModule,CommonModule,MatIconModule,NgxPaginationModule] // Add FormsModule and ReactiveFormsModule here

})
export class RestaurantdashComponent implements OnInit {
  userFilter: any = { name: '' }; // For filtering restaurants
  totalLength: any; // For pagination
  page: number = 1; // Current page number
  formValue!: FormGroup; // FormGroup for the restaurant form
  restaurantModelObj: RestaurantData = new RestaurantData(); // Model object for restaurant data
  allRestaurantData: any; // Array to hold all restaurant data
  showAdd: boolean = true; // Flag to show add button
  showbtn: boolean = true; // Flag to show update button

  constructor(
    private formBuilder: FormBuilder,
    private sharedService: SharedService,
    private toast: NgToastService,
    private router:Router
  ) {}

  ngOnInit(): void {

    this.formValue = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      mobile: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
      address: ['', Validators.required],
      services: ['', Validators.required],
    });
    this.getAllData(); // Fetch all restaurant data
  }

  // Reset form and show add button
  clickAddResto() {
    debugger
    this.formValue.reset();
    this.showAdd = true;
    this.showbtn = false; // Hide update button
  }

  // Add restaurant data
  addRestaurant() {
    debugger
    this.restaurantModelObj.name = this.formValue.value.name;
    this.restaurantModelObj.email = this.formValue.value.email;
    this.restaurantModelObj.mobile = this.formValue.value.mobile;
    this.restaurantModelObj.address = this.formValue.value.address;
    this.restaurantModelObj.service = this.formValue.value.service;

    this.sharedService.PostRestaurant(this.restaurantModelObj).subscribe(
      (response) => {
        alert("Restaurant added SuccesFully");
        this.formValue.reset(); // Reset the form
        this.getAllData(); // Fetch updated restaurant data
      },
      (error) => {
        console.error('Error adding restaurant:', error);
        alert("Error adding restaurant");
      }
    );
  }

  // Fetch all restaurant data
  getAllData() {
    this.sharedService.getRestaurant().subscribe(
      (data) => {
        this.allRestaurantData = data; // Store fetched data in the component's array
        this.totalLength = this.allRestaurantData.length; // Update total length for pagination
      },
      (error) => {
        console.error('Error fetching restaurants:', error); // Handle any errors
      }
    );
  }

  deleteRestaurant(restaurant: any) {
    if (confirm('Are you sure to delete this record?')) {
        const restaurantId = restaurant.id; // Ensure the ID is valid
        if (restaurantId) {
            this.sharedService.deleteRestaurant(restaurantId).subscribe(
                (response) => {
                    alert("Restaurant deleted successfully");
                    this.getAllData(); // Fetch updated data after deletion
                },
                (error) => {
                    console.error('Error deleting restaurant:', error);
                    if (error.status === 404) {
                        alert("Restaurant not found on the server.");
                    } else {
                        alert("Error deleting restaurant.");
                    }
                }
            );
        } else {
            console.error('Invalid restaurant ID');
            alert("Unable to delete: Restaurant ID is missing.");
        }
    }
}


  // Prepare for editing a restaurant
  onEditRestaurant(restaurant: any) {
    this.showAdd = false; // Hide the add button
    this.showbtn = true; // Show the update button
    this.restaurantModelObj.id = restaurant.id; // Set the ID of the restaurant to be edited
    this.formValue.patchValue(restaurant); // Populate the form with the selected restaurant's data
  }

  // Update restaurant data
  updateRestaurant() {
    debugger
    if (this.restaurantModelObj.id) {
    this.restaurantModelObj.name = this.formValue.value.name;
    this.restaurantModelObj.email = this.formValue.value.email;
    this.restaurantModelObj.mobile = this.formValue.value.mobile;
    this.restaurantModelObj.address = this.formValue.value.address;
    this.restaurantModelObj.service = this.formValue.value.services;

    this.sharedService.UpdateRestaurant(this.restaurantModelObj, this.restaurantModelObj.id).subscribe(
      (response) => {
        alert("Restaurant update SuccesFully");
        this.formValue.reset(); // Reset the form
        this.getAllData(); // Fetch updated restaurant data
        this.showAdd = true; // Show the add button again
        this.showbtn = false; // Hide update button
      },
      (error) => {
        console.error('Error updating restaurant:', error);
        alert("error in added failure");
      }

    );
  }
}

logout() {
  localStorage.clear();  // Clear local storage
  alert("Logout Successfully");
  this.router.navigate(['/login']);  // Redirect to the login page (adjust the route as necessary)
}

}
