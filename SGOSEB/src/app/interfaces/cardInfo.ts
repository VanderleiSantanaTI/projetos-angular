export interface ICardInfo {
  id_os: string;
  data: string;
  marca_da_viatura: string;
  modelo: string;
  placa_eb: string;
  su_cia_da_viatura: string;
  patrimonio: string;
  hodometro: string;
  problema_apresentado: string;
  sistema_afetado: string;
  causa_da_avaria: string;
  manutencao: 'PREVENTIVA' | 'CORRETIVA' | string;
  usuario: string;
  perfil: 'ADMINISTRADOR' | 'USUARIO' | string;
  situacao_os_aberta: 'ABERTA' | 'FECHADA' | 'RETIRADA' | string;
  cadastro_login_idabrios: string;
  id_encerramento: string;
  nome_mecanico: string;
  data_da_manutencao: string;
  situacao_os_encerrada: 'ABERTA' | 'FECHADA' | 'RETIRADA' | string;
  tempo_total: string; 
  cadastro_login_id: string;
}