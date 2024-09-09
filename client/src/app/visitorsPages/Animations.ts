import { trigger, transition, query, style, stagger, animate, keyframes, state } from "@angular/animations";

export const fadeAnimation = trigger('fade', [


        transition('* => *', [
   
            query(':enter',  [ style({ opacity: 0 }) ,
              stagger('500ms',  animate('1000ms ease-out') )
              ] ,   { optional: true } ), 
         
           query(':leave',stagger('500ms',  animate('1000ms ease-out' , style({ opacity: 0   }) ,) )
          ,   { optional: true } ), 
         
         
         
         ]),


    ]);

    export const itemStateAnimation = trigger('itemState', [

     
      transition('* => *', [
  
  
         query(':enter', [style({ opacity: 0 }), stagger('300ms', animate('1s ease-in', keyframes([
             style({opacity: 0, transform: 'translateX(-75%)', offset: 0}),
             style({opacity: .5, transform: 'translateX(35px)',  offset: 0.3}),
             style({opacity: 1, transform: 'translateX(0)',     offset: 1.0}),
           ])) )], {optional: true}),
     
           query(':leave', stagger('300ms', [
             animate('1s ease-in', keyframes([
               style({opacity: 1, transform: 'translateX(0)', offset: 0}),
               style({opacity: .5, transform: 'translateX(35px)',  offset: 0.3}),
               style({opacity: 0, transform: 'translateX(-75%)',     offset: 1.0}),
             ]))]), {optional: true})
       ])  
        
     ]);
   


 

  export const opacityAnimation = trigger('itemState', [

   
    state('void',style({opacity: 0})),
      
    transition(':enter,:leave', [ animate(2000)]),
      
   ]);