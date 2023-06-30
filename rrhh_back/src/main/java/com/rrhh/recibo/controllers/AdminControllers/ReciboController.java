package com.rrhh.recibo.controllers.AdminControllers;

import com.rrhh.recibo.Utils.DTO.ResponseDTO;
import com.rrhh.recibo.model.Recibo;
import com.rrhh.recibo.service.ReciboService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("api/v1/admin/recibo")
@AllArgsConstructor
public class ReciboController {

    private final ReciboService reciboService;

    @PostMapping("/{id}")
    public ResponseEntity<ResponseDTO> save(@PathVariable("id") Integer id, @RequestParam("file") MultipartFile file) {
        ResponseDTO responseDTO = reciboService.save(id, file);
        return new ResponseEntity<>(responseDTO, HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public List<Recibo> allRecibo(@PathVariable("id") Integer id) {
        return reciboService.allRecibo(id);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ResponseDTO> deleteRecibo(@PathVariable("id") Integer id, @RequestBody Recibo recibo) {
        ResponseDTO responseDTO = reciboService.delete(id, recibo.getUuid());
        return new ResponseEntity<>(responseDTO, HttpStatus.OK);

    }
}
