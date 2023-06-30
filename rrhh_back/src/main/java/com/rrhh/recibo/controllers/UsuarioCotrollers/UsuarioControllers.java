package com.rrhh.recibo.controllers.UsuarioCotrollers;

import com.rrhh.recibo.Utils.DTO.ResponseDTO;
import com.rrhh.recibo.model.Usuario;
import com.rrhh.recibo.service.ReciboService;
import com.rrhh.recibo.service.UsuarioService;
import lombok.AllArgsConstructor;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.nio.file.Files;


@RestController
@RequestMapping("api/v1/user")
@AllArgsConstructor
public class UsuarioControllers {

    private final UsuarioService usuarioService;
    private final ReciboService reciboService;


    @GetMapping("/{id}")
    public ResponseEntity<Usuario> allData(@PathVariable("id") Integer id) {
        Usuario usuario = usuarioService.getUsuario(id);
        return new ResponseEntity<>(usuario, HttpStatus.OK);
    }

    @GetMapping("/loadRecibo/{filename:.+}")
    @ResponseBody
    public ResponseEntity<Resource> loadRecibo(@PathVariable String filename) throws IOException {
        Resource file = reciboService.load(filename);
        String contentType = Files.probeContentType(file.getFile().toPath());
        return ResponseEntity
                .ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, contentType)
                .body(file);
    }

    @PatchMapping("/firmar/{id}")
    public ResponseEntity firmarRecibo(@PathVariable("id") Integer id, @RequestBody() Usuario usuario) {
        reciboService.firmar(id, usuario);
        return new ResponseEntity<>("200", HttpStatus.OK);
    }

    @PatchMapping("/setCredential/{id}")
    public ResponseEntity changePasswordUsuario(@PathVariable("id") Integer id, @RequestBody Usuario usuario) {
        ResponseDTO responseDTO = usuarioService.usuarioUpdate(id, usuario);
        return new ResponseEntity<>(responseDTO, HttpStatus.OK);
    }

}
