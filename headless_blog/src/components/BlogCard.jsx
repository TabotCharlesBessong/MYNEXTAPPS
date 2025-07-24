import Image from "next/image";
import React from "react";

const BlogCard = ({ image, category, title }) => (
  <div className="blog-card">
    <Image
      src={image}
      alt={title}
      width={300}
      height={180}
      className="blog-card__image"
    />
    <div className="blog-card__content">
      <span className="blog-card__category">{category}</span>
      <h3 className="blog-card__title">{title}</h3>
      <button className="blog-card__button">Read More &rarr;</button>
    </div>
  </div>
);

export default BlogCard;
