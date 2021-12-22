package kr.co.happyict.happyBootGradle.service;

import java.util.List;

import org.springframework.stereotype.Service;
import kr.co.happyict.happyBootGradle.domain.HappyVO;
import kr.co.happyict.happyBootGradle.mapper.HappyMapper;

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
