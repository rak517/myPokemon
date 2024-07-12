package com.board.Service;

import com.board.domain.Member;
import com.board.repository.MemberRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class MemberServiceImpl implements MemberService {
    @Autowired
    private MemberRepository repository;

    @Override
    @Transactional
    public void register(Member member) throws Exception {
        repository.save(member);
    }

    @Override
    @Transactional(readOnly = true)
    public Member read(String id) throws Exception {
        return repository.findById(id).get();
    }

    @Override
    @Transactional
    public void modify(Member member) throws Exception {
        Member memberEntity = repository.findById(member.getId()).get();
        memberEntity.setPassword(member.getPassword());
        memberEntity.setName(member.getName());
        repository.save(memberEntity);
    }
    @Override
    @Transactional
    public void remove(String id) throws Exception {
        repository.deleteById(id);
    }

    @Override
    @Transactional(readOnly = true)
    public List<Member> list() throws Exception {
        return repository.findAll();
    }

    public Optional<Member> findById(String id) {
        return repository.findById(id);
    }

    public boolean checkPassword(Member member, String password) {
        return member != null && member.getPassword().equals(password);
    }
}
