export interface Root {
  id: number;
  email: string;
  role: string;
  recibos: Recibo[];
  usuarioDetalles: UsuarioDetalles;
}

export interface Credentials {
  password: string;
  email: string;
}

export interface Recibo {
  id: number;
  uuid: string;
  name: string;
  url: string;
  createOn: string;
  firmar: boolean;
}

export interface UsuarioDetalles {
  id: number;
  nombre: string;
  apellido: string;
  dni: string;
  telefono: string;
  legajo: string;
  ingreso: any;
  fechanacimiento: any;
  domicilio: string;
  obrasocial: string;
  puesto: string;
}
