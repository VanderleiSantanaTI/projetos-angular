import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, firstValueFrom, Observable, throwError } from 'rxjs';
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

  private osAbertaSubject = new BehaviorSubject<any[]>([]);
  public osAberta$ = this.osAbertaSubject.asObservable();

  constructor(
    private http: HttpClient,
    private authService: AuthServiceService,
    private utilsService: UtilsService
  ) {}

  // Método para obter os dados de OS abertas
  async getCadastro_login(): Promise<any[]> {
    const token = this.authService.getToken();
    if (!token) {
      return [];
    }
    const headers = new HttpHeaders()
    .set('Authorization', 'Bearer ' + token)
    try {
      // const response = await firstValueFrom(this.http.get<any>(this.apiUrlCadastro_login, { headers }));
      const response = await firstValueFrom(this.http.get<any>(this.apiUrlCadastro_login));
      return response.data;
    } catch (error) {
      this.handleError(error as HttpErrorResponse);
      return [];
    }
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


      return throwError(() => new Error('No token provided'));

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

  // getFechada_os(): Observable<any[]> {
  //   return this.http.get<any>(this.apiUrlFechada_os).pipe(
  //     map((response) => response.data),
  //     catchError(this.handleError)
  //   );
  // }

  async getFechada_os(): Promise<any[]> {
    const token = this.authService.getToken();
    if (!token) {
      return [];
    }
    const headers = new HttpHeaders()
    .set('Authorization', 'Bearer ' + token)
    try {
      // const response = await firstValueFrom(this.http.get<any>(this.apiUrlFechada_os, { headers }));
      const response = await firstValueFrom(this.http.get<any>(this.apiUrlFechada_os));
      return response.data;
    } catch (error) {
      this.handleError(error as HttpErrorResponse);
      return [];
    }
  }

   async getOs_abertas(): Promise<any[]> {
    const token = this.authService.getToken();
    if (!token) {
      return [];
    }
    const headers = new HttpHeaders()
    .set('Authorization', 'Bearer ' + token)
    // .set('Content-Type', 'application/json') // Adicionando o cabeçalho de tipo de conteúdo, se necessário
    try {
      // const response = await firstValueFrom(this.http.get<any>(this.apiUrlOS_abertas, { headers }));
      const response = await firstValueFrom(this.http.get<any>(this.apiUrlOS_abertas));
      return response.data;

    } catch (error) {
      this.handleError(error as HttpErrorResponse);
      return [];

    }
  }

  // getAbrir_os(): Observable<any[]> {
  //   return this.http.get<any>(this.apiUrlAbrir_os).pipe(
  //     map((response) => response.data),
  //     catchError(this.handleError)
  //   );
  // }
  async getAbrir_os(): Promise<any[]> {
    const token = this.authService.getToken();
    if (!token) {
      return [];
    }
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token)
    try {
      // get, post ... retorna como observable
      // firstValueFrom converte o observable em uma promise
      // e trabalha como uma conexa assincrona normalmente
      // const response = await firstValueFrom(this.http.get<any>(this.apiUrlAbrir_os, { headers }));
      const response = await firstValueFrom(this.http.get<any>(this.apiUrlAbrir_os));
      return response.data;
    } catch (error) {
      this.handleError(error as HttpErrorResponse);
      return [];
    }
  }



  // getPecas(): Observable<any[]> {
  //   return this.http.get<any>(this.apiUrPecas).pipe(
  //     map((response) => response.data),
  //     catchError(this.handleError)
  //   );
  // }

  async getPecas(): Promise<any[]> {
    const token = this.authService.getToken();
    if (!token) {
      return [];
    }
    const headers = new HttpHeaders()
    .set('Authorization', 'Bearer ' + token)
    try {
      // const response = await firstValueFrom(this.http.get<any>(this.apiUrPecas, { headers }));
      const response = await firstValueFrom(this.http.get<any>(this.apiUrPecas));
      return response.data;
    } catch (error) {
      this.handleError(error as HttpErrorResponse);
      return [];
    }
  }

  // getServicos(): Observable<any[]> {
  //   return this.http.get<any>(this.apiUrServicos).pipe(
  //     map((response) => response.data),

  //     catchError(this.handleError)
  //   );
  // }

  async getServicos(): Promise<any[]> {
    const token = this.authService.getToken();
    if (!token) {
      return [];
    }
    const headers = new HttpHeaders()
    .set('Authorization', 'Bearer ' + token) // Adicionando o cabeçalho de autorização
    // .set('Content-Type', 'application/json'); // Adicionando o cabeçalho de tipo de conteúdo, se necessário


    try {
      // const response = await firstValueFrom(this.http.get<any>(this.apiUrServicos, { headers }));

      const response = await firstValueFrom(this.http.get<any>(this.apiUrServicos));

      return response.data;
    }
    catch (error) {
      this.handleError(error as HttpErrorResponse);
      return [];
    }
  }


  // Método para enviar login e senha
  // postLogin(loginData: { login: string; senha: string }): Observable<{ token: string; message: string }> {
  //   return this.http.post<any>(this.apiUrllogin, loginData).pipe(
  //     map(response => ({
  //       token: response.data.token,   // Captura o token
  //       message: response.message     // Captura a mensagem
  //     })),
  //     catchError(this.handleError)
  //   );
  // }
  async postLogin(loginData: { login: string; senha: string }): Promise<{ token: string; message: string } | null> {
    try {
      const response = await firstValueFrom(this.http.post<any>(this.apiUrllogin, loginData));
      return {
        token: response.data.token,
        message: response.message
      };
    }
    catch (error) {
      this.handleError(error as HttpErrorResponse);
      return null;
    }
  }

  // Método para obter o token

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

      return throwError(() => new Error('No token provided'));
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
      return throwError(() => new Error('No token provided'));
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
