package my_restaurant.demo;

import io.swagger.v3.oas.annotations.Hidden;

import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping
@Hidden
public class DemoController {

  private final String easterEgg = """
                    ,---------------------------,
                    |  /---------------------\\  |
                    | |                       | |
                    | |       Welcome to      | |
                    | |     My Restaurant     | |
                    | |         API           | |
                    | |                       | |
                    |  \\_____________________/  |
                    |___________________________|
                  ,---\\_____     []     _______/------,
                /         /______________\\           /|
              /___________________________________ /  | ___
              |                                   |   |    )
              |  _ _ _                 [-------]  |   |   (
              |  o o o                 [-------]  |  /    _)_
              |__________________________________ |/     /  /
          /-------------------------------------/|      ( )/
        /-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/ /
      /-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/ /
      ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~""";

  @GetMapping(value = "/", produces = MediaType.TEXT_PLAIN_VALUE)
  public ResponseEntity<String> showEasterEgg() {
    return ResponseEntity.ok(easterEgg);
  }

}
