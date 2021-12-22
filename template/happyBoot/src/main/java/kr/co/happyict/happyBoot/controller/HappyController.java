package kr.co.happyict.happyBoot.controller;

import java.util.List;
import kr.co.happyict.happyBoot.domain.HappyVO;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import kr.co.happyict.happyBoot.service.HappyService;

@Controller
public class HappyController {

  private final HappyService service;

  public HappyController(HappyService service) {
    this.service = service;
  }

  @RequestMapping("/")
  public String index(Model model) {

    List<HappyVO> list = service.getList();
    model.addAttribute("list", list);

    return "index";
  }
}