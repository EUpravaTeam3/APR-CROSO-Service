package com.backend.aprcroso.security;

import com.backend.aprcroso.service.MyUserDetailsService;
import org.hibernate.annotations.Bag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Autowired
    private MyUserDetailsService userDetailsService;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity) throws Exception {
        return httpSecurity
                .csrf(AbstractHttpConfigurer::disable)
                .authorizeRequests(registry ->{
//                    registry.requestMatchers("/home", "/register/**").permitAll();
//                    registry.requestMatchers("//http://localhost:8005/api/users/**").hasRole("ADMIN");
//                    registry.requestMatchers("/http://localhost:8005/api/companies/**").hasRole("USER");
                    registry.requestMatchers("/**").permitAll();
                    registry.anyRequest().authenticated();

                })
                .build();
    }

    @Bean
    public UserDetailsService userDetailsService(){
        return userDetailsService;
    }
//    @Bean
//    public CorsConfigurationSource corsConfigurationSource() {
//        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
//
//        CorsConfiguration corsConfiguration = new CorsConfiguration();
//
//        corsConfiguration.applyPermitDefaultValues();
//        corsConfiguration.addAllowedMethod("PUT");
//        corsConfiguration.addAllowedMethod("PATCH");
//        corsConfiguration.addAllowedMethod("DELETE");
//
//        source.registerCorsConfiguration("/**", corsConfiguration);
//        return source;
//    }


    @Bean
    public AuthenticationProvider authenticationProvider(){
        DaoAuthenticationProvider provider = new DaoAuthenticationProvider();
        provider.setUserDetailsService(userDetailsService);
        provider.setPasswordEncoder(passwordEncoder());
        return provider;
    }

    @Bean
    public PasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    }


}
