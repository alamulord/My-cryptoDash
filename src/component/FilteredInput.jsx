const FilteredInput = ({ filter, onSetFilter }) => {
  return (
    <div className="filter">
      <input
        value={filter}
        type="text"
        placeholder="Filter your desired coin out..."
        onChange={(e) => onSetFilter(e.target.value)}
      />
    </div>
  );
};

export default FilteredInput;
