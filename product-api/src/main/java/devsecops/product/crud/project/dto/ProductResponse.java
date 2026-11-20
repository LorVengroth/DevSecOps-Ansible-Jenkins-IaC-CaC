package devsecops.product.crud.project.dto;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.UUID;

public record ProductResponse(
        UUID id,
        String image,
        String title,
        String subtitle,
        BigDecimal price,
        String category,
        Integer stock,
        LocalDateTime createdAt
) {}