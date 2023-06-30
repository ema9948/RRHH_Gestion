package com.rrhh.recibo.service;

import com.rrhh.recibo.Utils.CheckObject.CheckObject;
import com.rrhh.recibo.Utils.DTO.RequestUsuarioDTO;
import com.rrhh.recibo.Utils.DTO.ResponseDTO;
import com.rrhh.recibo.Utils.exceptions.RequestExecption;
import com.rrhh.recibo.config.JwtService;
import com.rrhh.recibo.model.Admin;
import com.rrhh.recibo.model.Role;
import com.rrhh.recibo.model.Usuario;
import com.rrhh.recibo.model.UsuarioDetalles;
import com.rrhh.recibo.repository.AdminRepository;
import com.rrhh.recibo.repository.UsuarioDetailsRepository;
import com.rrhh.recibo.repository.UsuarioRepository;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class UsuarioService {

    private final UsuarioRepository usuarioRepository;
    private final AdminRepository adminRepository;
    private final UsuarioDetailsRepository usuarioDetailsRepository;
    private final PasswordEncoder encoder;
    private JwtService jwtService;


    public ResponseDTO save(Integer id, RequestUsuarioDTO requestUsuarioDTO) {

        CheckObject.checkPropertiesSave(requestUsuarioDTO);

        Admin admin = adminRepository.findById(id).get();

        if (admin.getEmail().isEmpty())
            throw new RequestExecption("404", HttpStatus.NOT_FOUND, "Admin no registrado");

        if (usuarioRepository.existsByEmail(requestUsuarioDTO.getEmail()))
            throw new RequestExecption("404", HttpStatus.NOT_FOUND, "Email ya registrado");

        var usuarioDetalles = UsuarioDetalles.builder()
                .apellido(requestUsuarioDTO.getApellido())
                .nombre(requestUsuarioDTO.getNombre())
                .dni(requestUsuarioDTO.getDni())
                .telefono(requestUsuarioDTO.getTelefono())
                .domicilio(requestUsuarioDTO.getDomicilio())
                .fechanacimiento(requestUsuarioDTO.getFechanacimiento())
                .ingreso(requestUsuarioDTO.getIngreso())
                .legajo(requestUsuarioDTO.getLegajo())
                .obrasocial(requestUsuarioDTO.getObrasocial())
                .puesto(requestUsuarioDTO.getPuesto())
                .build();

        var usuario = Usuario.builder()
                .password(encoder.encode(requestUsuarioDTO.getPassword()))
                .email(requestUsuarioDTO.getEmail())
                .usuarioDetalles(usuarioDetalles)
                .role(Role.ROLE_USER)
                .build();
        admin.getUsuarios().add(usuario);
        usuarioRepository.save(usuario);

        return ResponseDTO.builder().code("201").message("Usuario Agregado.").build();

    }

    public List<Usuario> allUsuarios(Integer id) {
        if (id.toString().trim().isEmpty())
            throw new RequestExecption("404", HttpStatus.NO_CONTENT, "id no valido");
        if (!adminRepository.existsById(id))
            throw new RequestExecption("404", HttpStatus.NO_CONTENT, "Admin no encontrado.");
        Admin admin = adminRepository.findById(id).get();

        return admin.getUsuarios();

    }

    public Usuario getUsuario(Integer id) {
        try {
            Usuario usuario = usuarioRepository.findById(id).get();
            if (usuario.getEmail().trim().isEmpty())
                throw new RequestExecption("404", HttpStatus.BAD_REQUEST, "Detalles de Usuario no encontrado.");
            return usuario;
        } catch (Exception e) {
            throw new RequestExecption("500", HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage());
        }
    }


    public ResponseDTO delete(Integer id, Usuario usuario) {
        try {
            if (!adminRepository.existsById(id) && !usuarioRepository.existsByEmail(usuario.getEmail())) {
                throw new RequestExecption("404", HttpStatus.BAD_REQUEST, "Admin no encontrado.");
            }
            Usuario usuarioData = usuarioRepository.findByEmail(usuario.getEmail()).get();
            if (!adminRepository.findById(id).get().getUsuarios().remove(usuarioData)) {
                throw new RequestExecption("404", HttpStatus.UNAUTHORIZED, "Accion no autorizada.");
            }
            usuarioRepository.deleteById(usuarioData.getId());
            return ResponseDTO.builder().code("200").message("Usuario eliminado").build();
        } catch (RuntimeException e) {
            throw new RequestExecption("500", HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage());
        }
    }


    @Transactional
    public ResponseDTO patchUsuarioDetalles(Integer id, RequestUsuarioDTO requestUsuarioDTO) {
        if (!usuarioRepository.existsById(id))
            throw new RequestExecption("404", HttpStatus.UNAUTHORIZED, "Usuario no existe.");

        CheckObject.checkPropertiesUpdate(requestUsuarioDTO);

        usuarioDetailsRepository
                .patchUsuario(requestUsuarioDTO.getNombre(),
                        requestUsuarioDTO.getApellido(), requestUsuarioDTO.getDni(),
                        requestUsuarioDTO.getTelefono(), requestUsuarioDTO.getDomicilio(),
                        requestUsuarioDTO.getFechanacimiento(), requestUsuarioDTO.getIngreso(),
                        requestUsuarioDTO.getLegajo(), requestUsuarioDTO.getObrasocial(),
                        requestUsuarioDTO.getPuesto(), id);

        return ResponseDTO.builder().code("200").message("update").build();
    }

    @Transactional
    public ResponseDTO usuarioUpdate(Integer id, Usuario usuario) {

        if (usuario.getEmail().trim().isEmpty() || usuario.getPassword().trim().isEmpty())
            throw new RequestExecption("404", HttpStatus.UNAUTHORIZED, "Faltan datos.");

        if (CheckObject.chechEmail(usuario.getEmail()))
            throw new RequestExecption("404", HttpStatus.UNAUTHORIZED, "Email no valido");

        if (!usuarioRepository.existsById(id))
            throw new RequestExecption("404", HttpStatus.UNAUTHORIZED, "Faltan datos.");

        usuario.setPassword(encoder.encode(usuario.getPassword()));
        usuarioRepository.usuarioUpdate(id, usuario.getEmail(), usuario.getPassword());

        var usuarioDb = usuarioRepository.findById(id);

        String token = jwtService.generateToken(usuarioDb.get());
        return ResponseDTO.builder().code("200").message(token).build();

    }
}
