package com.rrhh.recibo.Utils.DTO;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ResponseDTO {
    private String code;
    private String message;
}
