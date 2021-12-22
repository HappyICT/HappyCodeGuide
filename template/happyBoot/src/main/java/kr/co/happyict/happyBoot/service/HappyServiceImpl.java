package kr.co.happyict.happyBoot.service;

import java.util.List;

import org.springframework.stereotype.Service;
import kr.co.happyict.happyBoot.domain.HappyVO;
import kr.co.happyict.happyBoot.mapper.HappyMapper;

@Service
public class HappyServiceImpl implements HappyService {

  private final HappyMapper mapper;

  public HappyServiceImpl(HappyMapper mapper) {
    this.mapper = mapper;
  }

  @Override
  public List<HappyVO> getList() {
    return mapper.getList();
  }

}
