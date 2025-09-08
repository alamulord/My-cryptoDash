import { Link } from "react-router";

const Coincard = ({ coin }) => {
  return (
    <Link to={`/coin/${coin.id}`}>
      <div className="coin-card">
        <div className="coin-header">
          <img src={coin.image} alt={coin.name} className="coin-image" />
          <div>
            <h1>{coin.name}</h1>
            <p className="symbol">{coin.symbol.toUpperCase()}</p>
          </div>
        </div>
        <p className="price">Price: ${coin.current_price.toLocaleString()}</p>
        <p
          className={
            coin.price_change_percentage_24h >= 0 ? "positive" : "negative"
          }
        >
          24h Price Change:{" "}
          {coin.price_change_percentage_24h?.toFixed(2) ?? "N/A"}%
        </p>
        <p>Market Cap: {coin.market_cap.toLocaleString()}</p>
      </div>
    </Link>
  );
};

export default Coincard;
