package ute.tlcn.begroup2.Models.UserModels;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class GuestSignupModel {
    private String name;
    private String phone;
    private String address;
}
