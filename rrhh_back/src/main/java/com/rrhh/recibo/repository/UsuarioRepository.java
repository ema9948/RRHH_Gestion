package com.rrhh.recibo.repository;

import com.rrhh.recibo.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface UsuarioRepository extends JpaRepository<Usuario, Integer> {
    boolean existsByEmail(String email);

    Optional<Usuario> findByEmail(String email);

    @Modifying
    @Query(value = "UPDATE  `usuario` SET  `email` =:email,  `password` =:pass WHERE `usuario`.`id` =:id ", nativeQuery = true)
    void usuarioUpdate(@Param("id") Integer id, @Param("email") String email, @Param("pass") String pass);

    @Modifying
    @Query(value = "UPDATE  `usuario` SET  `password` =:pass WHERE `usuario`.`id` =:id ", nativeQuery = true)
    void changePassword(@Param("id") Integer id, @Param("pass") String pass);

}
