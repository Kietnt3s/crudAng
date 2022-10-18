import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Fruits } from '../fruits';
import { FruitsService } from '../fruits.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  fruitsForm: Fruits={
    id:0,
    name:'',
    quantity:0,
    price:0,
  };
  constructor(private fruitService :FruitsService,private route: Router) { }

  ngOnInit(): void {
  }
  Create(){
    this.fruitService.create(this.fruitsForm).subscribe({
      next:(fruitsForm)=>{
        this.route.navigate(["/fruits/home"])

      },
      error:(error)=>{
        console.log(error);
      }
    })
  }

}
