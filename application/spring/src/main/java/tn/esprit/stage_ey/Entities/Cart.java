package tn.esprit.stage_ey.Entities;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Cart {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(cascade = CascadeType.ALL)
    @JsonIgnore
    private AppUser user;

    @OneToMany(mappedBy = "cartt", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<CartItem> items;

    // Getters and setters
}
