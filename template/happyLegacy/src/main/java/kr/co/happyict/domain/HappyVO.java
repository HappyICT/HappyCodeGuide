package kr.co.happyict.domain;

import java.util.Date;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class HappyVO {

  private int empNo;
  private Date birthDate;
  private String firstName;
  private String lastName;
  private char gender;
  private Date hireDate;
}