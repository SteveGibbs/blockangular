import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PostListComponent} from './posts/post-list/post-list.component';
import {PostCreateComponent} from './posts/post-create/post-create.component';
import {AboutComponent} from './content/about.component';
import {PricingComponent} from './content/pricing.component';
import {AuthGuard} from './auth/auth.guard';
import {UserProfileComponent} from './user/user-profile-create/user-profile.component';
import {UserProfileListComponent} from './user/user-profile-list/user-profile-list.component';
import {UserAdminListComponent} from './user/user-admin-list/user-admin-list.component';

const routes: Routes = [
  { path: '', component: PostListComponent},
  { path: 'create', component: PostCreateComponent, canActivate: [AuthGuard]},
  { path: 'edit/:postId', component: PostCreateComponent, canActivate: [AuthGuard]},
  { path: 'auth', loadChildren: './auth/auth.module#AuthModule'},
  { path: 'plan', component: PricingComponent},
  { path: 'about', component: AboutComponent},
  { path: 'user/profile', component: UserProfileComponent},
  { path: 'edituser/:userId', component: UserProfileComponent},
  { path: 'user', component: UserProfileListComponent},
  { path: 'admin/user', component: UserAdminListComponent}
];

@NgModule({
imports: [RouterModule.forRoot(routes)],
exports: [RouterModule],
providers: [AuthGuard]
})
export class AppRoutingModule {}
