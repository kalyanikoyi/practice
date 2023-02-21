import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ApiService } from '../api.service';
import { Details } from '../Model/details';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  detailsArray:Details[]=[]
  detailsObj = new Details()
  showDelete=true
  // showUpdate=false
  // showCancel=false
  id!:number
 ename=''
 age!:number
 gender=''
 salary!:number
 location=''
  constructor(private api:ApiService){

  }
ngOnInit(): void {

  this.getDetails()
  this.detailsArray=[]
  this.detailsObj = new Details()
  
}
  getDetails(){
    this.api.getData().subscribe((data)=>{
      this.detailsArray=data
    },err=>{
     alert('Failed to fetch details')
    })
  }
  onsubmit(detailsForm:NgForm){
    console.log(detailsForm.value);
    this.detailsObj=detailsForm.value
    this.postDetails()
  }
  postDetails(){
    let newDetails={
      'id':this.id,
      'ename':this.ename,
      'age':this.age,
      'gender':this.gender,
      'salary':this.salary,
      'location':this.location,
      'isEdit':false
    }
this.api.postData(newDetails).subscribe((data)=>{  
  this.ngOnInit()
},err=>{
  alert('falied to upload')
})
  }

  editData(item:Details){
    this.showDelete=false
    this.detailsArray.forEach((element)=>{
      element.isEdit=false
    })
    item.isEdit=true;
  }
  
  updateDetails(info:Details){
    this.showDelete=true
    let updatedDetails ={
      'id':info.id,
      'ename':info.ename,
      'age':info.age,
      'gender':info.gender,
      'salary':info.salary,
      'location':info.location,
      'isEdit':false
    }
this.api.putData(updatedDetails).subscribe((data)=>{
  info.isEdit=false
  
})
  }
  deleteDetails(det:Details){
this.api.deleteData(det).subscribe((data)=>{
  confirm('Are you sure')
  this.ngOnInit()
},err=>{
  alert('Failed to delete')
})

  }

  cancelButton(info:Details){
    info.isEdit=false
    this.showDelete=true
  }
 
}
