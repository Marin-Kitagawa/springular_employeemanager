package com.spacesstars.employeemanager.models;

import javax.persistence.*;
import java.io.Serializable;

// Serializable is used to transform the model into various strings like JSON etc.
// Entity annotation makes sure that the class is mapped to any database configured on the `classpath`
@Entity
public class Employee implements Serializable {
    // We have to map this class to a Database
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(nullable = false, updatable = false)
    private Long id;
    private String name;
    private String email;
    private String jobTitle;
    private String phone;
    private String imageUrl;
    @Column(nullable = false, updatable = false)
    private String employeeCode;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getJobTitle() {
        return jobTitle;
    }

    public void setJobTitle(String jobTitle) {
        this.jobTitle = jobTitle;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public String getEmployeeCode() {
        return employeeCode;
    }

    public void setEmployeeCode(String employeeCode) {
        this.employeeCode = employeeCode;
    }

    @Override
    public String toString() {
        return "Employee {" +
                    "  id = " + id +
                    ", name = '" + name + "'" +
                    ", email = '" + email + "'" +
                    ", jobTitle = '" + jobTitle + "'" +
                    ", imageUrl = '" + imageUrl + "'" +
                "}";
    }
}
