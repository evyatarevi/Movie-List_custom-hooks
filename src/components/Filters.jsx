import FilterSelect from "./FilterSelect";

const Filters = ({ filter, setFilter, sort, setSort }) => (
  <div>
    <FilterSelect
      label="Genres"
      value={filter}
      onChange={(e) => setFilter(e.target.value)}
      options={[
        { value: "All", label: "All Genres" },
        { value: "28", label: "Action" },
        { value: "35", label: "Comedy" },
        // Add other genres as needed
      ]}
    />
    <FilterSelect
      label="Sort By"
      value={sort}
      onChange={(e) => setSort(e.target.value)}
      options={[
        { value: "popularity.desc", label: "Most Popular" },
        { value: "release_date.desc", label: "Newest" },
      ]}
    />
  </div>
);

export default Filters;
