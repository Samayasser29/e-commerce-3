import { OwlOptions } from './../../../../../../../node_modules/ngx-owl-carousel-o/lib/models/owl-options.model.d';
import { Category } from '../../../../../shared/interfaces/category';
import { CategoriesService } from './../../../../../shared/services/category/categories.service';
import { Component, inject, OnInit } from '@angular/core';
import {  CarouselModule } from 'ngx-owl-carousel-o';
@Component({
  selector: 'app-popular-categories',
  imports:[CarouselModule],
  templateUrl: './popular-categories.component.html',
  styleUrl: './popular-categories.component.scss'
})
export class PopularCategoriesComponent implements OnInit {
 _categoriesService=inject(CategoriesService);
 categories!: Category[] ;
 isLoading:boolean = true

 CustomOptions: OwlOptions = {
  loop: true,
  mouseDrag: false,
  touchDrag: false,
  pullDrag: false,
  dots: false,
  navSpeed: 700,
  navText: ['', ''],
  responsive: {
    0: {
      items: 1
    },
    400: {
      items: 3
    },
    740: {
      items: 4
    },
    940: {
      items: 7
    }
  },
  nav: true
};


ngOnInit(): void {
  this.getCategory();
}
 
 getCategory(){
  this._categoriesService.getAllCategory().subscribe({
    next : (res)=> {
      this.isLoading=false
      console.log(res)
      console.log(res.data)
      this.categories =res.data ;

    },
    error : (err)=> {
      console.log(err)
    },
    complete(){
      console.log("done")

    }
  })
 }

}
