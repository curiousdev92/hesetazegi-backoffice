import PageTransition from "@src/animations/PageTransition";
import DropDown from "@src/components/DropDown";
import ListWithFiltersLayout from "@src/layouts/ListWithFilters";
import { useStore } from "@src/store";
import { weblogsPageLimit } from "@src/utils/constants";
import { updateURLParams } from "@src/utils/helpers";
import { FC, JSX } from "react";
import {
  Outlet,
  useLoaderData,
  useNavigate,
  useSearchParams,
} from "react-router";

type PropTypes = {};

const RecipesLayout: FC<PropTypes> = (props) => {
  const {} = props;
  const tabItems: TabItem[] = useLoaderData();
  const total = useStore((st) => st.total);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const sortParam = searchParams.get("sort");
  const sortItems = [
    { label: "آخرین تاریخ", key: "srt-oldest" },
    { label: "اولین تاریخ", key: "srt-newest" },
  ];
  const defaultSort = sortItems.find((item) => item.key === sortParam);

  const handleSort = (item: ItemType) => {
    navigate(updateURLParams("sort", item.key));
  };

  const handleTabChange: (key?: TabItem["key"]) => void = (tab) => {
    const changedURL = updateURLParams("tab", String(tab));
    if (tab) navigate(changedURL);
  };

  const renderSource: JSX.Element = (
    <div className="w-40">
      <DropDown
        fullWidth={true}
        items={sortItems}
        onSelect={handleSort}
        size="m"
        defaultSelected={defaultSort}
      />
    </div>
  );

  return (
    <PageTransition className="h-full">
      <ListWithFiltersLayout
        onTabChange={handleTabChange}
        filters={[]}
        filterTitle="فیلتر و دسته‌بندی" /** @todo change text with translated texts */
        tabItems={tabItems}
        title="لیست دستور پخت" /** @todo change text with translated texts */
        sortComponent={renderSource}
        total={total}
        limit={weblogsPageLimit}
      >
        <Outlet />
      </ListWithFiltersLayout>
    </PageTransition>
  );
};

export default RecipesLayout;
