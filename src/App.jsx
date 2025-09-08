import { useState, useEffect } from "react";
import { Route, Routes } from "react-router";
import HomePage from "./pages/home";
import Header from "./component/Header";
import AboutPage from "./pages/about";
import NotFoundPage from "./pages/notFound";
import CardDetailPage from "./pages/card-details";

const API_URL = import.meta.env.VITE_API_URL;

const App = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [limit, setLimit] = useState(10);
  const [filter, setFilter] = useState("");
  const [sortBy, setSortBy] = useState("market_cap_desc");

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch(
          `${API_URL}&per_page=${limit}&page=1&sparkline=false`
        );
        // console.log(response);
        if (!response.ok) throw new Error("Failed in fetching data");
        const data = await response.json();
        setCoins(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    getData();
    // fetch(API_URL)
    //   .then((res) => {
    //     if (!res.ok) {
    //       throw new Error("Failed while fetching Data");
    //     }
    //     return res.json();
    //   })
    //   .then((data) => {
    //     console.log(data);
    //     setCoin(data);
    //     setLoading(false);
    //   })
    //   .catch((err) => {
    //     setLoading(false);
    //     setError(err.message);
    //   });
  }, [limit]);

  return (
    <>
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            <HomePage
              coins={coins}
              filter={filter}
              setFilter={setFilter}
              loading={loading}
              error={error}
              limit={limit}
              setLimit={setLimit}
              sortBy={sortBy}
              setSortBy={setSortBy}
            />
          }
        />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/coin/:id" element={<CardDetailPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
};

export default App;
