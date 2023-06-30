package com.rrhh.recibo.Utils.DTO;

import lombok.Builder;
import lombok.Data;

import java.util.Date;

@Data
@Builder
public class RequestUsuarioDTO {
    private String email;
    private String password;
    private String nombre;
    private String apellido;
    private String dni;
    private String telefono;
    private String legajo;
    private Date ingreso;
    private Date fechanacimiento;
    private String domicilio;
    private String obrasocial;
    private String puesto;
}
