package kr.co.happyict.mapper;

import java.util.List;
import org.apache.ibatis.annotations.Mapper;
import kr.co.happyict.domain.HappyVO;

@Mapper
public interface HappyMapper {

  List<HappyVO> getList();
}
