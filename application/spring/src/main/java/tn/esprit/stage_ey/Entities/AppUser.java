package tn.esprit.stage_ey.Entities;


import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Table(name = "sec_users")
@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class AppUser  {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private  String name;
    private  String password;
    private  String email;


    @OneToOne(cascade = CascadeType.ALL)
    ImageModel image;

    @ManyToMany(fetch = FetchType.EAGER)//fetch the roles collection whenever an AppUser is loaded. This ensures that the roles are loaded along with the AppUser entity and prevents the LazyInitializationException
    @JoinTable(name="sec_user_roles"
            ,joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name="role_id"))
    @OrderColumn(name="id")
    private Set<Role> roles =new HashSet<>();//is a collection that does not allow duplicate elements

    @OneToOne(mappedBy = "user", cascade = CascadeType.ALL,fetch = FetchType.LAZY)
    private Cart cart;

    @OneToMany(mappedBy = "users")
    @JsonIgnore
    private List<PurchaseOrder> purchaseOrders;


}


