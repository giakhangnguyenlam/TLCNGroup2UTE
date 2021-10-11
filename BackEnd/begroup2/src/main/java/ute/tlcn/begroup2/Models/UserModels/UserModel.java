package ute.tlcn.begroup2.Models.UserModels;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserModel {
    private int id;
    private String name;
    private String dateofbirth;
    private String email;
    private String address;
    private String gender;
    private String jwt;
}
