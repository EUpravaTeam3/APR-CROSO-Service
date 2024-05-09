package com.backend.aprcroso.controller;

import com.backend.aprcroso.model.Company;
import com.backend.aprcroso.model.User;
import com.backend.aprcroso.repository.CompanyRepository;
import com.backend.aprcroso.repository.UserRepository;
import com.backend.aprcroso.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;


@RestController
@RequestMapping("api/users")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    //get all users
    @GetMapping
    public List<User> getAllUsers(){
        return userRepository.findAll();
    }



    //.....


}
