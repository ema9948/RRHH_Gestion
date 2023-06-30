package com.rrhh.recibo.Utils.DTO;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@AllArgsConstructor
@Data
@Builder
public class DataDTO {
    private String email;
    private String password;
}
