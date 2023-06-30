package com.rrhh.recibo.Utils.CheckObject;


import com.rrhh.recibo.Utils.DTO.RequestUsuarioDTO;
import com.rrhh.recibo.Utils.exceptions.RequestExecption;
import org.springframework.http.HttpStatus;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class CheckObject {

    public static void checkPropertiesSave(RequestUsuarioDTO requestUsuarioDTO) {

        if (requestUsuarioDTO.getEmail() == null || requestUsuarioDTO.getEmail().trim().isEmpty())
            throw new RequestExecption("404", HttpStatus.NOT_FOUND, "email vacio");

        if (chechEmail(requestUsuarioDTO.getEmail()))
            throw new RequestExecption("404", HttpStatus.NOT_FOUND, "email no valido");

        if (requestUsuarioDTO.getPassword() == null || requestUsuarioDTO.getPassword().trim().isEmpty())
            throw new RequestExecption("404", HttpStatus.NOT_FOUND, "password vacio");


        if (requestUsuarioDTO.getNombre() == null || requestUsuarioDTO.getNombre().trim().isEmpty())
            throw new RequestExecption("404", HttpStatus.NOT_FOUND, "nombre vacio");


        if (requestUsuarioDTO.getApellido() == null || requestUsuarioDTO.getApellido().trim().isEmpty())
            throw new RequestExecption("404", HttpStatus.NOT_FOUND, "apellido vacio");

        if (requestUsuarioDTO.getTelefono() == null || requestUsuarioDTO.getTelefono().trim().isEmpty())
            throw new RequestExecption("404", HttpStatus.NOT_FOUND, "telefono vacio");

        if (requestUsuarioDTO.getLegajo() == null || requestUsuarioDTO.getLegajo().trim().isEmpty())
            throw new RequestExecption("404", HttpStatus.NOT_FOUND, "legajo vacio");

        if (requestUsuarioDTO.getDomicilio() == null || requestUsuarioDTO.getDomicilio().trim().isEmpty())
            throw new RequestExecption("404", HttpStatus.NOT_FOUND, "domicilio vacio");

        if (requestUsuarioDTO.getObrasocial() == null || requestUsuarioDTO.getObrasocial().trim().isEmpty())
            throw new RequestExecption("404", HttpStatus.NOT_FOUND, "obrasocial vacio");

        if (requestUsuarioDTO.getPuesto() == null || requestUsuarioDTO.getPuesto().trim().isEmpty())
            throw new RequestExecption("404", HttpStatus.NOT_FOUND, "puesto vacio");

    }

    public static void checkPropertiesUpdate(RequestUsuarioDTO requestUsuarioDTO) {

        if (requestUsuarioDTO.getNombre() == null || requestUsuarioDTO.getNombre().trim().isEmpty())
            throw new RequestExecption("404", HttpStatus.NOT_FOUND, "nombre vacio");


        if (requestUsuarioDTO.getApellido() == null || requestUsuarioDTO.getApellido().trim().isEmpty())
            throw new RequestExecption("404", HttpStatus.NOT_FOUND, "apellido vacio");

        if (requestUsuarioDTO.getTelefono() == null || requestUsuarioDTO.getTelefono().trim().isEmpty())
            throw new RequestExecption("404", HttpStatus.NOT_FOUND, "telefono vacio");

        if (requestUsuarioDTO.getLegajo() == null || requestUsuarioDTO.getLegajo().trim().isEmpty())
            throw new RequestExecption("404", HttpStatus.NOT_FOUND, "legajo vacio");

        if (requestUsuarioDTO.getDomicilio() == null || requestUsuarioDTO.getDomicilio().trim().isEmpty())
            throw new RequestExecption("404", HttpStatus.NOT_FOUND, "domicilio vacio");

        if (requestUsuarioDTO.getObrasocial() == null || requestUsuarioDTO.getObrasocial().trim().isEmpty())
            throw new RequestExecption("404", HttpStatus.NOT_FOUND, "obrasocial vacio");

        if (requestUsuarioDTO.getPuesto() == null || requestUsuarioDTO.getPuesto().trim().isEmpty())
            throw new RequestExecption("404", HttpStatus.NOT_FOUND, "puesto vacio");

        if (requestUsuarioDTO.getFechanacimiento() == null || requestUsuarioDTO.getFechanacimiento().toString().trim().isEmpty())
            throw new RequestExecption("404", HttpStatus.NOT_FOUND, "Fechanacimiento vacio");
        if (requestUsuarioDTO.getIngreso() == null || requestUsuarioDTO.getIngreso().toString().trim().isEmpty())
            throw new RequestExecption("404", HttpStatus.NOT_FOUND, "Ingreso vacio");

    }


    public static Boolean chechEmail(String email) {
        String ePattern = "^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$";
        Pattern pattern = Pattern.compile(ePattern);
        Matcher matcher = pattern.matcher(email);
        return !matcher.matches();
    }

}
