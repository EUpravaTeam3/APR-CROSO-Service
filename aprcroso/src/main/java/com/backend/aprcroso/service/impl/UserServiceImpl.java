package com.backend.aprcroso.service.impl;

import com.backend.aprcroso.dto.UserDTO;
import com.backend.aprcroso.model.User;
import com.backend.aprcroso.repository.UserRepository;
import com.backend.aprcroso.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl {
    private final UserRepository userRepository;

    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;

    }




    //hardcoded User informations
    public User registerNewUser(User user) { return userRepository.save(user); }

    public void initUsers(){
        User user = new User();
        user.setId(null);
        user.setUsername("perica");
        user.setFirstName("Petar");
        user.setLastName("Peric");
        user.setRole("ADMIN");
        user.setCitizenship("Serbian");
        user.setJMBG("12356789");
        user.setDateOfBirth(null);
        userRepository.save(user);


        User user2 = new User();
        user2.setId(null);
        user2.setUsername("markec");
        user2.setFirstName("Marko");
        user2.setLastName("Markovic");
        user2.setRole("USER");
        user2.setCitizenship("Serbian");
        user2.setJMBG("12356789");
        user2.setDateOfBirth(null);
        userRepository.save(user2);


    }






    //..........
}
