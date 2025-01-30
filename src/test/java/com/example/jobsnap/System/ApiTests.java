package com.example.jobsnap.System;

import io.restassured.RestAssured;
import io.restassured.http.ContentType;
import io.restassured.response.Response;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;

import static io.restassured.RestAssured.*;
import static org.hamcrest.Matchers.*;
import static org.junit.jupiter.api.Assertions.*;

public class ApiTests {

    @BeforeAll
    public static void setup() {
        // Setăm URL-ul de bază pentru API
        RestAssured.baseURI = "http://localhost:8080"; // Adaptează portul dacă backend-ul rulează pe alt port
    }

    /**
     * Test pentru endpoint-ul POST /api/auth/signup
     */
    @Test
    public void testSignUp() {
        given()
                .contentType(ContentType.JSON)
                .body("{"
                        + "\"email\": \"john.doe@example.com\","
                        + "\"password\": \"password123\","
                        + "\"role\": \"student\","
                        + "\"firstName\": \"John\","
                        + "\"lastName\": \"Doe\","
                        + "\"universityName\": \"University of Bucharest\","
                        + "\"universityEmail\": \"john.doe@unibuc.ro\","
                        + "\"phone\": \"123456789\""
                        + "}")
                .when()
                .post("/api/auth/signup")
                .then()
                .statusCode(201) // Așteptăm un răspuns de succes
                .body("message", equalTo("User registered successfully"));
    }

    /**
     * Test pentru endpoint-ul POST /api/auth/login
     */
    @Test
    public void testLogin() {
        given()
                .contentType(ContentType.JSON)
                .body("{"
                        + "\"email\": \"john.doe@example.com\","
                        + "\"password\": \"password123\""
                        + "}")
                .when()
                .post("/api/auth/login")
                .then()
                .statusCode(200) // Așteptăm succes
                .body("token", notNullValue()) // Token JWT ar trebui să fie returnat
                .body("email", equalTo("john.doe@example.com"))
                .body("role", equalTo("student"));
    }

    /**
     * Test pentru endpoint-ul GET /api/profiles/me
     */
    @Test
    public void testGetProfile() {
        // Obține token-ul prin login
        String token = given()
                .contentType(ContentType.JSON)
                .body("{"
                        + "\"email\": \"john.doe@example.com\","
                        + "\"password\": \"password123\""
                        + "}")
                .when()
                .post("/api/auth/login")
                .then()
                .statusCode(200)
                .extract()
                .path("token");

        // Folosește token-ul pentru a accesa profilul
        given()
                .header("Authorization", "Bearer " + token)
                .when()
                .get("/api/profiles/me")
                .then()
                .statusCode(200) // Profilul ar trebui să existe
                .body("firstName", equalTo("John"))
                .body("lastName", equalTo("Doe"))
                .body("email", equalTo("john.doe@example.com"));
    }

    /**
     * Test pentru validări de input la sign-up
     */
    @Test
    public void testSignUpWithInvalidData() {
        given()
                .contentType(ContentType.JSON)
                .body("{"
                        + "\"email\": \"invalid-email\","
                        + "\"password\": \"pass\","
                        + "\"role\": \"unknown_role\""
                        + "}")
                .when()
                .post("/api/auth/signup")
                .then()
                .statusCode(400) // Așteptăm un răspuns de eroare
                .body("message", notNullValue()); // Verificăm dacă există un mesaj de eroare
    }

    /**
     * Test pentru acces neautorizat la profil
     */
    @Test
    public void testUnauthorizedAccessToProfile() {
        given()
                .when()
                .get("/api/profiles/me")
                .then()
                .statusCode(401) // Fără token JWT, accesul ar trebui să fie refuzat
                .body("message", equalTo("Unauthorized"));
    }
}
