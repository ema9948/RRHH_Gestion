package com.rrhh.recibo.repository;

import com.rrhh.recibo.model.Admin;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface AdminRepository extends JpaRepository<Admin, Integer> {


    Optional<Admin> findByEmail(String email);

    boolean existsByEmail(String email);

    @Modifying
    @Query(value = "UPDATE `admin` SET `email` =:email, `password`=:password WHERE `admin`.`id` =:id", nativeQuery = true)
    void changeDate(@Param("email") String email, @Param("password") String password, @Param("id") Integer id);

    @Modifying
    @Query(value = "UPDATE `admin` SET `password`=:password WHERE `admin`.`id` =:id", nativeQuery = true)
    void changePassword(@Param("password") String password, @Param("id") Integer id);
}
