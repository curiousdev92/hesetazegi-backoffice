import EmptyStateImage from "@src/assets/images/empty-state.png";
import EmptyState from "@src/components/EmptyState";
import Pagination from "@src/components/Pagination";
import Spinner from "@src/components/Spinner";
import Tabs from "@src/components/Tabs";
import TextField from "@src/components/Textfield";
import { FC, ReactNode } from "react";

type PropTypes = {
  title: string;
  filterTitle: string;
  tabItems: TabItem[];
  sortComponent: ReactNode;
  total?: number;
  items: ReactNode[];
  filters: ReactNode[];
  limit: number;
  loading: boolean;
  onTabChange?: (key?: TabItem["key"]) => void;
};

const ListWithFiltersLayout: FC<PropTypes> = (props) => {
  const {
    filterTitle,
    tabItems,
    title,
    sortComponent,
    total,
    items,
    limit,
    loading,
    onTabChange,
  } = props;

  return (
    <section className="flex h-full">
      {/* Filters */}
      <aside className="border-e border-border-secondary min-w-[272px]">
        <header className="p-6 border-b border-border-secondary text-label-primary text-title-sm">
          {filterTitle}
        </header>
        <div className="flex flex-col gap-3 py-3"></div>
        {/** @todo Pass filter items from props */}
      </aside>

      {/* Main Content */}
      <div className="flex flex-col grow">
        <header className="sticky top-0 bg-content-primary border-b border-border-secondary pt-4">
          <div className="mb-3 px-4 justify-between flex w-full">
            <div className="flex gap-4 items-center">
              {/* Title */}
              <p className="text-label-primary text-title-md">{title}</p>
              <TextField
                id={"main-searchbar"}
                size={"m"}
                type={"text"}
                startIcon="search-normal"
                placeholder="جستجو دستورپخت..."
                clear /** @bug This prop doesn't work properly */
              />
            </div>
            {/* Action Button */}
            <button>دستور پخت جدید</button> {/** @todo Change with translate */}
          </div>
          <div className="flex">
            {/* Tabs */}
            <div className="grow px-4">
              <Tabs items={tabItems} onTabChange={onTabChange} />
            </div>

            {/* Sort Dropdown */}
            <div className="py-2 px-4">{sortComponent}</div>
          </div>
        </header>
        <div className="overflow-auto h-full max-h-full flex flex-col">
          {loading ? (
            <div className="grid place-items-center h-full">
              <Spinner size="m" />
            </div>
          ) : items.length === 0 ? (
            <div className="grid place-items-center h-full">
              <EmptyState
                className="self-center"
                size={"l"}
                description={"داده ای برای نمایش وجود ندارد"}
                imgSrc={EmptyStateImage}
              />
            </div>
          ) : (
            items
          )}
        </div>
        <footer className="sticky bottom-0 bg-content-primary p-4 border-t border-border-secondary">
          {total ? <Pagination total={total} limit={limit} /> : null}
        </footer>
      </div>
    </section>
  );
};
export default ListWithFiltersLayout;
