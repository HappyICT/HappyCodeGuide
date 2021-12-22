package kr.co.happyict.happyBootGradle.mapper;

import java.util.List;
import org.apache.ibatis.annotations.Mapper;
import kr.co.happyict.happyBootGradle.domain.HappyVO;

@Mapper
public interface HappyMapper {

  List<HappyVO> getList();
}
