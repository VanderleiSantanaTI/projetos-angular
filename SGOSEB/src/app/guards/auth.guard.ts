import { AuthServiceService } from 'src/app/services/authService/auth-service.service';
import { Router } from '@angular/router';
import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UtilsService } from '../services/utils/utils.service';
import { NavService } from '../services/nav/nav.service';

// Função que valida o token e, se necessário, redireciona o usuário para o login
export const authGuard: CanActivateFn = (route, state) => {
  const http = inject(HttpClient);
  const utilsService = inject(UtilsService);
  const navService = inject(NavService);
  const router = inject(Router); // Injetar o router no construtor
  
  const authService = new AuthServiceService(utilsService, http, navService); // ou você pode injetar se preferir
  
  // Verifica se o token é válido
  if (!authService.isTokenValid()) {
    // Se o token não for válido, redireciona para a página de login
   
      // Inicia a verificação do token a cada 30 segundos
    
    
    router.navigate(['/login']);
    return false; // Bloqueia a navegação
  }
  
  // Se o token for válido, permite a navegação
  return true;

  
};
