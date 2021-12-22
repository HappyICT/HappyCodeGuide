package kr.co.happyict.happyBoot.mapper;

import java.util.List;
import org.apache.ibatis.annotations.Mapper;
import kr.co.happyict.happyBoot.domain.HappyVO;

@Mapper
public interface HappyMapper {

  List<HappyVO> getList();
}
