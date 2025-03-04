import { Component } from '@angular/core';
import { PopularBrandsComponent } from "../home/components/popular-brands/popular-brands.component";

@Component({
  selector: 'app-brands',
  imports: [PopularBrandsComponent],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.scss'
})
export class BrandsComponent {

}
