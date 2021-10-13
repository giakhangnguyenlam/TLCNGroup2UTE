package ute.tlcn.begroup2.ObjectMapper;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import ute.tlcn.begroup2.Entities.UserEntity;
import ute.tlcn.begroup2.Models.UserModels.UserModel;

@Component
public class UserMapper {
    
    private DateMapper dateMapper;

    @Autowired
    public UserMapper(DateMapper dateMapper) {
        this.dateMapper = dateMapper;
    }
    

    public UserModel convertUserEntityToUserModel(UserEntity userEntity){
        UserModel userModel = new UserModel(userEntity.getId(), 
        userEntity.getName(), 
        dateMapper.convertDateToString(userEntity.getDateofbirth()), 
        userEntity.getEmail(),
        userEntity.getAddress(), 
        userEntity.getEmail(),
        "",
        userEntity.getGrantedAuthority());
        
        return userModel;
    }

}
