package com.rrhh.recibo.service;

import com.rrhh.recibo.Utils.exceptions.RequestExecption;
import com.rrhh.recibo.model.Usuario;
import com.rrhh.recibo.model.UsuarioDetalles;
import com.rrhh.recibo.repository.UsuarioDetailsRepository;
import com.rrhh.recibo.repository.UsuarioRepository;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
@AllArgsConstructor
public class UsuarioDetalleService {

    private final UsuarioDetailsRepository usuarioDetailsRepository;
    private final UsuarioRepository usuarioRepository;

    public void getDetalles(Integer id) {
        UsuarioDetalles usuarioDetalles = usuarioDetailsRepository.findById(id).get();
    }

    public void save(Integer id, UsuarioDetalles usuarioDetalles) {
        if (!usuarioRepository.existsById(id))
            throw new RequestExecption("403", HttpStatus.UNAUTHORIZED, "Usuario no encontrado.");
        if (usuarioDetailsRepository.existsById(id))
            throw new RequestExecption("403", HttpStatus.UNAUTHORIZED, "Detalles no encontrado.");
        Usuario usuario = usuarioRepository.findById(id).get();
        usuarioDetalles.setFechanacimiento(new Date());
        usuarioDetalles.setIngreso(new Date());
        usuarioDetailsRepository.save(usuarioDetalles);
    }
}
