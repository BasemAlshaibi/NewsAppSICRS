import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ICategory } from 'src/app/shared/models/icategory';
import { VisitorsPagesService } from '../visitors-pages.service';

@Component({
  selector: 'app-nav-bar-categories',
  templateUrl: './nav-bar-categories.component.html',
  styleUrls: ['./nav-bar-categories.component.scss']
})
export class NavBarCategoriesComponent implements OnInit {

  CategoriesList: Partial<ICategory>[];

  constructor(public visitorsPagesService: VisitorsPagesService,public router: Router) { }

 
 

  ngOnInit(): void {
    this.getCategoriesList();

  }
  getCategoriesList(){
    this.visitorsPagesService.getCategoriesForNavBar().subscribe(response => {

      this.CategoriesList = response;
   
  
  
    }, error => {
      console.log(error);
    })

     }


  
  mediaBtn(){

    var mainList = document.getElementById("mainList"),
    mediaButton = document.getElementById("mediaButton");
       
    mainList.classList.toggle("show_list");
    mediaButton.classList.toggle("active");

    
 
  }

  searchBtn(){

    var searchForm = document.getElementById("searchForm");        
    searchForm.classList.toggle("show_Search");


    const searchBtn = document.querySelector(".search-icon");
    const cancelBtn = document.querySelector(".cancel-icon");

    searchBtn.classList.add("hide");
    cancelBtn.classList.add("show");

 
  }

  cancelBtn(){

    const searchBtn = document.querySelector(".search-icon");
    const cancelBtn = document.querySelector(".cancel-icon");

    searchBtn.classList.remove("hide");
    cancelBtn.classList.remove("show");

    var searchForm = document.getElementById("searchForm");        
    searchForm.classList.toggle("show_Search");

 
    
  }
 
  searchFun(searchTerm:string) {
   // console.log(searchTerm);

   if (searchTerm != "" && searchTerm.length < 20){
    this.router.navigate(['/search'], { queryParams: { q: searchTerm } }); 
     
    const searchBtn = document.querySelector(".search-icon");
    const cancelBtn = document.querySelector(".cancel-icon");

    searchBtn.classList.remove("hide");
    cancelBtn.classList.remove("show");

    var searchForm = document.getElementById("searchForm");        
    searchForm.classList.toggle("show_Search");
   }
  
  }

  goToCategory(id){

 

    this.router.navigate(['category/', id]);
    this.mediaBtn();

  }

  goToHome(){

 

    this.router.navigate(['./']);
    this.mediaBtn();

  }


}
