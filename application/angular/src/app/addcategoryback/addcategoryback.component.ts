import {Component, OnInit} from '@angular/core';
import {Category} from "../Entity/Category";
import {ProduitCatServicesService} from "../Services/Produit-Category_Services/produit-cat-services.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-addcategoryback',
  templateUrl: './addcategoryback.component.html',
  styleUrls: ['./addcategoryback.component.css']
})
export class AddcategorybackComponent implements OnInit {

  category: Category[] = []
  categ: Category = new Category()

  successMessage: string = '';

  constructor(private service: ProduitCatServicesService, private route: Router) {


  }

  ngOnInit(): void {
    this.service.getAllCategories().subscribe(cat => {
      this.category = cat
    })
  }

  addcategory() {
this.service.addCategory(this.categ).subscribe(
  response => {
    console.log('Product added successfully:', response);
    this.successMessage = 'Product added successfully!';
    // Optionally reset form after successful submission
  },
  error => {
    console.error('Error adding product:', error);
    // Handle error cases here
  }


)
  }


  navigate(){
    this.route.navigateByUrl("/backtemplate/category")
  }
}
