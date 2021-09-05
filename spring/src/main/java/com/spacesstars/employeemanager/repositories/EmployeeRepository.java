package com.spacesstars.employeemanager.repositories;

import com.spacesstars.employeemanager.models.Employee;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

// Syntax of JpaRepository interface -> JpaRepository<Class, Type_Of_Primary_Key>
// The primary key in our case is Id which is of type Long
public interface EmployeeRepository extends JpaRepository<Employee, Long> {
    void deleteEmployeeById(Long id);

    Optional<Employee> findEmployeeById(Long id);
    // Hold `Ctrl` key and then click on a something to get a detailed info on it
    
}
