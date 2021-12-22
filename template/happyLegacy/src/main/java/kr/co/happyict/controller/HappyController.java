package kr.co.happyict.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import kr.co.happyict.service.HappyService;

@Controller
public class HappyController {

  private final HappyService service;

  public HappyController(HappyService service) {
    this.service = service;
  }

  @RequestMapping("/")
  public String index(Model model) {

    model.addAttribute("list", service.getList());

    return "index";
  }

}
