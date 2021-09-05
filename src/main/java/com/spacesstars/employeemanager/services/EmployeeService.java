package com.spacesstars.employeemanager.services;

import com.spacesstars.employeemanager.models.Employee;
import com.spacesstars.employeemanager.repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
}
