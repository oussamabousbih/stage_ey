import { Component } from '@angular/core';
import {CartsItemService} from "../Services/CartServices/carts-item.service";
import {Order} from "../Entity/Order";

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent {
  orders: Order[] = [];
  currentPage: number = 1;
  pageSize: number = 10;

  constructor(private orderService: CartsItemService) {}

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders(): void {
    this.orderService.getallorders().subscribe(
      data => {
        this.orders = data;
        console.log('Fetched orders:', this.orders); // Log the fetched orders

      },
      error => {
        console.error('Failed to load orders', error);
      }
    );
  }

  deleteOrder(orderId: number): void {
    this.orderService.deleteOrder(orderId).subscribe(
      () => {
        this.orders = this.orders.filter(order => order.id !== orderId);
      },
      error => {
        console.error('Error deleting order', error);
      }
    );
  }
}
