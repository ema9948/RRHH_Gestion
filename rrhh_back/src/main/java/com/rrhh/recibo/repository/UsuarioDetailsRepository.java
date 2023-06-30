package com.rrhh.recibo.repository;

import com.rrhh.recibo.model.UsuarioDetalles;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Date;

public interface UsuarioDetailsRepository extends JpaRepository<UsuarioDetalles, Integer> {


    @Modifying
    @Query(value = "UPDATE `usuario_detalles` SET `nombre` =:nombre , `apellido`=:apellido,`dni`=:dni ,  `telefono`=:telefono ,  `domicilio`=:domicilio, `fechanacimiento`=:fechanacimiento,  `ingreso`=:ingreso , `legajo`=:legajo,  `obrasocial`=:obrasocial , `puesto`=:puesto WHERE `usuario_detalles`.`id` =:id", nativeQuery = true)
    void patchUsuario(@Param("nombre") String nombre, @Param("apellido") String apellido, @Param("dni") String dni, @Param("telefono") String telefono, @Param("domicilio") String domocilio, @Param("fechanacimiento") Date fechadenacimiento, @Param("ingreso") Date ingreso, @Param("legajo") String legajo, @Param("obrasocial") String obrasocial, @Param("puesto") String puesto, @Param("id") Integer id);
}
