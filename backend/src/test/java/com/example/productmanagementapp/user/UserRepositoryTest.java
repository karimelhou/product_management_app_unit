package com.example.productmanagementapp.user;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertThrows;

@DataJpaTest
class UserRepositoryTest {

    @Autowired
    private UserRepository userRepository;

    private final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

    @Test
    void findByUsernameReturnsSavedUser() {
        User user = new User("alice", encoder.encode("password"), Role.USER);
        userRepository.save(user);

        assertThat(userRepository.findByUsername("alice")).isPresent();
        assertThat(userRepository.existsByUsername("alice")).isTrue();
    }

    @Test
    void duplicateUsernamesNotAllowed() {
        User first = new User("bob", encoder.encode("password"), Role.USER);
        userRepository.saveAndFlush(first);

        User duplicate = new User("bob", encoder.encode("password"), Role.USER);
        assertThrows(DataIntegrityViolationException.class, () -> userRepository.saveAndFlush(duplicate));
    }
}
