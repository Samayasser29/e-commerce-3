import { Component, inject, OnInit } from '@angular/core';
import { BrandsService } from '../../../../../shared/services/brand/brands.service';
import { Brand } from '../../../../../shared/interfaces/brand';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-popular-brands',
  imports: [CarouselModule],
  templateUrl: './popular-brands.component.html',
  styleUrl: './popular-brands.component.scss'
})
export class PopularBrandsComponent implements OnInit {

  _brandsService=inject(BrandsService)
  Brands!:Brand[]
  isLoading:boolean =true


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
    this._brandsService.getAllBrands().subscribe({
      next : (res)=> {
        this.isLoading=false

        console.log(res)
        console.log(res.data)
        this.Brands=res.data;
        
  
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
  

