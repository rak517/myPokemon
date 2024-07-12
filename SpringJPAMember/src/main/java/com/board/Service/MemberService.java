package com.board.Service;

import com.board.domain.Member;

import java.util.List;
import java.util.Optional;

public interface MemberService {
    public void register(Member member) throws Exception;
    public Member read(String id) throws Exception;
    public void modify(Member member) throws Exception;
    public void remove(String id) throws Exception;
    public List<Member> list() throws Exception;
    Optional<Member> findById(String id);
}
