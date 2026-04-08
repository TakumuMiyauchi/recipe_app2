package io.github.tm.recipeApp.entity;

import jakarta.persistence.*;

import lombok.Data;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Data
@Entity
@Table(name = "recipes")
public class Recipe {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "recipe_id")
    private Long recipeId;

    @Column(name = "user_id", nullable = false)
    private Long userId;

    @Column(name = "registered_at", nullable = false)
    private LocalDateTime registeredAt;

    @Column(name = "recipe_name", nullable = false ,length = 200)
    private String recipeName;

    @Column(name = "recipe_url", length = 2048)
    private String recipeUrl;

    @Column(name = "image_path", nullable = false, length = 255)
    private String imagePath;

    @Column(name = "recipe_count", nullable = false)
    private Integer recipeCount;

    @Column(name = "note", columnDefinition = "TEXT")
    private String note;

//    中間テーブルと結合
    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
            name = "recipe_categories",
            joinColumns = @JoinColumn(name = "recipe_id"),
            inverseJoinColumns = @JoinColumn(name = "category_id")
    )
    private List<Category> categories = new ArrayList<>();


    // Entity側でのnull対応
    @PrePersist
    public void prePersist() {
        if (registeredAt == null) {
            registeredAt = LocalDateTime.now();
        }
        if (imagePath == null) {
            imagePath = "/thumbnail_images/default.svg";
        }
    }


}
