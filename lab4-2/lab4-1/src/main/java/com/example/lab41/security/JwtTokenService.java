package com.example.lab41.security;

import io.jsonwebtoken.*;

import java.util.Date;

public class JwtTokenService {
    private final String secret_key = "never_gonna_give_you_up";
    private final int exp_time = 60 * 50 * 5 * 1000;

    public String generateToken(String name, int userId) {
        Date now = new Date();
        Date expiration = new Date(now.getTime() + exp_time);

        return Jwts.builder()
                .setExpiration(expiration)
                .setSubject(name + " " + userId)
                .setIssuedAt(now)
                .signWith(SignatureAlgorithm.HS256, secret_key)
                .compact();
    }

    public boolean isTokenValid(String token) {
        try {
            Claims claims = Jwts.parser().setSigningKey(secret_key).parseClaimsJws(token).getBody();
            return claims.getExpiration().after(new Date());
        } catch (ExpiredJwtException expEx) {
            System.out.println("Token expired " + expEx);
        } catch (UnsupportedJwtException unsEx) {
            System.out.println("Unsupported jwt " + unsEx);
        } catch (MalformedJwtException mjEx) {
            System.out.println("Malformed jwt " + mjEx);
        } catch (SignatureException sEx) {
            System.out.println("Invalid signature " + sEx);
        } catch (Exception e) {
            System.out.println("invalid token " + e);
        }
        return false;


    }

    public int getIdFromToken(String token) {
        Claims claims = Jwts.parser().setSigningKey(secret_key).parseClaimsJws(token).getBody();
        return Integer.parseInt(claims.getSubject().split(" ")[1]);
    }

    public JwtTokenService() {
    }
}
