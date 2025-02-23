import Pagination from "@src/components/Pagination";
import Tabs from "@src/components/Tabs";
import TextField from "@src/components/Textfield";
import { FC, ReactNode } from "react";

type PropTypes = {
  title: string;
  filterTitle?: string;
  tabItems: TabItem[];
  sortComponent?: ReactNode;
  total?: number;
  filters?: ReactNode;
  limit: number;
  onTabChange?: (key?: TabItem["key"]) => void;
  children: ReactNode;
  searchbar?: boolean;
  searchbarPlaceholder?: string;
  actionButton?: ReactNode;
};

const ListWithFiltersLayout: FC<PropTypes> = (props) => {
  const {
    filterTitle,
    tabItems,
    title,
    sortComponent,
    total,
    limit,
    onTabChange,
    children,
    filters,
    searchbar = true,
    searchbarPlaceholder,
    actionButton,
  } = props;

  return (
    <section className="flex h-full">
      {/* Filters */}
      {filters ? (
        <aside className="border-e border-border-secondary min-w-[272px]">
          <header className="p-6 border-b border-border-secondary text-label-primary text-title-sm">
            {filterTitle}
          </header>
          {filters}
          {/** @todo Pass filter items from props */}
        </aside>
      ) : null}

      {/* Main Content */}
      <div className="flex flex-col grow">
        <header className="sticky top-0 bg-content-primary border-b border-border-secondary pt-4">
          <div className="mb-3 px-4 justify-between flex w-full">
            <div className="flex gap-4 items-center">
              {/* Title */}
              <p className="text-label-primary text-title-md text-nowrap">
                {title}
              </p>
              {searchbar ? (
                <div className="w-96 max-w-full">
                  <TextField
                    placeholder={searchbarPlaceholder}
                    size="medium"
                    startIcon={"search-normal"}
                  />
                </div>
              ) : null}
            </div>
            {/* Action Button */}
            {actionButton ? actionButton : null}
          </div>
          <div className="flex">
            {/* Tabs */}
            <div className="grow px-4">
              {tabItems?.length ? (
                <Tabs items={tabItems} onTabChange={onTabChange} />
              ) : null}
            </div>

            {/* Sort Dropdown */}
            {sortComponent ? (
              <div className="py-2 px-4">{sortComponent}</div>
            ) : null}
          </div>
        </header>
        <div className="overflow-auto h-full max-h-full flex flex-col">
          {children}
        </div>
        {total && total > limit ? (
          <footer className="sticky bottom-0 bg-content-primary p-4 border-t border-border-secondary">
            <Pagination total={total} limit={limit} />
          </footer>
        ) : null}
      </div>
    </section>
  );
};
export default ListWithFiltersLayout;
