package com.rrhh.recibo.config;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

@Service
public class JwtService {

    @Value("${SECRET_KEY}")
    private String secret_key;


    //Create Token sin info Extra
    public String generateToken(UserDetails userDetails) {
        return generateToken(new HashMap<>(), userDetails);
    }

    //Create Token con info Extra
    public String generateToken(Map<String, Object> extraClaims, UserDetails userDetails) {

        return Jwts
                .builder()
                .setClaims(extraClaims)
                .setSubject(userDetails.getUsername())
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date((System.currentTimeMillis() + 604800000)))
                .signWith(getSingKey(), SignatureAlgorithm.HS256)
                .compact();
    }

    public String generateTokenReset(UserDetails userDetails) {
        return generateTokenReset(new HashMap<>(), userDetails);
    }

    public String generateTokenReset(Map<String, Object> extraClaims, UserDetails userDetails) {

        return Jwts
                .builder()
                .setClaims(extraClaims)
                .setSubject(userDetails.getUsername())
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date((System.currentTimeMillis() + 300000)))
                .signWith(getSingKey(), SignatureAlgorithm.HS256)
                .compact();
    }

    //Verify Token
    public Boolean isTokenValid(String token, UserDetails userDetails) {
        final String username = extractUsername(token);
        if (token.isEmpty() || userDetails == null) return false;
        return (username.equals(userDetails.getUsername()) && !isTokenExpirated(token));
    }


    //extract Username
    public String extractUsername(String token) {
        return extracClaim(token, Claims::getSubject);
    }

    //Extract Claims
    public <T> T extracClaim(String token, Function<Claims, T> claimsResolve) {
        final Claims claims = extractAllClaims(token);
        return claimsResolve.apply(claims);
    }

    private Claims extractAllClaims(String token) {
        return Jwts
                .parserBuilder()
                .setSigningKey(getSingKey())
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    //Verify Token Expirate
    public Boolean isTokenExpirated(String token) {
        return extracExperitacion(token).before(new Date());
    }


    private Date extracExperitacion(String token) {
        return extracClaim(token, Claims::getExpiration);
    }


    //Encode secret-key
    private Key getSingKey() {
        byte[] keyBytes = Decoders.BASE64.decode(secret_key);
        return Keys.hmacShaKeyFor(keyBytes);
    }


}
