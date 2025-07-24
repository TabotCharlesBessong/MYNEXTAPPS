import Header from "../../components/Header";
import Footer from "../../components/Footer";
import styles from "../Home.module.scss";

const mockPosts = [
  {
    slug: "opinions-post",
    image: "/window.svg",
    category: "Opinions",
    title: "Class aptent taciti sociosqu ad litora torquent per conubia",
    content: "Full content for Opinions post goes here...",
  },
  {
    slug: "product-reviews-post",
    image: "/file.svg",
    category: "Product Reviews",
    title: "Class aptent taciti sociosqu ad litora torquent per conubia",
    content: "Full content for Product Reviews post goes here...",
  },
  {
    slug: "travel-guides-post",
    image: "/vercel.svg",
    category: "Travel Guides",
    title: "Class aptent taciti sociosqu ad litora torquent per conubia",
    content: "Full content for Travel Guides post goes here...",
  },
];

export default function BlogDetail({ params }) {
  const post = mockPosts.find((p) => p.slug === params.slug);

  if (!post) {
    return (
      <div className={styles.container}>
        <Header />
        <main className={styles.main}>
          <h2>Post not found</h2>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <Header />
      <main className={styles.main}>
        <article>
          <img
            src={post.image}
            alt={post.title}
            style={{ width: "100%", maxWidth: 600, borderRadius: 12 }}
          />
          <span className={styles["blog-card__category"]}>{post.category}</span>
          <h1>{post.title}</h1>
          <p>{post.content}</p>
        </article>
      </main>
      <Footer />
    </div>
  );
}
