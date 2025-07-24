import Image from "next/image";
import React from "react";

const FeaturedPost = () => (
  <section className="featured-post">
    <div className="featured-post__image">
      <Image src="/globe.svg" alt="Featured" width={300} height={180} />
    </div>
    <div className="featured-post__content">
      <span className="featured-post__category">Product Reviews</span>
      <h2 className="featured-post__title">
        Class aptent taciti sociosqu ad litora torquent per conubia nostra
      </h2>
      <p className="featured-post__desc">
        Mauris interdum felis lacus. Praesent nulla libero, vulputate ut lorem
        ac, sollicitudin fringilla velit. Quisque velit elit.
      </p>
      <button className="featured-post__button">Read More &rarr;</button>
    </div>
  </section>
);

export default FeaturedPost;
