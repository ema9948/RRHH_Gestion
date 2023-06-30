package com.rrhh.recibo.service;

import com.rrhh.recibo.Utils.DTO.DataDTO;
import com.rrhh.recibo.Utils.DTO.ResponseDTO;
import com.rrhh.recibo.Utils.DTO.ResponseJWT;
import com.rrhh.recibo.Utils.emailConfig.Email;
import com.rrhh.recibo.Utils.exceptions.RequestExecption;
import com.rrhh.recibo.config.JwtService;
import com.rrhh.recibo.model.Admin;
import com.rrhh.recibo.model.Role;
import com.rrhh.recibo.model.Usuario;
import com.rrhh.recibo.repository.AdminRepository;
import com.rrhh.recibo.repository.UsuarioRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AdminService {

    private final AdminRepository adminRepository;
    private final UsuarioRepository usuarioRepository;
    private final PasswordEncoder encoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    private final JavaMailSender email;

    public ResponseJWT register(Admin data) {
        var admin = Admin.builder()
                .email(data.getEmail())
                .password(encoder.encode(data.getPassword()))
                .role(Role.ROLE_ADMIN)
                .build();

        if (adminRepository.existsByEmail(data.getEmail()))
            throw new RequestExecption("404", HttpStatus.CONFLICT, "Email en uso.");
        adminRepository.save(admin);
        return ResponseJWT.builder().jwt(jwtService.generateToken(admin)).userId(admin.getId() + "").build();
    }


    public ResponseJWT authenticateAdmin(Admin data) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        data.getEmail(),
                        data.getPassword()
                )
        );

        var admin = adminRepository.findByEmail(data.getEmail());

        if (!admin.isPresent()) throw new RequestExecption("204", HttpStatus.NO_CONTENT, "Usuario no regitrado");

        return ResponseJWT.builder().jwt("Bearer " + jwtService.generateToken(admin.get())).userId(admin.get().getId() + "").build();
    }

    public ResponseJWT authenticateUser(Usuario data) {


        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        data.getEmail(),
                        data.getPassword()
                )
        );
        var user = usuarioRepository.findByEmail(data.getEmail());
        if (!user.isPresent()) throw new RequestExecption("404", HttpStatus.NO_CONTENT, "Usuario no regitrado");

        return ResponseJWT.builder().jwt("Bearer " + jwtService.generateToken(user.get())).
                userId(user.get().getId() + "").build();
    }

    @Transactional
    public ResponseJWT changePasswordAdmin(Integer id, Admin data) {

        var admin = adminRepository.findById(id);
        if (!admin.isPresent()) throw new RequestExecption("204", HttpStatus.NO_CONTENT, "Admin no regitrado");

        data.setPassword(encoder.encode(data.getPassword()));
        admin.get().setEmail(data.getEmail());
        adminRepository.changeDate(data.getEmail(), data.getPassword(), admin.get().getId());

        return ResponseJWT.builder().jwt("Bearer " + jwtService.generateToken(admin.get())).
                userId(admin.get().getId() + "").build();
    }

    public ResponseDTO sendEmail(DataDTO data) {

        var admin = adminRepository.findByEmail(data.getEmail());
        var empleado = usuarioRepository.findByEmail(data.getEmail());

        if (admin.isPresent()) {
            email.send(Email.generateEmail(jwtService.generateTokenReset(admin.get()), admin.get().getEmail(), "admin"));
            return ResponseDTO.builder().code("200").message("Verifique su mail").build();
        } else if (empleado.isPresent()) {
            email.send(Email.generateEmail(jwtService.generateTokenReset(empleado.get()), empleado.get().getEmail(), "user"));
            return ResponseDTO.builder().code("200").message("Verifique su mail").build();
        } else {
            throw new RequestExecption("404", HttpStatus.NOT_FOUND, "Email not found.");
        }

    }

    @Transactional
    public ResponseDTO resetPassword(DataDTO data, String token) {
        if (jwtService.isTokenExpirated(token))
            throw new RequestExecption("404", HttpStatus.NOT_FOUND, "Token vencido.");

        String email = jwtService.extractUsername(token);
        if (email.isEmpty()) throw new RequestExecption("404", HttpStatus.NOT_FOUND, "Email not found.");

        var admin = adminRepository.findByEmail(email);
        var usuario = usuarioRepository.findByEmail(email);

        if (admin.isPresent()) {
            data.setPassword(encoder.encode(data.getPassword()));
            adminRepository.changePassword(data.getPassword(), admin.get().getId());
            return ResponseDTO.builder().code("200").message("Operacion exitosa.").build();
        }

        if (usuario.isPresent()) {
            data.setPassword(encoder.encode(data.getPassword()));
            usuarioRepository.changePassword(usuario.get().getId(), data.getPassword());
            return ResponseDTO.builder().code("200").message("Operacion exitosa.").build();
        }

        throw new RequestExecption("404", HttpStatus.NOT_FOUND, "Email not found.");
    }
}

