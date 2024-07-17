import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Product} from "../../Entity/Product";
import {Observable} from "rxjs";
import {Category} from "../../Entity/Category";
import {DomSanitizer} from "@angular/platform-browser";
import {ImageModel} from "../../Entity/ImageModel";

@Injectable({
  providedIn: 'root'
})
export class ProduitCatServicesService {

  constructor(private http: HttpClient,private sanitizier:DomSanitizer) { }
product!:Product

  private apiUrl = environment.apiUrl;

  // Add product and upload image

  addProduct(product: Product,idcat : number): Observable<Product> {
    return this.http.post<Product>(`${this.apiUrl}/product/add/`+idcat, product);
  }

  // Get product by ID
  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/product/${id}`);
  }

  // Get all products
 getAllProducts(): Observable<any>  {
    return this.http.get(`${this.apiUrl}/product`);
  }

  getAllProduct(page: number, itemsPerPage: number) {
    const params = {
      page: page.toString(),
      size: itemsPerPage.toString()
    };
    return this.http.get<{ products: any[], totalPages: number }>(`${this.apiUrl}/product`, { params });
  }

  // Delete a product by ID
  deleteProduct(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/product/delete/${id}`);
  }

  // Get products by category ID
  getProductsByCategoryId(categoryId: number): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/product/category/${categoryId}`);
  }

  // Update a product
  updateProduct(id: number, product: Product): Observable<Product> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put<Product>(`${this.apiUrl}/update/${id}`, product, { headers });
  }

  // Add a category
  addCategory(category: Category): Observable<Category> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<Category>(`${this.apiUrl}/category/add`, category, { headers });
  }

  // Get category by ID
  getCategoryById(id: number): Observable<Category> {
    return this.http.get<Category>(`${this.apiUrl}/category/${id}`);
  }

  // Get all categories
  getAllCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.apiUrl}/category`);
  }

  // Delete a category by ID
  deleteCategory(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/category/delete/${id}`);
  }

  // Update a category
  updateCategory(id: number, category: Category): Observable<Category> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put<Category>(`${this.apiUrl}/category/update/${id}`, category, { headers });
  }

  uploadimage(uploadImageData:any,id:number) {
    return this.http.post(`${this.apiUrl}/upload-imagep/` + id, uploadImageData)
      .subscribe(
        (response: any) => {
          if (response.status === 200) {

            console.log('Image uploaded successfully') ;

          } else {
            console.log('Image  not uploaded successfully !!!!! ') ;
          }


        })
  }


  getimage(imagename:any): Observable<any>{
    return this.http.get(`${this.apiUrl}/getimagep/`+ imagename, { responseType: 'blob' })
  }

/*public createimages(product:Product){
    const productImage:any=product.image
  const productimagetofilehandle:any=File
    const blob = this.dataURItoBlob(productImage.picBytes, productImage.type);

    const imagefile= new File([blob],productImage.name,{type : productImage.type})
  const finalFileHandle = {
    file: imagefile,
    url: this.sanitizier.bypassSecurityTrustUrl(window.URL.createObjectURL(imagefile)) // Assuming sanitizer is properly imported
  };
  productimagetofilehandle.push(blob);

  }*/
  public createimages(product: Product) {
    const productImage: ImageModel | null = product.image;
    const productimagetofilehandle:any=File
    if (!productImage) {
      console.error('Product image is null or undefined.');
      return; // Handle or return early if product image is not available
    }

    const blob = this.dataURItoBlob(productImage.picByte, productImage.type);

    const imageFile = new File([blob], productImage.name, { type: productImage.type });

    const finalFileHandle = {
      file: imageFile,
      url: this.sanitizier.bypassSecurityTrustUrl(window.URL.createObjectURL(imageFile)) // Assuming sanitizer is properly imported
    };

    // Do something with finalFileHandle or return it
  }

  public dataURItoBlob(picBytes: any, imageType: any): Blob {
  const byteString = window.atob(picBytes);
  const arrayBuffer = new ArrayBuffer(byteString.length);
  const int8Array = new Uint8Array(arrayBuffer);

  for (let i = 0; i < byteString.length; i++) {
    int8Array[i] = byteString.charCodeAt(i);
  }

  const blob = new Blob([int8Array], { type: imageType });
  return blob;
}



}
