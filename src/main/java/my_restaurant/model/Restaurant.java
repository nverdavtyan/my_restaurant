package my_restaurant.model;

import jakarta.persistence.*;

import java.util.List;
import java.util.UUID;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import lombok.*;
import my_restaurant.user.User;

@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Restaurant {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    // @JsonIgnore
    // private String email;
    // @JsonIgnore
    // private String password;

    private String name;
    private String url;
    private String linkColor;
    private String headerImage;
    private String imagePublicId;

    private String kitchen;

    private String address;
    private String phone;

    @OneToMany(mappedBy = "restaurant", cascade = CascadeType.ALL)
    private List<Section> sections;

    @OneToMany(mappedBy = "restaurant", cascade = CascadeType.ALL)
    private List<Review> reviews;

    @OneToMany(mappedBy = "restaurant", cascade = CascadeType.ALL)
    private List<Dish> dishes;


    @JsonIgnore
    @OneToOne()
    @JoinColumn(name = "user_id")
    private User user;

}
