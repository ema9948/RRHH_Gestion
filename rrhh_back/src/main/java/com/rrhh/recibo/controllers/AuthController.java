package com.rrhh.recibo.controllers;


import com.rrhh.recibo.Utils.DTO.DataDTO;
import com.rrhh.recibo.Utils.DTO.ResponseDTO;
import com.rrhh.recibo.Utils.DTO.ResponseJWT;
import com.rrhh.recibo.model.Admin;
import com.rrhh.recibo.model.Usuario;
import com.rrhh.recibo.service.AdminService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api/v1/auth")
@AllArgsConstructor
public class AuthController {

    private final AdminService adminService;

    @PostMapping("/authenticate/admin")
    public ResponseEntity<ResponseJWT> authenticateAdmin(@RequestBody Admin admin) {
        ResponseJWT responseJWT = adminService.authenticateAdmin(admin);
        return new ResponseEntity<>(responseJWT, HttpStatus.OK);
    }

    @PostMapping("/authenticate/user")
    public ResponseEntity<ResponseJWT> authenticateUser(@RequestBody Usuario usuario) {
        ResponseJWT responseJWT = adminService.authenticateUser(usuario);
        return new ResponseEntity<>(responseJWT, HttpStatus.OK);
    }


    @PostMapping("/register")

    public ResponseEntity<ResponseJWT> register(@RequestBody Admin admin) {
        ResponseJWT responseJWT = adminService.register(admin);
        return new ResponseEntity<>(responseJWT, HttpStatus.CREATED);
    }

    @PostMapping("/resetPasswordSendEmail")
    public ResponseEntity resetPasswordSendEmail(@RequestBody() DataDTO data) {
        ResponseDTO res = adminService.sendEmail(data);
        return new ResponseEntity<>(res, HttpStatus.OK);
    }

    @PatchMapping("/resetPassword/")
    public ResponseEntity resetPassword(@RequestBody() DataDTO data, @RequestParam("token") String token) {
        ResponseDTO res = adminService.resetPassword(data, token);

        return new ResponseEntity<>(res, HttpStatus.OK);
    }
}
