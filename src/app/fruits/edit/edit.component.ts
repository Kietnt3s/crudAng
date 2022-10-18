import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Fruits } from '../fruits';
import { FruitsService } from '../fruits.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  fruitsForm: Fruits={
    id:0,
    name:'',
    quantity:0,
    price:0,
  };

  constructor(private fruitService :FruitsService,private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((param)=>{
    var id = Number(param.get('id'));
    this,this.getById(id);

    })

  }
  getById(id:number){
    this.fruitService.getById(id).subscribe(data=>{
      this.fruitsForm= data
    })
  }

}
