package tn.esprit.stage_ey.Entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "sec_roles")
public class Role {


        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private Long id ;

        private String name;



}
