import {Component, OnInit} from '@angular/core';
import {ProduitCatServicesService} from "../Services/Produit-Category_Services/produit-cat-services.service";
import {Category} from "../Entity/Category";
import {ActivatedRoute, Router, Routes} from "@angular/router";

@Component({
  selector: 'app-categorieback',
  templateUrl: './categorieback.component.html',
  styleUrls: ['./categorieback.component.css']
})
export class CategoriebackComponent implements OnInit{

category:Category[]=[]
  searchedCategory: any;
  constructor(private service:ProduitCatServicesService,private route:Router) {


  }

  ngOnInit(): void {
  this.service.getAllCategories().subscribe(cat=>{
    this.category=cat
  })

  }

  deleteCategory(id: number) {
    this.service.deleteCategory(id).subscribe(()=>{
      this.service.getAllCategories().subscribe(cat=>{
        this.category=cat
      })
    })
  }

  searchCategories(searchedCategory: any) {

  }

  navigateToAddCategory() {
    this.route.navigateByUrl("/backtemplate/addcategory")
  }
}
