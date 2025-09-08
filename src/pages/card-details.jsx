import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import Spinners from "../component/Spinner";
import Chart from "../component/Chart";
const API_URL = import.meta.env.VITE_API_URL_COIN;

const CardDetailPage = () => {
  const { id } = useParams();
  const [coin, setCoin] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCoin = async () => {
      try {
        const res = await fetch(`${API_URL}/${id}`);
        if (!res.ok) throw new Error("Failed fetching data");
        const data = await res.json();
        // console.log(data);
        setCoin(data);
      } catch (err) {
        console.log(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchCoin();
  }, [id]);

  return (
    <div className="coin-details-container">
      <Link to="/">Go back Home</Link>
      <h1 className="coin-details-title">
        {coin ? `${coin.name} (${coin.symbol.toUpperCase()})` : "Coin Details"}
      </h1>
      {loading && <Spinners />}
      {error && <div className="error">{error}</div>}
      {!loading && !error && (
        <>
          <img
            src={coin.image.large}
            alt={coin.name}
            className="coin-details-image"
          />

          <p>{coin.description.en.split(". ")[0] + "."}</p>
          <div className="coin-details-info">
            <h4>Rank: #{coin.market_cap_rank}</h4>
            <h4>
              Current Price: $
              {coin.market_data.current_price.usd.toLocaleString()}
            </h4>
            <h4>
              Market Cap: ${coin.market_data.market_cap.usd.toLocaleString()}
            </h4>
            <h4>
              24h Change (High): $
              {coin.market_data.high_24h.usd.toLocaleString()}
            </h4>
            <h4>
              24h Change (Low): ${coin.market_data.low_24h.usd.toLocaleString()}
            </h4>
            <h4>
              24h Price Change: ${coin.market_data.price_change_24h.toFixed(2)}{" "}
              (${coin.market_data.price_change_percentage_24h.toFixed(2)}%)
            </h4>
            <h4>
              Circulating Supply:{" "}
              {coin.market_data.circulating_supply.toLocaleString()}
            </h4>
            <h4>
              Total Supply:{" "}
              {coin.market_data.total_supply?.toLocaleString() || "N/A"}
            </h4>
            <h4>
              All Time-High: ${coin.market_data.ath.usd.toLocaleString()} on{""}{" "}
              {new Date(coin.market_data.ath.usd).toLocaleString()}
            </h4>
            <h4>
              All Time-Low: ${coin.market_data.atl.usd.toLocaleString()} on{""}{" "}
              {new Date(coin.market_data.atl.usd).toLocaleString()}
            </h4>
            <h4>
              Last Updated: {new Date(coin.last_updated).toLocaleString()}
            </h4>
            <div className="coin-details-links">
              <Chart coinid={coin.id} />
              <p>
                {coin.links.homepage[0] && (
                  <a
                    href={coin.links.homepage[0]}
                    target="_blank"
                    rel="noopener"
                  >
                    Website
                  </a>
                )}
              </p>
              <p>
                {coin.links.blockchain_site[0] && (
                  <a
                    href={coin.links.blockchain_site[0]}
                    target="_blank"
                    rel="noopener"
                  >
                    Blockchain Explorer
                  </a>
                )}
              </p>
              {coin.categories.length > 0 && (
                <p>Categories: {coin.categories.join(", ")}</p>
              )}
            </div>
          </div>
        </>
      )}
      {!loading && !error && <p>No Details is found!</p>}
    </div>
  );
};

export default CardDetailPage;
