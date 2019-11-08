import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Person } from '../person';
import { Shopping } from '../shopping';
import { MainService } from '../main.service';

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.css']
})
export class PeopleComponent implements OnInit {

  people$: Observable<Shopping[]>;
   peopl$:any;
  constructor(private mainService: MainService) { }

  ngOnInit() {
    //this.getShoppings(JSON.parse(localStorage.getItem('user_data')));
    // console.log("user_data", JSON.parse(localStorage.getItem('user_data')));
    // const param = JSON.parse(localStorage.getItem('user_data'));
    // this.people$ = this.mainService.getPeople(param._id);

    // this.people$ = this.mainService.getPeople(JSON.parse(localStorage.getItem('user_data'))).subscribe(response => {
    //   console.log(response);
    // });
    // console.log("SHOPPINGS: ", this.people$);
    this.getShoppings();


  }

  public getShoppings() {
    // this.people$ = this.mainService.getPeople(data);
    // console.log("SHOPPINGS: ", this.people$);
    const param = JSON.parse(localStorage.getItem('user_data'));
    this.mainService.getPeople(param._id).subscribe(response => {
      this.peopl$ = response;
      console.log("people: ", this.peopl$);
    });

    // this.mainService.getPeople(JSON.parse(localStorage.getItem('user_data'))).subscribe( response =>{
    //   console.log(response);
    //   this.people$ = response;
    // })
  }

}
