package com.backend.aprcroso.controller;

import com.backend.aprcroso.dto.LoginRequestDTO;
import com.backend.aprcroso.dto.LoginResponseDTO;
import com.backend.aprcroso.dto.UserDTO;
import com.backend.aprcroso.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:4200")
public class LoginController {

    private final UserService userService;

    @Autowired
    public LoginController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/login")
    public LoginResponseDTO login(@RequestBody LoginRequestDTO request) {
        UserDTO user = userService.findFirstByUsername(request.getUsername());

        return LoginResponseDTO.builder()
                .id(user.getId())
                .username(user.getUsername())
                .firstName(user.getFirstName())
                .lastName(user.getLastName())
                .role(user.getRole())
                .companyId(user.getCompanyId())
                .build();
    }
}
