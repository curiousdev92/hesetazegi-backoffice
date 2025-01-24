import { ChangeEventHandler, FC } from "react";
import { useSearchParams } from "react-router";

type PropTypes = { items: ItemType[] };

const FilterMenu: FC<PropTypes> = (props) => {
  const { items } = props;
  const [searchParams, setSearchParams] = useSearchParams();
  const filter = searchParams.get("filter") || "";
  const filters = filter ? filter.split(",") : [];
  const currentFilters = filter?.split(",") || [];

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const { checked, id } = e.currentTarget;

    let updatedFilters;
    if (checked) {
      // Add the value if it's not already in the filters
      updatedFilters = [...filters, id];
    } else {
      // Remove the value if it's in the filters
      updatedFilters = filters.filter((item) => item !== id);
    }

    // Update the search params
    if (updatedFilters.length > 0) {
      searchParams.set("filter", updatedFilters.join(","));
    } else {
      searchParams.delete("filter");
    }
    setSearchParams(searchParams);
  };

  return (
    <ul className="flex flex-col gap-1 max-h-44 overflow-auto">
      {items.map(({ label, key }) => (
        <label
          key={key}
          className="flex gap-2 py-1 px-4 items-center hover:bg-gray-50 cursor-pointer"
        >
          <span className="grow text-label-secondary text-body-md">
            {label}
          </span>
          <input
            type="checkbox"
            name={key}
            id={key}
            onChange={handleChange}
            defaultChecked={currentFilters.includes(key)}
            className="size-6 hidden peer"
          />
          <div
            className={`size-5 rounded-md m-0.5 ring-[1.5px] [&>svg]:hidden ring-gray-300 peer-checked:ring-primary-500 peer-checked:bg-primary-500 grid place-items-center peer-checked:[&>svg]:block`}
          >
            <svg
              width="10"
              height="8"
              viewBox="0 0 10 8"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1.41211 3.96887L3.95911 6.51587L9.06211 1.42188"
                stroke="white"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </label>
      ))}
    </ul>
  );
};

export default FilterMenu;
