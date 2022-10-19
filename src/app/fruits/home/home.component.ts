import { Component, OnInit } from '@angular/core';
import { Fruits } from '../fruits';
import { FruitsService } from '../fruits.service';
declare var window : any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  allFruits:Fruits[]=[];
  constructor(private fruitService :FruitsService) { }
  deleteModal:any;
  idTodelete:number=0;


  ngOnInit(): void {
    this.deleteModal= new window.bootstrap.Modal(document.getElementById("deleteModal"))
    
    this.get();
  }
  get(){
    this.fruitService.get().subscribe((data)=>{
      this.allFruits=data;
    })
  }
  openDeleteModal(id : number){
    this.idTodelete= id;
    this.deleteModal.show();

  }
  delete(){
    this.fruitService.delete(this.idTodelete).subscribe((data)=>{
      this.allFruits=this.allFruits.filter(_=>_.id!==this.idTodelete);
      this.deleteModal.hide();
    })
  }
  close(){
    this.deleteModal.hide();
  }
}
