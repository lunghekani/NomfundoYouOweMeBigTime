import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Stocks } from 'src/models/stocks.model';
import { StockValues } from 'src/models/stockvalues.model';

@Injectable({
  providedIn: 'root',
})
export class StockServiceService {
  constructor(private httpClient: HttpClient) {}

  getAllStocks() {
    return this.httpClient.get<Stocks[]>('assets/Stocks.json');
  }
  getAllStockValues() {
    return this.httpClient.get('assets/Stock Values.json');
  }
}

// export class GenresService {

//   constructor(private http: HttpClient) { }

//   private apiURL = environment.apiURL + '/genres'

//   getAll(): Observable<genreDTO[]>{
//     return this.http.get<genreDTO[]>(this.apiURL)
//   }

//   getById(id: number): Observable<genreDTO>{
//     return this.http.get<genreDTO>(`${this.apiURL}/${id}`) // querying the endpoint in the api
//   }

//   create(genre: genreCreationDTO){
//     return this.http.post(this.apiURL, genre); // sending an http post to the API
//   }

//   edit(id:number, genre: genreCreationDTO){ // using the genreCreationDTO to edit a genre
//     return this.http.put(`${this.apiURL}/${id}`, genre)
//   }

//   delete(id:number){
//     return this.http.delete(`${this.apiURL}/${id}`)
//   }
// }
