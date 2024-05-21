import { Component, Injector, OnInit, inject } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, FormsModule, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRippleModule } from '@angular/material/core';
import { MatSelectModule} from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { DataService } from '../services/data.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { CorsInterceptor } from '../cors.interceptor';



@Component({
  standalone: true,
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  imports: [ReactiveFormsModule, FormsModule, CommonModule, MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatRippleModule,
    MatSelectModule,
    MatIconModule,

  ],
  providers: [DataService, { provide: HTTP_INTERCEPTORS, useClass: CorsInterceptor, multi: true }]
})
export class UserComponent implements OnInit {

  userForm: FormGroup;
  countries: any[] = [];
  states: any[] = [];
  cities: any[] = [];

  countrySelected!: string;
  countrySelected2: string[] = [];
  stateSelected!: string;
  selectedState!: string


  countrySelected1: string[] = [];
  stateSelected1: string[] = [];


  constructor(private fb: FormBuilder, private dataService: DataService) {
    this.userForm = this.fb.group({
      users: this.fb.array([this.createUser()])
    });
  }

  ngOnInit(): void {
    this.dataService.getCountries().subscribe((countries: any) => {
      this.countries = countries;
      console.log(this.countries);
    });
  }

  createUser(): FormGroup {
    return this.fb.group({
      userName: [''],
      city: [''],
      country: [''],
      region: [''],
      addresses: this.fb.array([])
    });
  }

  

  addUser(): void {
    const users = this.userForm.get('users') as FormArray;
    
    users.push(this.createUser());
  
  // const lastUserIndex = users.length - 1;

  
  // const lastUserFormGroup = users.at(lastUserIndex) as FormGroup;

  // debugger;
  // lastUserFormGroup.get('country')?.setValue('');
  // lastUserFormGroup.get('region')?.setValue('');
  // lastUserFormGroup.get('city')?.setValue('');

  // lastUserFormGroup.reset({
  //   country: '',
  //   region: '',
  //   city: ''
  // });
  }


  userStates: any[] = [];
  userCities: any[] = [];

  selCountry!: string;

  onCountryChange(event: any): void {
    debugger;
    console.log(this.userForm.getRawValue());
    const selectedCountry = event.target.value;
    this.selCountry = event.target.value;
    this.dataService.getStates(selectedCountry).subscribe((states: any) => {
      this.states = states;
    });
  }

  onStateChange(event: any): void {
    const selectedState = event.target.value;
    this.dataService.getCities(this.selCountry, selectedState).subscribe((cities: any) => {
      this.cities = cities;
    });
  }

  // onCountrySelected(countryIso: any){
  //   debugger;
  //   this.dataService.getStateOfSelectedCountry(countryIso.value).subscribe(data=>{
  //     this.states = data;
  //     console.log('States Retrieved', this.states);
  //   })
  // }
  onCountrySelected(countryIso: any, index: number) {
    debugger;
    this.dataService.getStateOfSelectedCountry(countryIso.value).subscribe(data => {
      this.userStates[index] = data; 
      console.log('States Retrieved for user group', index, ':', this.userStates[index]);
    });
  }
  

  onStateSelected(countryIso: string, stateIso: string, index: number) {
    debugger;
    if (countryIso && stateIso) {
      this.dataService.getCitiesOfSelectedState(countryIso, stateIso).subscribe((cities: any) => {
        this.userCities[index] = cities;
        console.log('Cities retrieved', this.cities);
      });
    }
  }

  get userGroups(): FormArray {
    return this.userForm.get('users') as FormArray;
  }

  

  getAddresses(userIndex: number): FormArray {
    const userGroup = this.userGroups.controls[userIndex] as FormGroup;
    return userGroup.get('addresses') as FormArray;
  }


  addAddress(userIndex: number): void {
    const userGroup = this.userGroups.controls[userIndex] as FormGroup;
    const addresses = userGroup.get('addresses') as FormArray;
    addresses.push(this.fb.control(''));
  }

  removeAddress(userIndex: number, addressIndex: number): void {
    const userGroup = this.userGroups.controls[userIndex] as FormGroup;
    const addresses = userGroup.get('addresses') as FormArray;
    addresses.removeAt(addressIndex);
  }

  submitForm() {
    console.log(this.userForm.value);
  }

  onSubmit() {
    console.log(this.userForm.value);
  }

  getAddressControls(index: number): FormArray {
    return (this.userGroups.controls[index].get('addresses') as FormArray);
  }

  
  
  
  
  
}


  


