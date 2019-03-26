import { Injectable} from '@angular/core';
import { Subject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { User } from './user.model';
import {subscribeOn} from 'rxjs/operators';
import {environment} from '../../environments/environment';

const BACKEND_URL = environment.apiUrl + '/user/';

@Injectable({providedIn: 'root'})
export class UsersService {
  private users: User[] = [];
  private usersUpdated = new Subject<{ users: User[]; userCount: number }>();

  constructor(private http: HttpClient, private router: Router) {}

  getUsers(usersPerPage: number, currentPage: number) {
    const queryParams = `?pagesize=${usersPerPage}&page=${currentPage}`;
    this.http
      .get<{message: string; users: any; maxUsers: number }>(
        BACKEND_URL + queryParams
      )
      /*Using map functionality to convert _id from the data object "get" from mongodb into id which is being used in angular front end*/
      .pipe(map(userData => {
          return {
            users: userData.users.map(user => {
              return {
                id: user._id,
                email: user.email,
                first_name: user.first_name,
                last_name: user.last_name,
                address_line1: user.address_line1,
                address_line2: user.address_line2,
                suburb: user.suburb,
                postcode: user.postcode,
                address_state: user.address_state,
                password: user.password
              };
            }),
            maxUsers: userData.maxUsers
          };
        })
      )
      .subscribe(transformedUserData => {
        console.log(transformedUserData);
        this.users = transformedUserData.users;
        this.usersUpdated.next({
          users: [...this.users],
          userCount: transformedUserData.maxUsers
        });
      });
  }

  getUserUpdateListener() {
    return this.usersUpdated.asObservable();
  }

  getUser(id: string) {
    // return {...this.users.find(p => p.id === id)};
    return this.http.get<{
      _id: string;
      email: string;
      first_name: string;
      last_name: string;
      address_line1: string;
      address_line2: string;
      postcode: string;
      suburb: string;
      address_state: string;
      password: string;
    }>((BACKEND_URL + id));
  }
  /**
   *  Use this for usering JSON only
   * addUser(title: string, content: string) {
   *   const user: User = {id: null, title: title, content: content};
   *   this.http
   *   .user<{ message: string, userId: string }>('http:*localhost:3000/api/users', user)
   *   .subscribe(responseData => {
   *    console.log(responseData.message);
   *    const id = responseData.userId;
   *    user.id = id;
   *    this.users.push(user);
   *    this.usersUpdated.next([...this.users]);
   *    this.router.navigate(["/"]);
   *   });
   * }
   */

  addUser(email: string,
          first_name: string,
          last_name: string,
          address_line1: string,
          address_line2: string,
          postcode: string,
          suburb: string,
          address_state: string,
          password: string) {
    const userData = new FormData();
    userData.append('email', email);
    userData.append('first_name', first_name);
    userData.append('last_name', last_name);
    userData.append('address_line1', address_line1),
    userData.append('address_line2', address_line2),
    userData.append('postcode', postcode),
    userData.append('suburb', suburb),
    userData.append('address_state', address_state),
    userData.append('password', password)
    this.http
      .post<{ message: string, user: User }>(
        BACKEND_URL,
        userData
      )
      .subscribe(responseData => {
        // const user: User = {
        //   id: responseData.user.id,
        //   title: title,
        //   content: content,
        //   imagePath: responseData.user.imagePath
        // };
        // this.users.push(user);
        // this.usersUpdated.next([...this.users]);
        this.router.navigate(['/']);
      });
  }

  /**
   * the order of listing the params for update User affects the order it
   * is saved to the database
   */

  updateUser(
    id: string,
    email: string,
    first_name: string,
    last_name: string,
    address_line1: string,
    address_line2: string,
    suburb: string,
    postcode: string,
    address_state: string,
    password: string
  ) {
    let userData: User | FormData;
    // if (typeof (image) === 'object') {
    //   userData = new FormData();
    //   userData.append('id', id);
    //
    // } else {
    //   userData = {
    //     id: id
    //
    //   };
    // }
    userData = {
      id: id,
      email: email,
      first_name: first_name,
      last_name: last_name,
      address_line1: address_line1,
      address_line2: address_line2,
      postcode: postcode,
      suburb: suburb,
      address_state: address_state,
      password: password

    }
    this.http
      .put(BACKEND_URL + id, userData)
      .subscribe(response => {
        // const updatedUsers = [...this.users];
        // const oldUserIndex = updatedUsers.findIndex(p => p.id === id);
        // const user: User = {
        //   id: id,
        //   title: title,
        //   content: content,
        //   imagePath: ''
        //   // imagePath: response.imagePath
        // };
        // updatedUsers[oldUserIndex] = user;
        // this.users = updatedUsers;
        // this.usersUpdated.next([...this.users]);
        this.router.navigate(['/']);
      });
  }

  deleteUser(userId: string) {
    return this.http
      .delete(BACKEND_URL + userId);
  }
}
