import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Details } from './Model/details';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  baseUrl=''
  constructor(private http :HttpClient) { 
    this.baseUrl='http://localhost:3000/details'
  }
  getData():Observable<Details[]>{
  return this.http.get<Details[]>(this.baseUrl)
  }
  postData(data:Details){
    return this.http.post(this.baseUrl,data)
  }
  putData(data:Details){
   return this.http.put(this.baseUrl+'/'+data.id,data)
  }
  deleteData(data:Details){
    return this.http.delete(this.baseUrl+'/'+data.id)
  }
}
