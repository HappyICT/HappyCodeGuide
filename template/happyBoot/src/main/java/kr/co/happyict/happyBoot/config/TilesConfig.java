package kr.co.happyict.happyBoot.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.view.UrlBasedViewResolver;
import org.springframework.web.servlet.view.tiles3.TilesConfigurer;
import org.springframework.web.servlet.view.tiles3.TilesView;

@Configuration
public class TilesConfig {

  @Bean
  public UrlBasedViewResolver tilesViewResolver() {
    UrlBasedViewResolver tilesViewResolver = new UrlBasedViewResolver();

    tilesViewResolver.setViewClass(TilesView.class);

    return tilesViewResolver;
  }

  @Bean
  public TilesConfigurer tilesConfigurer() {
    TilesConfigurer tilesConfigurer = new TilesConfigurer();

    tilesConfigurer.setDefinitions("/WEB-INF/tiles.xml");

    return tilesConfigurer;
  }
}