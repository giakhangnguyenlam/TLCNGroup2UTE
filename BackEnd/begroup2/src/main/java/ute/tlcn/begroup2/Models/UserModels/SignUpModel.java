package ute.tlcn.begroup2.Models.UserModels;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class SignUpModel {
    private String name;
    private String dateofbirth;
    private String email;
    private String address;
    private String gender;
    private String username;
    private String password;
    private String phone;
}
