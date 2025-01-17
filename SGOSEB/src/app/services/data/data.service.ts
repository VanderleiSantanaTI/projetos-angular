import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root' // ✅ Torna o serviço acessível globalmente
})
export class DataService {
  private apiUrl = 'https://jsonplaceholder.typicode.com/posts'; // ✅ URL da API

  constructor(private http: HttpClient) {}

  // Método para buscar os dados da API
  getPosts(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
}
