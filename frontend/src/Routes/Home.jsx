import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="home">
      <Link to="/login">
        <h3 >Login Page</h3>
      </Link>
      <Link to="/dashboard">
        <h3>Home</h3>
      </Link>
    </div>
  );
}
export default Home;
