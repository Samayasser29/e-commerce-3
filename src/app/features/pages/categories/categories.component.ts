import { Component } from '@angular/core';
import { PopularCategoriesComponent } from "../home/components/popular-categories/popular-categories.component";

@Component({
  selector: 'app-categories',
  imports: [PopularCategoriesComponent,],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent {

}
