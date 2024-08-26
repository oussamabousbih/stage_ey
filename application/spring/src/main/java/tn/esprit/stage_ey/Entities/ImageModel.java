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
public class ImageModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private String type;
    //image bytes can have large lengths so we specify a value
    //which is more than the default length for picByte column
    @Lob
    @Column(name = "pic_byte", columnDefinition = "LONGBLOB")
    private byte[] picByte;

    @OneToOne(cascade = CascadeType.ALL)
    private Product product;

    public ImageModel(String name, String type, byte[] picByte) {
        this.name = name;
        this.type = type;
        this.picByte = picByte;
    }

}
