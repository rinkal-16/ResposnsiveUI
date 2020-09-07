import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'; 

@Injectable({
  providedIn: 'root'
})
export class ChartService {

  constructor(private http: HttpClient) { }

  public readLaunches(): Observable<Chart> {
    return this.http.get<Chart>("https://api.spacexdata.com/v3/launches?limit=10&offset=10").map(result => result);
    
  }
  
  

}
