import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class DataService{
  private apiUrl = 'api/contatos/'; // URL da API

  constructor(private http: HttpClient) {}

  // Método para buscar os contatos
  getContatos(): Observable<any[]> {
    return this.http.get<any>(this.apiUrl).pipe(
      map((response) => response.data), // Extrair a chave "data" da resposta
      catchError(this.handleError)
    );
  }

  // Tratamento de erro
  private handleError(error: HttpErrorResponse) {
    console.error('Erro na API:', error);
    return throwError(() => new Error('Erro ao conectar com a API.'));
  }
}
