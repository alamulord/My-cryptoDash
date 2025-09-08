import { Link } from "react-router";

const NotFoundPage = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>404</h1>
      <p style={styles.message}>Oops! The page is not Found</p>
      <Link to="/" style={styles.link}>
        Go back home
      </Link>
    </div>
  );
};
const styles = {
  container: {
    textAlign: "center",
    padding: "80px 40px",
  },
  title: {
    marginBottom: "30px",
    fontSize: "70px",
    fontWeight: "bold",
  },
  message: {
    marginBottom: "20px",
    fontSize: "18px",
  },
  link: {
    textDecoration: "none",
    color: "#007bff",
    fontWeight: "bold",
  },
};
export default NotFoundPage;
