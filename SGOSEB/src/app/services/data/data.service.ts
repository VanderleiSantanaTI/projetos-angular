import { getTestBed } from '@angular/core/testing';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class DataService{
  private apiUrl = 'api/contatos/'; // URL da API
  private apiUrlTest = 'https://jsonplaceholder.typicode.com/posts'; // URL da API

  constructor(private http: HttpClient) {}

  // Método para buscar os contatos
  getContatos(): Observable<any[]> {
    return this.http.get<any>(this.apiUrl).pipe(
      map((response) => response.data), // Extrair a chave "data" da resposta
      catchError(this.handleError)
    );
  }

  getTest(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrlTest).pipe(
      map((response) => response), // Retorna a resposta completa
      catchError(this.handleError)
    );
  }


  // Tratamento de erro
  private handleError(error: HttpErrorResponse) {
    console.error('Erro na API:', error);
    return throwError(() => new Error('Erro ao conectar com a API.'));
  }
}
