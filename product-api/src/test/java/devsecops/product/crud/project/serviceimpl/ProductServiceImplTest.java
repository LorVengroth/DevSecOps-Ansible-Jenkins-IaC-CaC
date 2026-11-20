package devsecops.product.crud.project.serviceimpl;


import devsecops.product.crud.project.dto.ProductRequest;
import devsecops.product.crud.project.dto.ProductResponse;
import devsecops.product.crud.project.entity.Product;
import devsecops.product.crud.project.exception.ProductNotFoundException;
import devsecops.product.crud.project.repository.ProductRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class ProductServiceImplTest {

    @Mock
    private ProductRepository productRepository;

    @InjectMocks
    private ProductServiceImpl productService;

    private Product product;
    private UUID productId;

    @BeforeEach
    void setUp() {
        productId = UUID.randomUUID();

        product = new Product();
        product.setId(productId);
        product.setTitle("Gaming Laptop");
        product.setPrice(new BigDecimal("899.99"));
        product.setStock(10);
    }

    @Test
    void shouldCreateProductSuccessfully() {
        ProductRequest request = new ProductRequest(
                "https://example.com/laptop.jpg",
                "Gaming Laptop",
                "16GB RAM",
                new BigDecimal("899.99"),
                "Electronics",
                10
        );

        when(productRepository.save(any(Product.class)))
                .thenAnswer(invocation -> invocation.getArgument(0));

        ProductResponse response = productService.createProduct(request);

        assertEquals("Gaming Laptop", response.title());
        assertEquals(new BigDecimal("899.99"), response.price());

        verify(productRepository, times(1)).save(any(Product.class));
    }

    @Test
    void shouldGetProductByIdSuccessfully() {
        when(productRepository.findById(productId))
                .thenReturn(Optional.of(product));

        ProductResponse response = productService.getProductById(productId);

        assertEquals(productId, response.id());
        assertEquals("Gaming Laptop", response.title());

        verify(productRepository).findById(productId);
    }

    @Test
    void shouldDeleteProductSuccessfully() {
        when(productRepository.findById(productId))
                .thenReturn(Optional.of(product));

        productService.deleteProduct(productId);

        verify(productRepository).delete(product);
    }

    @Test
    void shouldGetAllProducts() {
        when(productRepository.findAll())
                .thenReturn(List.of(product));

        List<ProductResponse> results =
                productService.getAllProducts();

        assertEquals(1, results.size());
        assertEquals("Gaming Laptop", results.get(0).title());

        verify(productRepository).findAll();
    }

    @Test
    void shouldUpdateProductPrice() {
        ProductRequest request = new ProductRequest(
                null,
                null,
                null,
                new BigDecimal("799.99"),
                null,
                null
        );

        when(productRepository.findById(productId))
                .thenReturn(Optional.of(product));

        when(productRepository.save(any(Product.class)))
                .thenAnswer(invocation -> invocation.getArgument(0));

        ProductResponse response =
                productService.updateProduct(productId, request);

        assertEquals(
                new BigDecimal("799.99"),
                response.price()
        );

        assertEquals("Gaming Laptop", response.title());
        verify(productRepository).save(product);
    }

    @Test
    void shouldThrowExceptionWhenProductNotFound() {
        when(productRepository.findById(productId))
                .thenReturn(Optional.empty());

        assertThrows(
                ProductNotFoundException.class,
                () -> productService.getProductById(productId)
        );

        verify(productRepository).findById(productId);
    }
}

