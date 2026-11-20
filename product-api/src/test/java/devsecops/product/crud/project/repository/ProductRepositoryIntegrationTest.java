package devsecops.product.crud.project.repository;


import devsecops.product.crud.project.entity.Product;

import org.junit.jupiter.api.Test;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.testcontainers.service.connection.ServiceConnection;

import org.testcontainers.junit.jupiter.Container;
import org.testcontainers.junit.jupiter.Testcontainers;
import org.testcontainers.postgresql.PostgreSQLContainer;

import java.math.BigDecimal;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@Testcontainers
class ProductRepositoryIntegrationTest {

    @Container
    @ServiceConnection
    static PostgreSQLContainer postgres =
            new PostgreSQLContainer("postgres:17");

    @Autowired
    private ProductRepository productRepository;

    private Product createProduct() {
        Product product = new Product();
        product.setTitle("Gaming Laptop");
        product.setSubtitle("16GB RAM");
        product.setPrice(new BigDecimal("899.99"));
        product.setCategory("Electronics");
        product.setStock(10);

        return product;
    }

    @Test
    void shouldSaveAndFindProduct() {
        Product saved = productRepository.saveAndFlush(
                createProduct()
        );

        UUID id = saved.getId();

        Product found = productRepository.findById(id)
                .orElseThrow();

        assertEquals("Gaming Laptop", found.getTitle());
        assertEquals(0, new BigDecimal("899.99")
                .compareTo(found.getPrice()));
        assertNotNull(found.getId());
    }

    @Test
    void shouldDeleteProduct() {
        Product saved = productRepository.saveAndFlush(
                createProduct()
        );

        UUID id = saved.getId();

        productRepository.deleteById(id);
        productRepository.flush();

        assertFalse(productRepository.existsById(id));
    }
}