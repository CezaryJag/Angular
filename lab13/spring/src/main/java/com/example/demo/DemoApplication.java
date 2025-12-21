package com.example.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.io.File;
import java.io.IOException;

@SpringBootApplication
public class DemoApplication {

    public static void main(String[] args) {
        // Ensure the SQLite directory exists before Spring / Hibernate tries to open the DB file
        try {
            File dbDir = new File("db");
            if (!dbDir.exists()) {
                boolean created = dbDir.mkdirs();
                if (!created) {
                    System.err.println("Warning: could not create db directory");
                }
            }
            File dbFile = new File(dbDir, "demo.db");
            if (!dbFile.exists()) {
                try {
                    boolean f = dbFile.createNewFile();
                    if (f) System.out.println("Created empty SQLite DB file at: " + dbFile.getAbsolutePath());
                } catch (IOException ex) {
                    System.err.println("Warning: could not create db/demo.db: " + ex.getMessage());
                }
            }
        } catch (Exception e) {
            // If directory creation fails, print a warning and continue - Hibernate will fail later with a clear error
            System.err.println("Warning: could not create db directory: " + e.getMessage());
        }

        SpringApplication.run(DemoApplication.class, args);
    }

}
