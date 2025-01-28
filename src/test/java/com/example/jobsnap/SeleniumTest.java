package com.example.jobsnap;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;

public class SeleniumTest {
    public static void main(String[] args) {
        // Specifică calea completă către ChromeDriver
        System.setProperty("webdriver.chrome.driver", "D:\\chromedriver-win64\\chromedriver.exe");

        // Creează o instanță de ChromeDriver
        WebDriver driver = new ChromeDriver();

        // Navighează la o pagină web
        driver.get("https://www.example.com");

        // Închide browserul
        driver.quit();
    }
}
