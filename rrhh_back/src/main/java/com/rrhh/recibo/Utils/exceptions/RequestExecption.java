package com.rrhh.recibo.Utils.exceptions;


import lombok.Data;
import org.springframework.http.HttpStatus;


@Data
public class RequestExecption extends RuntimeException {
    private String code;
    private HttpStatus httpStatus;

    public RequestExecption(String code, HttpStatus httpStatus, String message) {
        super(message);
        this.code = code;
        this.httpStatus = httpStatus;
    }
}
