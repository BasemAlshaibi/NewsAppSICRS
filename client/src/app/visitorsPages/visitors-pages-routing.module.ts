import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from '../core/not-found/not-found.component';
import { AboutUsComponent } from './about-us/about-us.component';
 
import { CategoryNewsComponent } from './category-news/category-news.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
 
import { HomeContientComponent } from './home-contient/home-contient.component';
import { HomeComponent } from './home.component';
import { NewsDetailsComponent } from './news-details/news-details.component';
import { RssComponent } from './Rss/rss.component';
import { SearchResultsComponent } from './search-results/search-results.component';
 

   const routes: Routes = [
    {
      path: '', 
     component: HomeComponent , // this is the component with the <router-outlet> in the template
     children: [
      {
        path: '', 
        component: HomeContientComponent,
       },
      {
        path: 'news/:id',  
        component: NewsDetailsComponent
       },
       {
         path: 'category/:id',  
         component: CategoryNewsComponent
        }
       ,
              
            {
              path: 'search',  
              component: SearchResultsComponent
            }
            ,
            {
              path: 'Contacts',  
              component: ContactUsComponent
            }
             ,
            {
              path: 'About',  
              component: AboutUsComponent
            }
            ,
            {
              path: 'Rss',  
              component: RssComponent
            }
     ]
  }
    ]

   


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VisitorsPagesRoutingModule { }
