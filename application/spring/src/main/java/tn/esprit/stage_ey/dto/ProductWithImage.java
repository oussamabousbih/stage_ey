package tn.esprit.stage_ey.dto;

import tn.esprit.stage_ey.Entities.Product;

public class ProductWithImage {
    private Product product;
    private byte[] image;

    public ProductWithImage(Product product, byte[] image) {
        this.product = product;
        this.image = image;
    }

    public Product getProduct() {
        return product;
    }

    public void setProduct(Product product) {
        this.product = product;
    }

    public byte[] getImage() {
        return image;
    }

    public void setImage(byte[] image) {
        this.image = image;
    }
}
