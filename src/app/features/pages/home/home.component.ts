import { Component } from '@angular/core';
import { RecentProductsComponent } from "./components/recent-products/recent-products.component";
import { PopularCategoriesComponent } from "./components/popular-categories/popular-categories.component";
import { PopularBrandsComponent } from "./components/popular-brands/popular-brands.component";
import { MainSliderComponent } from "./components/main-slider/main-slider.component";

@Component({
  selector: 'app-home',
  imports: [RecentProductsComponent, PopularCategoriesComponent, PopularBrandsComponent, MainSliderComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
