package com.board.controller;


import com.board.Service.MemberService;
import com.board.domain.Member;
import lombok.extern.java.Log;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@Log
@RestController
@RequestMapping("/member")
public class MemberController {
    @Autowired
    private MemberService service;

    @PostMapping("/register")
    public void register(@RequestBody Member member) throws Exception {
        service.register(member);
        log.info(member.toString());
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody Member member) {
        Member findMember = service.findById(member.getId()).get();

        if (findMember != null && findMember.getPassword().equals(member.getPassword())) {
            return ResponseEntity.ok("success");
        } else {
            return ResponseEntity.ok("fail");
        }
    }
    @PostMapping("/modify")
    public void modify(@RequestBody Member member) throws Exception {
        service.modify(member);
    }

    @PostMapping("/remove")
    public void remove(@RequestBody Member member) throws Exception {
        service.remove(member.getId());
    }

    @PostMapping("/list")
    public void list() throws Exception {
        service.list();
    }

}

