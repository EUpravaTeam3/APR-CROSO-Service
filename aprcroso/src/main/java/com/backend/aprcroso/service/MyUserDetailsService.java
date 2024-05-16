package com.backend.aprcroso.service;

import com.backend.aprcroso.dto.UserDTO;
import com.backend.aprcroso.exception.NotFoundException;
import com.backend.aprcroso.model.User;
import com.backend.aprcroso.repository.UserRepository;
import org.apache.coyote.BadRequestException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.Optional;

@Service
public class MyUserDetailsService implements UserDetailsService {

    @Autowired
    private UserRepository myUserRepository;


    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException{
        Optional<User> user = myUserRepository.findFirstByUsername(username);
        if(user.isPresent()){
            var userObject = user.get();
            return org.springframework.security.core.userdetails.User.builder()
                    .username(userObject.getUsername())
//                    .password(userObject.getPassword())
                    .roles(getRoles(userObject))
                    .build();
        } else{
            throw new UsernameNotFoundException(username);
        }

    }

    private String[] getRoles(User user){
        if(user.getRole() == null){
            return new String[]{"USER"};
        }
        return user.getRole().split(",");
    }
}
