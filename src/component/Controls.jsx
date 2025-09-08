const Controls = ({ limit, onLimitChange }) => {
  return (
    <div className="controls">
      <label htmlFor="limit" className="label">
        Show:
      </label>
      <select
        id="limit"
        value={limit}
        onChange={(e) => onLimitChange(Number(e.target.value))} // ✅ force number
      >
        <option value={5}>5</option>
        <option value={10}>10</option>
        <option value={20}>20</option>
        <option value={50}>50</option>
        <option value={100}>100</option>
      </select>
    </div>
  );
};

export default Controls;
