package kr.co.happyict.service;

import java.util.List;
import kr.co.happyict.domain.HappyVO;
import kr.co.happyict.mapper.HappyMapper;
import org.springframework.stereotype.Service;

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
