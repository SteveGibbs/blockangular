import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {mimeType} from '../../posts/post-create/mime-type.validator';
import { User } from '../user.model';
import {Subscription} from 'rxjs';
import {UsersService} from '../user.service';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {AuthService} from '../../auth/auth.service';

@Component({
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})

export class UserProfileComponent implements OnInit, OnDestroy {

  form: FormGroup;
  user: User;
  private mode = 'create';
  private userId: string;
  private authStatusSub: Subscription;
  constructor(public usersService: UsersService,
              public route: ActivatedRoute,
              private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl(null, {validators: [Validators.required, Validators.minLength(3)]}),
      first_name: new FormControl(null, {validators: [Validators.required, Validators.minLength(3)]}),
      last_name: new FormControl(null, {validators: [Validators.required, Validators.minLength(3)]}),
      address_line1: new FormControl(null, {validators: [Validators.required, Validators.minLength(3)]}),
      address_line2: new FormControl(null, {validators: [Validators.required, Validators.minLength(3)]}),
      suburb: new FormControl(null, {validators: [Validators.required, Validators.minLength(3)]}),
      address_state: new FormControl(null, {validators: [Validators.required, Validators.minLength(3)]}),
      postcode: new FormControl(null, {validators: [Validators.required, Validators.minLength(3)]}),
      password: new FormControl()
      });
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('userId')) {
        this.mode = 'edit';
        this.userId = paramMap.get('userId');
        this.usersService.getUser(this.userId).subscribe(userData => {
          this.user = {
            id: userData._id,
            email: userData.email,
            password: userData.password,
            first_name: userData.first_name,
            last_name: userData.last_name,
            address_line1: userData.address_line1,
            address_line2: userData.address_line2,
            suburb: userData.suburb,
            postcode: userData.postcode,
            address_state: userData.address_state
          };
          this.form.setValue({
            email: this.user.email,
            password: this.user.password,
            first_name: this.user.first_name,
            last_name: this.user.last_name,
            address_line1: this.user.address_line1,
            address_line2: this.user.address_line2,
            suburb: this.user.suburb,
            postcode: this.user.postcode,
            address_state: this.user.address_state
          });
        });
      } else {
        this.mode = 'create';
        this.userId = null;
      }
    });
  }

    onSaveProfile() {
      // this.newPost = this.enteredValue;

      if (this.form.invalid) {
        return;
      }
      if (this.mode === 'create') {
        this.usersService.addUser(
          this.form.value.email,
          this.form.value.first_name,
          this.form.value.last_name,
          this.form.value.address_line1,
          this.form.value.address_line2,
          this.form.value.suburb,
          this.form.value.postcode,
          this.form.value.address_state,
          this.form.value.password
        );
      } else {
        this.usersService.updateUser(
          this.userId,
          this.form.value.email,
          this.form.value.first_name,
          this.form.value.last_name,
          this.form.value.address_line1,
          this.form.value.address_line2,
          this.form.value.suburb,
          this.form.value.postcode,
          this.form.value.address_state,
          this.form.value.password
        );
      }

      this.form.reset();

    }

  ngOnDestroy(): void {
    }
  }
