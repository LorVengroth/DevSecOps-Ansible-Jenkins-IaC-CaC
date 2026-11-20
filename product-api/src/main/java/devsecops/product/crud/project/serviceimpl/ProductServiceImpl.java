package devsecops.product.crud.project.serviceimpl;
import devsecops.product.crud.project.dto.ProductRequest;
import devsecops.product.crud.project.dto.ProductResponse;
import devsecops.product.crud.project.entity.Product;
import devsecops.product.crud.project.exception.ProductNotFoundException;
import devsecops.product.crud.project.repository.ProductRepository;
import devsecops.product.crud.project.service.ProductService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Service
public class ProductServiceImpl implements ProductService {

    private final ProductRepository productRepository;

    public ProductServiceImpl(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    @Override
    @Transactional
    public ProductResponse createProduct(ProductRequest request) {

        Product product = new Product();

        product.setImage(request.image());
        product.setTitle(request.title());
        product.setSubtitle(request.subtitle());
        product.setPrice(request.price());
        product.setCategory(request.category());
        product.setStock(request.stock());

        Product savedProduct = productRepository.save(product);

        return mapToResponse(savedProduct);
    }

    @Override
    @Transactional(readOnly = true)
    public List<ProductResponse> getAllProducts() {

        return productRepository.findAll()
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    @Override
    @Transactional(readOnly = true)
    public ProductResponse getProductById(UUID id) {

        Product product = findProduct(id);

        return mapToResponse(product);
    }

    @Override
    @Transactional
    public ProductResponse updateProduct(
            UUID id,
            ProductRequest request
    ) {

        Product product = findProduct(id);

        if (request.image() != null) {
            product.setImage(request.image());
        }

        if (request.title() != null) {
            product.setTitle(request.title());
        }

        if (request.subtitle() != null) {
            product.setSubtitle(request.subtitle());
        }

        if (request.price() != null) {
            product.setPrice(request.price());
        }

        if (request.category() != null) {
            product.setCategory(request.category());
        }

        if (request.stock() != null) {
            product.setStock(request.stock());
        }

        Product updatedProduct = productRepository.save(product);

        return mapToResponse(updatedProduct);
    }

    @Override
    @Transactional
    public void deleteProduct(UUID id) {

        Product product = findProduct(id);

        productRepository.delete(product);
    }

    private Product findProduct(UUID id) {

        return productRepository.findById(id)
                .orElseThrow(() ->
                        new ProductNotFoundException(
                                "Product not found with ID: " + id
                        )
                );
    }

    private ProductResponse mapToResponse(Product product) {

        return new ProductResponse(
                product.getId(),
                product.getImage(),
                product.getTitle(),
                product.getSubtitle(),
                product.getPrice(),
                product.getCategory(),
                product.getStock(),
                product.getCreatedAt()
        );
    }
}