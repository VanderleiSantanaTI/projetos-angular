import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AuthServiceService } from '../authService/auth-service.service';
import { UtilsService } from '../utils/utils.service';
import { environment} from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DataService{

  private apiUrlOS_abertas = environment.production ? `${environment.apiUrl}/os_abertas/`: ''
  private apiUrllogin = environment.production ? `${environment.apiUrl}/login/`: ''
  private apiUrlCadastro_login = environment.production ? `${environment.apiUrl}/cadastro_login/`: ''
  private apiUrlFechada_os = environment.production? `${environment.apiUrl}/encerrar_os/`: ''
  private apiUrlAbrir_os = environment.production? `${environment.apiUrl}/abrir_os/`: ''
  private apiUrPecas = environment.production? `${environment.apiUrl}/pecas/`: ''
  private apiUrServicos = environment.production? `${environment.apiUrl}/servicos/`: ''
  private apiUrlValidateToken = environment.production? `${environment.apiUrl}/validate_token/`: ''
  userInfo: any;
  constructor(
    private http: HttpClient,
    private authService: AuthServiceService,
    private utilsService: UtilsService
  ) {}

  // Método para buscar os contatos
  getCadastro_login(): Observable<any[]> {
    return this.http.get<any>(this.apiUrlCadastro_login).pipe(
      map((response) => response.data), // Extrair a dados
      catchError(this.handleError)
    );
  }

  postClose_OS (osData: {
    nome_mecanico: string;
    data_da_manutencao: string;
    cadastro_login_id: number;
    abrir_os_id: number;
    }): Observable<any> {
      const payload = this.authService.getTokenPayload();
      if (payload) {
        osData.cadastro_login_id = payload.data.id;
      }
      const token = this.authService.getToken();
      if (!token) {
        return throwError('No token provided');
      }

      // console.log('Token:', token);
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      });

      return this.http.post<any>(this.apiUrlFechada_os, osData, { headers }).pipe(
        map(response => response),
        catchError(this.handleError)
      );
    }

  getFechada_os(): Observable<any[]> {
    return this.http.get<any>(this.apiUrlFechada_os).pipe(
      map((response) => response.data),
      catchError(this.handleError)
    );
  }

  getOS_abertas(): Observable<any[]> {
    return this.http.get<any>(this.apiUrlOS_abertas).pipe(
      map((response) => response.data),
      catchError(this.handleError)
    );
  }

  getAbrir_os(): Observable<any[]> {
    return this.http.get<any>(this.apiUrlAbrir_os).pipe(
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


  // Método para enviar login e senha
  postLogin(loginData: { login: string; senha: string }): Observable<{ token: string; message: string }> {
    return this.http.post<any>(this.apiUrllogin, loginData).pipe(
      map(response => ({
        token: response.data.token,   // Captura o token
        message: response.message     // Captura a mensagem
      })),
      catchError(this.handleError)
    );
  }


  // Método para validar o token
  validateToken(token: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}` // Envia o token como "Bearer Token"
    });
    return this.http.get(this.apiUrlValidateToken, { headers }).pipe(
      map((response) => response),
      catchError(this.handleError)
    );
  }


  checkTokenValidity() {
    if (!this.authService.isTokenValid()) {
      this.authService.logout();
      this.utilsService.showToast('✖ Token expirado. Faça o Login novamente!', 'error');
      return;
    }
    // Se o token for válido, obtém o payload
    const payload = this.authService.getTokenPayload();
    if (payload) {
      this.userInfo = payload.data; // Acessa os dados do usuário
      console.log('Nome:', this.userInfo.nome);
      console.log('Perfil:', this.userInfo.perfil);
      console.log('Status:', this.userInfo.status);
    }
  }

  postOpenOS(osData: {
    data: string;
    marca_da_viatura: string;
    modelo: string;
    placa_eb: string;
    su_cia_da_viatura: string;
    patrimonio: string;
    hodometro: number;
    problema_apresentado: string;
    sistema_afetado: string;
    causa_da_avaria: string;
    manutencao: string;
    usuario: string;
    perfil: string;
    cadastro_login_idabrios : number;
  }): Observable<any> {
    const payload = this.authService.getTokenPayload();
    if (payload) {
      console.log('Payload:', payload.data.id);
      osData.usuario = payload.data.nome;
      osData.perfil = payload.data.perfil;
      osData.cadastro_login_idabrios = payload.data.id;
    }
    console.log('Dados da OS222:', osData);
    const token = this.authService.getToken();
    if (!token) {
      return throwError('No token provided');
    }

    console.log('Token:', token);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    return this.http.post<any>(this.apiUrlAbrir_os, osData, { headers }).pipe(
      map(response => response),
      catchError(this.handleError)
    );
  }

  postServicos(servicoData: {
		peca_utilizada: string,
		num_ficha : number,
		qtd	 : number,
		abrir_os_id : number,
		usuario : string
  }): Observable<any> {
    const payload = this.authService.getTokenPayload();
    if (payload) {
      servicoData.usuario = payload.data.nome;
      // servicoData.cadastro_login_idabrios = payload.data.id;
    }
    // console.log('Dados da OS222:', servicoData);
    const token = this.authService.getToken();
    if (!token) {
      return throwError('No token provided');
    }

    console.log('Token:', token);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    return this.http.post<any>(this.apiUrlAbrir_os, servicoData, { headers }).pipe(
      map(response => response),
      catchError(this.handleError)
    );
  }

  // Tratamento de erro
  private handleError(error: HttpErrorResponse) {
    console.error('Erro na API:', error);
    return throwError(() => new Error('Erro ao conectar com a API.'));
  }



}
