import {Component, OnDestroy, OnInit} from '@angular/core';
import { User } from '../user.model';
import { UsersService} from '../user.service';
import {Subscription} from 'rxjs';
import { AuthService} from '../../auth/auth.service';
import {PageEvent} from '@angular/material';


@Component({
  templateUrl: './user-profile-list.component.html',
  styleUrls: ['./user-profile-list.component.css']
})


export class UserProfileListComponent implements OnInit, OnDestroy {
  users: User[] = [];
  totalUsers = 0;
  usersPerPage = 10;
  currentPage = 1;
  pageSizeOptions = [1, 2, 5, 10];
  userIsAuthenticated = false;
  userId: string;
  private usersSub: Subscription;
  private authStatusSub: Subscription;

constructor(public usersService: UsersService, private authService: AuthService) {}
  ngOnInit(): void {
    this.usersService.getUsers(this.usersPerPage, this.currentPage);
    this.userId = this.authService.getUserId();
    console.log('retrieved ' + this.userId);
    this.usersSub = this.usersService
      .getUserUpdateListener()
      .subscribe((userData: { users: User[], userCount: number }) => {
        this.totalUsers = userData.userCount;
        this.users = userData.users;
      });
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authStatusSub = this.authService
      .getAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated;
        this.userId = this.authService.getUserId();
      });
  }
  onChangedPage(pageData: PageEvent) {
    console.log(pageData);
    this.currentPage = pageData.pageIndex + 1;
    this.usersPerPage = pageData.pageSize;
    this.usersService.getUsers(this.usersPerPage, this.currentPage);
  }

    onDelete(userId: string) {
      this.usersService.deleteUser(userId).subscribe(() => {
        this.usersService.getUsers(this.usersPerPage, this.currentPage);
      }, () => {
        console.log('hi');
      });
  }


  ngOnDestroy(): void {
  }
}
