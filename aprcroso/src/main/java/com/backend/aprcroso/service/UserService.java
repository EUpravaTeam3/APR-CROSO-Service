package com.backend.aprcroso.service;

import com.backend.aprcroso.dto.UserDTO;

public interface UserService {

    UserDTO findByUsername(String username);

}
