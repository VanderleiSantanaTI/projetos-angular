import { getTestBed } from '@angular/core/testing';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class DataService{
  private apiUrlCadastro_login = 'api/cadastro_login/'; // URL da API
  private apiUrlFechada_os = 'api/encerrar_os/'; // URL da API
  private apiUrlAberta_os = 'api/abrir_os/'; // URL da API
  private apiUrPecas = 'api/pecas/'; // URL da API
  private apiUrServicos = 'api/servicos/'; // URL da API

  constructor(private http: HttpClient) {}

  // Método para buscar os contatos
  getCadastro_login(): Observable<any[]> {
    return this.http.get<any>(this.apiUrlCadastro_login).pipe(
      map((response) => response.data), // Extrair a dados
      catchError(this.handleError)
    );
  }

  getFechada_os(): Observable<any[]> {
    return this.http.get<any>(this.apiUrlFechada_os).pipe(
      map((response) => response.data),
      catchError(this.handleError)
    );
  }

  getAberta_os(): Observable<any[]> {
    return this.http.get<any>(this.apiUrlAberta_os).pipe(
      map((response) => response.data),
      catchError(this.handleError)
    );
  }

  getPecas(): Observable<any[]> {
    return this.http.get<any>(this.apiUrPecas).pipe(
      map((response) => response.data),
      catchError(this.handleError)
    );
  }

  getServicos(): Observable<any[]> {
    return this.http.get<any>(this.apiUrServicos).pipe(
      map((response) => response.data),
      
      catchError(this.handleError)
    );
  }



  // Tratamento de erro
  private handleError(error: HttpErrorResponse) {
    console.error('Erro na API:', error);
    return throwError(() => new Error('Erro ao conectar com a API.'));
  }
}
