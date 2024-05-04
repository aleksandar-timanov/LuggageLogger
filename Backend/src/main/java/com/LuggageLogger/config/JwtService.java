package com.LuggageLogger.config;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import io.jsonwebtoken.Claims;

import javax.crypto.SecretKey;

import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;
import java.util.Date;

import static org.hibernate.internal.CoreLogging.logger;

@Service
public class JwtService {

    // TODO: the key would not be Base64 encoded (so it is not safe for transferring in url or saving like this)
    private static final SecretKey SECRET_KEY = Jwts.SIG.HS256.key().build();

    /*
    * Extraction of data from received token
    */
    public String extractUsername(String jwt) {
        return extractClaim(jwt, Claims::getSubject);
    }

    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

    private Claims extractAllClaims(String token) {
        // if the token can not be trusted this would throw a JwtException

        return (Claims) Jwts
                .parser()
                .verifyWith(SECRET_KEY)
                .build()
                .parse(token)
                .getPayload();
    }

    /*
    * Creation of new token
    */
    public String generateToken(
            Map<String, Object> customClaims,
            UserDetails userDetails
    ) {
        return Jwts
                .builder()
                .claims(customClaims)
                .subject(userDetails.getUsername())
                .issuedAt(new Date(System.currentTimeMillis()))
                .expiration(new Date(System.currentTimeMillis() + 1000 * 60 * 24)) //token is valid for 24 hours = 1000(ms) * 60(s) * 24(h)
                .signWith(SECRET_KEY)
                .compact();
    }

    public String generateToken(UserDetails userDetails) {
        return generateToken(new HashMap<>(), userDetails);
    }

    /*
    * Validation of received token
    */

    public boolean isTokenValid(String token, UserDetails userDetails) {
        final String username = extractUsername(token);
        return (username.equals(userDetails.getUsername()) && !isTokenExpired(token));
    }

    private boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    private Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }
}
