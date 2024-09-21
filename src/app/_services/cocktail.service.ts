import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ICocktail, IDataCockail, ISingleCocktail } from '../_interfaces/cocktail';
import { Observable } from 'rxjs';
import { IApi } from '../_interfaces/api';

@Injectable({
  providedIn: 'root'
})
export class CocktailService {

  url = 'http://localhost:5001/cocktails'

  constructor(private http: HttpClient) { }

  getAllCocktail(): Observable<IDataCockail>{
    return this.http.get<IDataCockail>(this.url)
  }

  getCocktail(cid: string | null): Observable<ISingleCocktail>{
    return this.http.get<ISingleCocktail>(this.url+'/'+cid)
  }

  addCocktail(cocktail: ICocktail): Observable<ISingleCocktail> {
    return this.http.post<ISingleCocktail>(this.url, cocktail);
  }

  updateCocktail(cocktail: ICocktail): Observable<IApi>{
    return this.http.patch<IApi>(this.url+'/'+cocktail.id, cocktail)
  }

  trashCocktail(){}

  untrashCocktail(){}

  deleteCocktail(){}
}
