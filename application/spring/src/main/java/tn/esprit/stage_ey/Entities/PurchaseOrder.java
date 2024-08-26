package tn.esprit.stage_ey.Entities;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;
import java.util.List;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class PurchaseOrder {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Date orderDate;

    private Double prix;

    @ManyToOne(cascade = CascadeType.ALL,fetch = FetchType.EAGER)
    private AppUser users;


    @OneToMany(fetch = FetchType.EAGER)
    private List<Product>  products;
}
