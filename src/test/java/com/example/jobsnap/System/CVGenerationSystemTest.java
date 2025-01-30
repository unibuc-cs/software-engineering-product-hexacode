package com.example.jobsnap.System;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.time.Duration;

import static org.junit.jupiter.api.Assertions.*;

public class CVGenerationSystemTest {
    private WebDriver driver;
    private WebDriverWait wait;

    @BeforeEach
    public void setUp() {
        // Inițializează WebDriver și așteptările explicite
        driver = new ChromeDriver();
        driver.manage().window().maximize();
        wait = new WebDriverWait(driver, Duration.ofSeconds(10));
    }

    @Test
    public void testGenerareCV() {
        // Navighează la pagina de autentificare
        driver.get("http://localhost:3000/login");

        // Completează câmpurile de autentificare
        WebElement emailField = wait.until(ExpectedConditions.visibilityOfElementLocated(By.id("email")));
        WebElement passwordField = wait.until(ExpectedConditions.visibilityOfElementLocated(By.id("password")));
        WebElement loginButton = driver.findElement(By.cssSelector("button.bg-indigo-600"));


        emailField.sendKeys("test@test.com");
        passwordField.sendKeys("test");
        loginButton.click();

        // Navighează la pagina de generare a CV-ului după autentificare
        driver.get("http://localhost:3000/create-cv/graphicdesign");

        // Completează formularul de generare a CV-ului
        WebElement numeField = wait.until(ExpectedConditions.visibilityOfElementLocated(By.name("fullName")));
        WebElement educatieField = driver.findElement(By.name("education"));
        WebElement experientaField = driver.findElement(By.name("experience"));
        WebElement genereazaButton = driver.findElement(By.cssSelector("button.bg-green-600"));

        numeField.sendKeys("Popescu Alex");
        educatieField.sendKeys("Universitatea București, Informatica");
        experientaField.sendKeys("Internship la ABC Tech");

        // Submite formularul
        genereazaButton.click();

        // Verifică dacă mesajul de succes este afișat
//        WebElement successMessage = wait.until(ExpectedConditions.visibilityOfElementLocated(By.id("successMessage")));
//        assertNotNull(successMessage);
//        assertEquals("CV-ul a fost generat cu succes!", successMessage.getText());
    }

    @AfterEach
    public void tearDown() {
        // Închide browserul
        if (driver != null) {
            driver.quit();
        }
    }
}
