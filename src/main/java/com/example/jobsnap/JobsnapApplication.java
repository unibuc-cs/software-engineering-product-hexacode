package com.example.jobsnap;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;

@EntityScan(basePackages = "com.example.jobsnap.entity")
@SpringBootApplication(scanBasePackages = "com.example.jobsnap")
public class JobsnapApplication {
	public static void main(String[] args) {
		SpringApplication.run(JobsnapApplication.class, args);
	}
}

