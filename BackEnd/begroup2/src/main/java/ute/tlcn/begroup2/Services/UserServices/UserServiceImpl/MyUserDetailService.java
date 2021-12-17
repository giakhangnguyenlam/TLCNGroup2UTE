package ute.tlcn.begroup2.Services.UserServices.UserServiceImpl;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import ute.tlcn.begroup2.Entities.UserEntity;
import ute.tlcn.begroup2.Models.UserModels.UserDetailsModel;
import ute.tlcn.begroup2.Repositories.UserRepository;

@Service
public class MyUserDetailService implements UserDetailsService {

    private UserRepository userRepository;

    @Autowired
    public MyUserDetailService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }


    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<UserEntity> opUserEntity = userRepository.findByUsername(username);
        if(opUserEntity.isPresent()){
            return new UserDetailsModel(opUserEntity.get());
        }
        throw new UsernameNotFoundException(username);
    }
    
}
