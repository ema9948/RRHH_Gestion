package com.rrhh.recibo.service;


import com.rrhh.recibo.Utils.DTO.ResponseDTO;
import com.rrhh.recibo.Utils.exceptions.RequestExecption;
import com.rrhh.recibo.controllers.UsuarioCotrollers.UsuarioControllers;
import com.rrhh.recibo.model.Recibo;
import com.rrhh.recibo.model.Usuario;
import com.rrhh.recibo.repository.ReciboRepository;
import com.rrhh.recibo.repository.UsuarioRepository;
import jakarta.annotation.PostConstruct;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.method.annotation.MvcUriComponentsBuilder;

import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.FileAlreadyExistsException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.UUID;

@AllArgsConstructor
@Service
public class ReciboService {


    private final ReciboRepository reciboRepository;
    private final UsuarioRepository usuarioRepository;
    private final static Path root = Paths.get("uploads");

    @PostConstruct
    public void init() {
        try {
            Files.createDirectories(root);
        } catch (IOException e) {
            throw new RequestExecption("500", HttpStatus.INTERNAL_SERVER_ERROR, "Error al crear la carpeta.");
        }

    }


    public ResponseDTO save(Integer id, MultipartFile file) {
        try {
            if (file.isEmpty()) throw new RequestExecption("404", HttpStatus.BAD_REQUEST, "Error archivo.");
            if (!usuarioRepository.existsById(id))
                throw new RequestExecption("403", HttpStatus.NOT_ACCEPTABLE, "Usuario no encontrado.");

            Usuario usuario = usuarioRepository.findById(id).get();

            Recibo recibo = new Recibo();
            recibo.setUuid(UUID.randomUUID() + "." + StringUtils.getFilenameExtension(file.getOriginalFilename()));
            recibo.setName(file.getOriginalFilename());
            recibo.setUrl(MvcUriComponentsBuilder.fromMethodName(UsuarioControllers.class, "loadRecibo", recibo.getUuid()).build().toString());
            usuario.getRecibos().add(recibo);


            reciboRepository.save(recibo);
            Files.copy(file.getInputStream(), root.resolve(recibo.getUuid()));
            return ResponseDTO.builder().code("201").message("Recibo guardado.").build();
        } catch (IOException e) {
            if (e instanceof FileAlreadyExistsException) {
                throw new RequestExecption("404", HttpStatus.CONFLICT, "A file of that name already exists.");
            }
            throw new RequestExecption("500", HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage());
        }

    }


    public List<Recibo> allRecibo(Integer id) {
        if (!usuarioRepository.existsById(id))
            throw new RequestExecption("403", HttpStatus.NOT_ACCEPTABLE, "Usuario no encontrado.");
        Usuario usuario = usuarioRepository.findById(id).get();
        return usuario.getRecibos();
    }

    public Resource load(String filename) {
        try {
            if (filename.isEmpty()) throw new RequestExecption("404", HttpStatus.NOT_ACCEPTABLE, "Not exist file");
            Recibo fileInfo = reciboRepository.findByUuid(filename).get();
            if (fileInfo.getUuid().isEmpty()) {
                return null;
            }
            Path file = root.resolve(fileInfo.getUuid());
            Resource resource = new UrlResource(file.toUri());
            if (resource.exists() || resource.isReadable()) {
                return resource;
            } else {
                throw new RuntimeException("Could not read the file! " + filename);
            }
        } catch (MalformedURLException e) {
            throw new RequestExecption("404", HttpStatus.CONFLICT, "Error: " + e.getMessage());
        }
    }


    public ResponseDTO delete(Integer id, String filename) {
        try {
            if (filename.isEmpty())
                throw new RequestExecption("404", HttpStatus.NOT_ACCEPTABLE, "ingrese un nombre de recibo");

            Recibo recibo = reciboRepository.findByUuid(filename).get();
            Boolean exist = usuarioRepository.findById(id).get().getRecibos().remove(recibo);

            if (!exist)
                throw new RequestExecption("404", HttpStatus.NOT_FOUND, "No existe el recibo.");

            reciboRepository.deleteById(recibo.getId());
            Path file = root.resolve(filename);

            if (!Files.deleteIfExists(file))
                throw new RequestExecption("404", HttpStatus.NOT_FOUND, "recibo no eliminado.");

            return ResponseDTO.builder().code("200").message("Recibo Eliminado").build();
        } catch (IOException e) {
            throw new RequestExecption("404", HttpStatus.CONFLICT, "Error: " + e.getMessage());
        }
    }

    @Transactional
    public void firmar(Integer id, Usuario usur) {
        if (id.toString().isEmpty())
            throw new RequestExecption("404", HttpStatus.NO_CONTENT, "ID NULL");

        var recibo = reciboRepository.findById(id);
        var usuario = usuarioRepository.findByEmail(usur.getEmail());

        if (recibo.isEmpty() && usuario.isEmpty() && usuario.get().getRecibos().remove(recibo))
            throw new RequestExecption("404", HttpStatus.NO_CONTENT, "ID NOT FOUND");

        reciboRepository.firmar(true, recibo.get().getId());
    }
}
