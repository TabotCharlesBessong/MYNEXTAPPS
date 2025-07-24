import Image from "next/image";
import Link from "next/link";
import React from "react";
import styles from "../app/Home.module.scss";

const categorySlugMap = {
  "Opinions": "opinions-post",
  "Product Reviews": "product-reviews-post",
  "Travel Guides": "travel-guides-post",
};

const BlogCard = ({ image, category, title }) => {
  const slug = categorySlugMap[category] || "default-post";
  return (
    <Link href={`/${slug}`} className={styles["blog-card"]}>
      <div>
        <Image
          src={image}
          alt={title}
          width={300}
          height={180}
          className={styles["blog-card__image"]}
        />
        <div className={styles["blog-card__content"]}>
          <span className={`${styles["blog-card__category"]} ${category.replace(/\s/g, "")}`}>
            {category}
          </span>
          <h3 className={styles["blog-card__title"]}>{title}</h3>
          <span className={styles["blog-card__button"]}>Read More &rarr;</span>
        </div>
      </div>
    </Link>
  );
};

export default BlogCard