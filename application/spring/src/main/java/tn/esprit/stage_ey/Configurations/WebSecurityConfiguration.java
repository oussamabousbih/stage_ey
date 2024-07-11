package tn.esprit.stage_ey.Configurations;



import tn.esprit.stage_ey.filters.JwtRequestFilter;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.cors.CorsConfiguration;

@CrossOrigin("*")
@Configuration
@EnableWebSecurity
@EnableMethodSecurity
@RequiredArgsConstructor
public class WebSecurityConfiguration {


    private  final JwtRequestFilter jwtRequestFilter;





    @Bean
//security ressources rules
    public SecurityFilterChain securityFilterChain(HttpSecurity security) throws Exception {
        return security
                .cors().configurationSource(request -> {
                    CorsConfiguration corsConfig = new CorsConfiguration();
                    corsConfig.addAllowedOrigin("*"); // Allow requests from any origin
                    corsConfig.addAllowedMethod("*"); // Allow all HTTP methods
                    corsConfig.addAllowedHeader("*"); // Allow all headers
                    return corsConfig;
                }).and()
                .csrf().disable()// Cross-Site Request Forgery (CSRF) protection by default.
                .authorizeRequests(authorizeRequests ->
                        authorizeRequests
                                .requestMatchers("/signup", "/login","/email/changePassword","/email/password-reset-request",
                                        "/course/**","/module/**","/email/getconnecteduser","/Projet/**","/websocket/**",
                                        "/ProjetDetail/**","/comment/**","/error/**","/image/**","/entreprise/**",
                                        "/stage/**","/Club/**","/Event/**","/gigs/**" , "files/**").permitAll()

                                .requestMatchers("/roles/get","/login/role","/change/pass"
                                        ,"/change/change-current-pass","/getconnecteduser/{id}"
                                        ,"/upload-image","/getimage/{imageName}").authenticated()

                                .requestMatchers("/user/**").hasAuthority("ROLE_admin")
                                .anyRequest().authenticated())
                .sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and().addFilterBefore(jwtRequestFilter, UsernamePasswordAuthenticationFilter.class)
                .build();
    }

    @Bean
//signup
    public PasswordEncoder passwordEncoder(){

        return  new BCryptPasswordEncoder();
    }


    @Bean
    //@Bean Annotation: This annotation is used to declare a method as a bean definition
    // method. When Spring detects methods annotated with @Bean
    // , it invokes these methods and registers the return value as a bean within the Spring application context.
    //In summary, this method is responsible for providing an AuthenticationManager bean by retrieving
    // it from the AuthenticationConfiguration object. This bean can then be used by other components
    // in the Spring application, particularly for authentication purposes, such as authenticating users during login processes.
//login
    public AuthenticationManager authenticationManager(AuthenticationConfiguration configuration) throws Exception {

        return  configuration.getAuthenticationManager();
    }
}
