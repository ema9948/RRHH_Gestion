package com.rrhh.recibo.Utils.DTO;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ResponseJWT {
    private String jwt;
    private String userId;
}
