package com.board.domain;


import com.fasterxml.jackson.annotation.JsonInclude;
import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "jpamember")
@JsonInclude(JsonInclude.Include.NON_NULL)
public class Member {
    @Id
    //@GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "name")
    private String name;
    @Column(name = "password")
    private String password;
    @Column(name = "id")
    private String id;
    @Column(name = "email")
    private String email;

}
