package com.spacesstars.employeemanager.services;

import com.spacesstars.employeemanager.exceptions.UserNotFoundException;
import com.spacesstars.employeemanager.models.Employee;
import com.spacesstars.employeemanager.repositories.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class EmployeeService {
    private final EmployeeRepository employeeRepository;

    // `Autowired` annotation can be used on a setter to avoid the use of the `<property>` tag in XML file
    // Autowired -> gives fine-grained control
    @Autowired
    public EmployeeService(EmployeeRepository employeeRepository) {
        this.employeeRepository = employeeRepository;
    }

    public Employee addEmployee(Employee employee) {
        employee.setEmployeeCode(UUID.randomUUID().toString());
        return employeeRepository.save(employee);
    }

    public List<Employee> findAllEmployees() {
        return employeeRepository.findAll();
    }

    public Employee updateEmployee(Employee employee) {
        return employeeRepository.save(employee);
    }

    public Employee findEmployeeById(Long id) {
        return employeeRepository.findEmployeeById(id)
                .orElseThrow(() -> new UserNotFoundException("User by id " + id + " was not found"));
    }

    public void deleteEmployee(Long id) {
        employeeRepository.deleteEmployeeById(id);
    }
}
