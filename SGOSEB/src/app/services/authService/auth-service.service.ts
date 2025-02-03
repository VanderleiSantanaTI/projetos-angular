import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { UtilsService } from '../utils/utils.service';
import { NavService } from '../nav/nav.service';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  private tokenCheckInterval: any;
  private jwtHelper = new JwtHelperService(); // Serviço para decodificar o JWT

  constructor(
    private utilsService: UtilsService,
    private http: HttpClient,
  private navService: NavService
) {}

  // Método para obter o token do localStorage
  getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  // Método para verificar se o token é válido
  isTokenValid(): boolean {
    const token = this.getToken();
    if (!token) {
      return false; // Token não existe
    }
    return !this.jwtHelper.isTokenExpired(token);
  }

  // Método para decodificar o token e obter o payload
  getTokenPayload(): any {
    const token = this.getToken();
    if (token) {
      return this.jwtHelper.decodeToken(token); // Retorna o payload do token
    }
    return null;
  }

  // Método para fazer logout
  logout(): void {
    localStorage.removeItem('authToken'); // Remove o token do localStorage
    this.ngOnDestroy(); // Limpa o intervalo de verificação do token
    this.navService.navigateForward('/login'); // Redireciona para a página de login


  }



    // Método para adicionar o token no cabeçalho de uma requisição HTTP
    private createAuthorizationHeader(): HttpHeaders {
      const token = this.getToken();
      let headers = new HttpHeaders();
      if (token) {
        headers = headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    }
  // Exemplo de método que faz uma requisição GET com o token no cabeçalho
  getProtectedData(): Observable<any> {
    const headers = this.createAuthorizationHeader();  // Cria os cabeçalhos com o token
    return this.http.get<any>('eb1/abrir_os/', { headers });
  }

  // Exemplo de método que faz uma requisição POST com o token no cabeçalho
  postData(data: any): Observable<any> {
    const headers = this.createAuthorizationHeader();  // Cria os cabeçalhos com o token
    return this.http.post<any>('https://api.exemplo.com/protected-data', data, { headers });
  }

  // Inicia a verificação periódica de validade do token
  startTokenValidation() {
    let tokenExpiredMessageShown = false;

    this.tokenCheckInterval = setInterval(() => {
      if (!this.isTokenValid()) {
        if (!tokenExpiredMessageShown) {
          this.logout(); // Se o token for inválido ou expirado, realiza o logout
          this.utilsService.showToast('✖ Token expirado. Faça o Login novamente!', 'error');
          tokenExpiredMessageShown = true;
        }
      } else {
        tokenExpiredMessageShown = false; // Reset the flag if the token is valid
      }
    }, 30000); // Verifica a cada 30 segundos
  }

    // Limpa o intervalo quando o serviço é destruído
    ngOnDestroy() {
      if (this.tokenCheckInterval) {
        clearInterval(this.tokenCheckInterval); // Limpa o intervalo
      }
    }
}
