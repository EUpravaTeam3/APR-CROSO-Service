package com.backend.aprcroso.controller;

import com.backend.aprcroso.dto.UserDTO;
import com.backend.aprcroso.model.Company;
import com.backend.aprcroso.model.User;
import com.backend.aprcroso.repository.CompanyRepository;
import com.backend.aprcroso.repository.UserRepository;
import com.backend.aprcroso.service.UserService;
import com.backend.aprcroso.service.impl.UserServiceImpl;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("api/users")
public class UserController {


    @Autowired
    private UserServiceImpl userServiceImpl;

    //posting hardcoded users info
    @PostConstruct
    public void initUsers(){
        userServiceImpl.initUsers();
    }

    @PostMapping("/registerNewUser")
    public User registerNewUser(@RequestBody User user)
    {
        return userServiceImpl.registerNewUser(user);
    }





    @Autowired
    private UserRepository userRepository;

    //get all users
    @GetMapping
    public List<User> getAllUsers(){
        return userRepository.findAll();
    }



    //.....


}
