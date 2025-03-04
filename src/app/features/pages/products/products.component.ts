import { Component } from '@angular/core';
import { RecentProductsComponent } from "../home/components/recent-products/recent-products.component";

@Component({
  selector: 'app-products',
  imports: [RecentProductsComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent {

}
