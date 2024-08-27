import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ModuleListComponent } from './module-list/module-list.component';
import { CreateModuleComponent } from './create-module/create-module.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { UpdateModuleComponent } from './update-module/update-module.component';
import { CourseListComponent } from './course-list/course-list.component';
import { CreateCourseComponent } from './create-course/create-course.component';
import { SidebarComponent } from './backoffice/sidebar/sidebar.component';
import { HomeComponent } from './backoffice/home/home.component';
import { UsersComponent } from './users/users.component';
import { RolesComponent } from './roles/roles.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { BackTemplateComponent } from './backoffice/back-template/back-template.component';
import { LoginComponent } from './login/login.component';
import { UpdateUsersComponent } from './update-users/update-users.component';
import { ChangePassRequestComponent } from './change-pass-request/change-pass-request.component';
import { FrontTemplateComponent } from './FrontClient/front-template/front-template.component';
import { ProfileComponent } from './profile/profile.component';
import { MainComponentComponent } from './main-component/main-component.component';
import { NgxCaptchaModule } from "ngx-captcha";
import {NgxPaginationModule} from "ngx-pagination";
import { CoursesFrontComponent } from './courses-front/courses-front.component';
import { HeaderComponent } from './frontclient/header/header.component';
import { FooterComponent } from './frontclient/footer/footer.component';
import { TrashcomponentComponent } from './frontclient/trashcomponent/trashcomponent.component';
import { ProfileFrontComponent } from './profile-front/profile-front.component';
import { ProfileSettingComponent } from './profile-setting/profile-setting.component';

import {PaginationComponent} from "./pagination/pagination.component";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatDialogModule } from '@angular/material/dialog';
import { NgChartsModule } from 'ng2-charts';
import {GoogleMapsModule} from "@angular/google-maps";
import {MatNativeDateModule, MatOptionModule} from "@angular/material/core";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatSelectModule} from "@angular/material/select";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {SharedModule} from "./shared/shared.module";
import { ProductComponent } from './product/product.component';
import { ProductbackComponent } from './productback/productback.component';
import { CategoriebackComponent } from './categorieback/categorieback.component';
import { CategoryComponent } from './category/category.component';
import { AddcategorybackComponent } from './addcategoryback/addcategoryback.component';
import { UpateCategoryComponent } from './upate-category/upate-category.component';
import { AddproductBackComponent } from './addproduct-back/addproduct-back.component';
import { UpdateProductComponent } from './update-product/update-product.component';
import { UploadPhotoProduitComponent } from './upload-photo-produit/upload-photo-produit.component';
import {MatPaginatorModule} from '@angular/material/paginator';
import { CartsComponent } from './carts/carts.component';
import { OrdersComponent } from './orders/orders.component';


@NgModule({
  declarations: [
    AppComponent,
    ModuleListComponent,
    CreateModuleComponent,
    UpdateModuleComponent,
    CourseListComponent,
    CreateCourseComponent,
    SidebarComponent,
    HomeComponent,
    UsersComponent,
    RolesComponent,
    SignUpComponent,
    BackTemplateComponent,
    LoginComponent,
    UpdateUsersComponent,
    ChangePassRequestComponent,
    FrontTemplateComponent,
    ProfileComponent,
    MainComponentComponent,
    CoursesFrontComponent,
    HeaderComponent,
    FooterComponent,
    TrashcomponentComponent,
    ProfileFrontComponent,
    ProfileSettingComponent,
    PaginationComponent,

    ProductComponent,
     ProductbackComponent,
     CategoriebackComponent,
     CategoryComponent,
     AddcategorybackComponent,
     UpateCategoryComponent,
     AddproductBackComponent,
     UpdateProductComponent,
     UploadPhotoProduitComponent,
     CartsComponent,
     OrdersComponent,


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgxCaptchaModule,
    NgxPaginationModule,
    ReactiveFormsModule,
    NgbModule,
    MatDialogModule,
    NgChartsModule,
    GoogleMapsModule,
    MatFormFieldModule, MatInputModule, MatDatepickerModule
    , MatNativeDateModule, MatSelectModule,
    MatOptionModule,
    MatDatepickerModule, BrowserAnimationsModule,
    SharedModule,
    MatPaginatorModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
