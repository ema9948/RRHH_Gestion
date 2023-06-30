package com.rrhh.recibo.controllers;

import com.rrhh.recibo.Utils.DTO.ErrorDTO;
import com.rrhh.recibo.Utils.exceptions.RequestExecption;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;


@ControllerAdvice
public class ControllAdvices {


    @ExceptionHandler(value = RequestExecption.class)
    public ResponseEntity<ErrorDTO> ResponseGenericException(RequestExecption ex) {
        ErrorDTO errorDTO = ErrorDTO.builder().code(ex.getCode()).message(ex.getMessage()).build();
        return new ResponseEntity<>(errorDTO, ex.getHttpStatus());
    }
}
