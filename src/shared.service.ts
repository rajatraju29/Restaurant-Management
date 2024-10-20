import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor(private _http:HttpClient) { }
  getRestaurant(): Observable<any[]> {
    return this._http.get<any[]>("http://localhost:3000/posts").pipe(
      map((res: any) => {
        return res; // Assuming res is already in the desired format, you can transform it if needed
      })
    );
  }


  PostRestaurant(data:any){
    return this._http.post<any>("http://localhost:3000/posts",data).pipe(
      map((res:any)=>{
        return res;
      })
    )
  }
  UpdateRestaurant(data:any,id:number){
    return this._http.put<any>("http://localhost:3000/posts/"+id,data).pipe(
      map((res:any)=>{
return res;
      })
    )
  }
  deleteRestaurant(id:number){
    return this._http.delete<any>("http://localhost:3000/posts/"+id).pipe(
      map((res)=>{
        return res;
      })
    )
  }

}
