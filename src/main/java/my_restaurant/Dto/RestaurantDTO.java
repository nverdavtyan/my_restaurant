package my_restaurant.Dto;

import java.util.UUID;

import lombok.Data;

@Data
public class RestaurantDTO {
    private UUID id ;
    private String name;
    private String url;
    private String linkColor;
    private String headerImage;
    private String address;
    private String phone;
}
