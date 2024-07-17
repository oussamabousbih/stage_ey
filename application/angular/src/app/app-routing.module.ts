import {computed, NgModule} from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {UsersComponent} from "./users/users.component";
import {RolesComponent} from "./roles/roles.component";
import {LoginComponent} from "./login/login.component";
import {SignUpComponent} from "./sign-up/sign-up.component";
import {BackTemplateComponent} from "./backoffice/back-template/back-template.component";
import {UpdateUsersComponent} from "./update-users/update-users.component";
import {ChangePassRequestComponent} from "./change-pass-request/change-pass-request.component";
import {FrontTemplateComponent} from "./FrontClient/front-template/front-template.component";
import {ProfileComponent} from "./profile/profile.component";
import {CoursesFrontComponent} from "./courses-front/courses-front.component";
import {HomeComponent} from "./FrontClient/home/home.component";
import {ProfileFrontComponent} from "./profile-front/profile-front.component";
import {ProfileSettingComponent} from "./profile-setting/profile-setting.component";

import {ProductbackComponent} from "./productback/productback.component";
import {CategoriebackComponent} from "./categorieback/categorieback.component";
import {ProductComponent} from "./product/product.component";
import {CategoryComponent} from "./category/category.component";
import {AddproductBackComponent} from "./addproduct-back/addproduct-back.component";
import {AddcategorybackComponent} from "./addcategoryback/addcategoryback.component";
import {UpateCategoryComponent} from "./upate-category/upate-category.component";
import {UpdateProductComponent} from "./update-product/update-product.component";
import {UploadPhotoProduitComponent} from "./upload-photo-produit/upload-photo-produit.component";

const routes: Routes = [
  {
    path: '',
    redirectTo: 'frontClient',
    pathMatch: 'full'
  },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignUpComponent },

  //
  { path: 'changepass', component: ChangePassRequestComponent },
  { path: 'coursesFront', component: CoursesFrontComponent },
  { path: 'home', component: HomeComponent },


  //

  {
    path: 'frontClient',
    component: FrontTemplateComponent,
    children: [
      { path: 'login', component: LoginComponent }, // Login within FrontClient layout
      { path: 'signup', component: SignUpComponent }, // Signup within FrontClient layout
      { path: 'changepass', component: ChangePassRequestComponent },
      { path: 'coursesFront', component: CoursesFrontComponent }, // Changeass within FrontClient layout
      { path: 'home', component: HomeComponent },
      { path: 'profileFront', component: ProfileFrontComponent },
      {path: 'profileSetting',component: ProfileSettingComponent},
      {path:'product',component: ProductComponent},
      {path: 'category',component: CategoryComponent},



      //


      { path: '', redirectTo: 'home', pathMatch: 'full' } // Default child route

    ]
  },
  {
    path: 'backtemplate',
    component: BackTemplateComponent,
    children: [
      { path: 'users', component: UsersComponent },
      { path: 'updateuser', component: UpdateUsersComponent },
      { path: 'roles', component: RolesComponent },
      { path: 'front', component: FrontTemplateComponent },
      { path: 'profile', component: ProfileComponent },
      {path: 'produitback',component: ProductbackComponent},
      {path:'category',component: CategoriebackComponent},
      {path: 'addproduct',component: AddproductBackComponent},
      {path: 'addcategory',component: AddcategorybackComponent},
      {path:'updatecategory',component: UpateCategoryComponent},
      {path: 'updateproduct',component: UpdateProductComponent},
      {path:'upload',component: UploadPhotoProduitComponent},




      { path: '', redirectTo: '', pathMatch: 'full' } // Default child route
    ]
  }
];




@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
