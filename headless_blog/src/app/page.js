import Header from "../components/Header";
import FeaturedPost from "../components/FeaturedPost";
import BlogCard from "../components/BlogCard";
import Footer from "../components/Footer";
import styles from "./Home.module.scss";

const posts = [
  {
    image: "/window.svg",
    category: "Opinions",
    title: "Class aptent taciti sociosqu ad litora torquent per conubia",
  },
  {
    image: "/file.svg",
    category: "Product Reviews",
    title: "Class aptent taciti sociosqu ad litora torquent per conubia",
  },
  {
    image: "/vercel.svg",
    category: "Travel Guides",
    title: "Class aptent taciti sociosqu ad litora torquent per conubia",
  },
];

const Home = () => {
  return (
    <div className={styles.container}>
      <Header />
      <main className={styles.main} >
        <FeaturedPost />
        <section className={styles.blogList}>
          {posts.map((post, idx) => (
            <BlogCard key={idx} {...post} />
          ))}
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Home;
