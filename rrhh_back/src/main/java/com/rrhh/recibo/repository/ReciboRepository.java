package com.rrhh.recibo.repository;

import com.rrhh.recibo.model.Recibo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface ReciboRepository extends JpaRepository<Recibo, Integer> {

    Optional<Recibo> findByName(String name);

    void deleteByName(String filename);

    Optional<Recibo> findByUuid(String filename);

    @Modifying
    @Query(value = "UPDATE `recibo` SET `firmar`=:boo WHERE `recibo`.`id`=:id", nativeQuery = true)
    void firmar(@Param("boo") Boolean boo, @Param("id") Integer id);
}
