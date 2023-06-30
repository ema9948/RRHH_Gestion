package com.rrhh.recibo.controllers.AdminControllers;

import com.rrhh.recibo.Utils.DTO.RequestUsuarioDTO;
import com.rrhh.recibo.Utils.DTO.ResponseDTO;
import com.rrhh.recibo.Utils.DTO.ResponseJWT;
import com.rrhh.recibo.model.Admin;
import com.rrhh.recibo.model.Usuario;
import com.rrhh.recibo.service.AdminService;
import com.rrhh.recibo.service.UsuarioService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/v1/admin")
@AllArgsConstructor
public class AdminController {

    private final UsuarioService usuarioService;
    private final AdminService adminService;


    @PatchMapping("/setCredential/{id}")
    public ResponseEntity changePasswordAdmin(@PathVariable("id") Integer id, @RequestBody() Admin admin) {
        ResponseJWT response = adminService.changePasswordAdmin(id, admin);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PostMapping("/addUsuario/{id}")
    public ResponseEntity<ResponseDTO> save(@PathVariable("id") Integer id, @RequestBody RequestUsuarioDTO requestUsuarioDTO) {
        ResponseDTO responseDTO = usuarioService.save(id, requestUsuarioDTO);
        return new ResponseEntity<>(responseDTO, HttpStatus.CREATED);
    }

    @GetMapping("/allUsuario/{id}")
    public ResponseEntity<List<Usuario>> allUsuario(@PathVariable("id") Integer id) {
        List<Usuario> user = usuarioService.allUsuarios(id);
        return new ResponseEntity<List<Usuario>>(user, HttpStatus.OK);
    }

    @GetMapping("/usuario/{id}")
    public ResponseEntity getUsuario(@PathVariable("id") Integer id) {
        Usuario usuario = usuarioService.getUsuario(id);
        return new ResponseEntity<>(usuario, HttpStatus.OK);
    }

    @DeleteMapping("/usuario/{id}")
    public ResponseEntity<ResponseDTO> deleteUsuario(@PathVariable("id") Integer id, @RequestBody Usuario usuario) {
        ResponseDTO responseDTO = usuarioService.delete(id, usuario);
        return new ResponseEntity<>(responseDTO, HttpStatus.OK);
    }

    @PatchMapping("/detallesUpdate/{id}")
    public ResponseEntity<ResponseDTO> detallesUpdate(@PathVariable("id") Integer id, @RequestBody RequestUsuarioDTO requestUsuarioDTO) {
        ResponseDTO responseDTO = usuarioService.patchUsuarioDetalles(id, requestUsuarioDTO);
        return new ResponseEntity<>(responseDTO, HttpStatus.OK);
    }

    @PatchMapping("/usuarioUpdate/{id}")
    public ResponseEntity changePasswordUsuario(@PathVariable("id") Integer id, @RequestBody Usuario usuario) {
        ResponseDTO responseDTO = usuarioService.usuarioUpdate(id, usuario);
        return new ResponseEntity<>(responseDTO, HttpStatus.OK);
    }

}
