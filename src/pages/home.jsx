import Coincard from "../component/CoinCard";
import Control from "../component/Controls";
import FilteredInput from "../component/FilteredInput";
import SortSelector from "../component/SortSelector";
import Spinners from "../component/Spinner";

const HomePage = ({
  coins,
  filter,
  setFilter,
  limit,
  setLimit,
  loading,
  error,
  sortBy,
  setSortBy,
}) => {
  const filterChange = coins
    .filter((coin) => {
      return (
        coin.name.toLowerCase().includes(filter.toLocaleLowerCase()) ||
        coin.symbol.toLowerCase().includes(filter.toLocaleLowerCase())
      );
    })
    .slice()
    .sort((a, b) => {
      switch (sortBy) {
        case "market_cap_desc":
          return b.market_cap - a.market_cap;
        case "market_cap_asc":
          return a.market_cap - b.market_cap;
        case "price_desc":
          return b.current_price - a.current_price;
        case "price_asc":
          return a.current_price - b.current_price;
        case "change_desc":
          return b.price_change_percentage_24h - a.price_change_percentage_24h;
        case "change_asc":
          return a.price_change_percentage_24h - b.price_change_percentage_24h;
      }
    });
  return (
    <div>
      <h1>🚀Crypto Dash</h1>

      {loading && <Spinners color="white" />}
      {error && <div className="error">{error}</div>}
      <div className="top-controls">
        <FilteredInput filter={filter} onSetFilter={setFilter} />
        <Control limit={limit} onLimitChange={setLimit} />
        <SortSelector sortBy={sortBy} onSortChange={setSortBy} />
      </div>

      {!loading && !error && (
        <main className="grid">
          {filterChange.length > 0 ? (
            filterChange.map((coin) => <Coincard key={coin.id} coin={coin} />)
          ) : (
            <p>There is no matching coin</p>
          )}
        </main>
      )}
    </div>
  );
};

export default HomePage;
