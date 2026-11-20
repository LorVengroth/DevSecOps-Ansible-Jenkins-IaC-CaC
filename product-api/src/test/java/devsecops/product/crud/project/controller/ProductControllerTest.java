package devsecops.product.crud.project.controller;

import devsecops.product.crud.project.dto.ProductRequest;
import devsecops.product.crud.project.dto.ProductResponse;
import devsecops.product.crud.project.exception.ProductNotFoundException;
import devsecops.product.crud.project.service.ProductService;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.webmvc.test.autoconfigure.WebMvcTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;
import tools.jackson.databind.ObjectMapper;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(ProductController.class)
class ProductControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockitoBean
    private ProductService productService;

    private ProductResponse sampleProduct(UUID id) {
        return new ProductResponse(
                id,
                "https://example.com/product.jpg",
                "Gaming Laptop",
                "16GB RAM",
                new BigDecimal("899.99"),
                "Electronics",
                10,
                LocalDateTime.now()
        );
    }

    @Test
    void shouldGetAllProducts() throws Exception {
        UUID id = UUID.randomUUID();

        when(productService.getAllProducts())
                .thenReturn(List.of(sampleProduct(id)));

        mockMvc.perform(get("/api/products"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].title").value("Gaming Laptop"))
                .andExpect(jsonPath("$[0].price").value(899.99));
    }

    @Test
    void shouldCreateProduct() throws Exception {
        UUID id = UUID.randomUUID();

        ProductRequest request = new ProductRequest(
                "https://example.com/product.jpg",
                "Gaming Laptop",
                "16GB RAM",
                new BigDecimal("899.99"),
                "Electronics",
                10
        );

        when(productService.createProduct(any(ProductRequest.class)))
                .thenReturn(sampleProduct(id));

        mockMvc.perform(post("/api/products")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.title").value("Gaming Laptop"));
    }

    @Test
    void shouldUpdateProduct() throws Exception {
        UUID id = UUID.randomUUID();

        ProductRequest request = new ProductRequest(
                null, null, null,
                new BigDecimal("799.99"),
                null, null
        );

        ProductResponse updated = new ProductResponse(
                id, null, "Gaming Laptop", null,
                new BigDecimal("799.99"),
                null, 10, LocalDateTime.now()
        );

        when(productService.updateProduct(eq(id), any(ProductRequest.class)))
                .thenReturn(updated);

        mockMvc.perform(patch("/api/products/{id}", id)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.price").value(799.99));
    }

    @Test
    void shouldDeleteProduct() throws Exception {
        UUID id = UUID.randomUUID();

        mockMvc.perform(delete("/api/products/{id}", id))
                .andExpect(status().isNoContent());

        verify(productService).deleteProduct(id);
    }

    @Test
    void shouldReturn404WhenProductNotFound() throws Exception {
        UUID id = UUID.randomUUID();

        when(productService.getProductById(id))
                .thenThrow(new ProductNotFoundException("Product not found"));

        mockMvc.perform(get("/api/products/{id}", id))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.message").value("Product not found"));
    }
}