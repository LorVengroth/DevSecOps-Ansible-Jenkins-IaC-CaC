package devsecops.product.crud.project.dto;

import jakarta.validation.constraints.*;
import java.math.BigDecimal;

public record ProductRequest(

        String image,

        @NotBlank(message = "Title is required")
        String title,

        String subtitle,

        @NotNull(message = "Price is required")
        @DecimalMin(value = "0.0", inclusive = true)
        BigDecimal price,

        String category,

        @Min(value = 0, message = "Stock cannot be negative")
        Integer stock

) {}