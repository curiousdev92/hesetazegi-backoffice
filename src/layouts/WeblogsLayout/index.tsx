import PageTransition from "@src/animations/PageTransition";
import DropDown from "@src/components/DropDown";
import ListWithFiltersLayout from "@src/layouts/ListWithFilters";
import { useStore } from "@src/store";
import { weblogsPageLimit } from "@src/utils/constants";
import { formatNumber, updateURLParams } from "@src/utils/helpers";
import { FC, MouseEventHandler } from "react";
import {
  Outlet,
  useLoaderData,
  useNavigate,
  useSearchParams,
} from "react-router";
import CategoriesAccordion from "../ListWithFilters/categories-accordion";

type PropTypes = {};

const WeblogsLayout: FC<PropTypes> = (props) => {
  const {} = props;
  const navigate = useNavigate();
  const categories: WeblogCategoryItem[] = useLoaderData();
  const total = useStore((st) => st.total);
  const [searchParams, setSearchParams] = useSearchParams();
  const currentSubCat = searchParams.get("CategoryKey");

  const tabItems: TabItem[] = [
    { label: "پیش نویس", key: "draft", count: formatNumber(43, "fa") },
    { label: "ارزیابی", key: "evaluate", count: formatNumber(78, "fa") },
    { label: "صف انتشار", key: "queue", count: formatNumber(157, "fa") },
    { label: "منتشر شده", key: "published", count: formatNumber(275, "fa") },
  ];

  const handleSort = (item: ItemType) => {
    navigate(updateURLParams("sort", item.key));
  };

  const onSubCategoryClick: MouseEventHandler<HTMLLIElement> = (e) => {
    const { id } = e.currentTarget;
    setSearchParams((prev) => {
      prev.set("CategoryKey", id);
      return prev;
    });
  };

  return (
    <PageTransition className="h-full">
      <ListWithFiltersLayout
        filters={
          <CategoriesAccordion
            items={categories.map((cat) => ({
              ...cat,
              content: (
                <ul>
                  {cat.categories.map((subCat) => (
                    <li
                      className={`cursor-pointer ${
                        subCat.key === currentSubCat
                          ? "text-label-basePrimary"
                          : "text-label-primary"
                      }  text-body-md ms-9 py-2`}
                      key={subCat.key}
                      onClick={onSubCategoryClick}
                      id={subCat.key}
                    >
                      {subCat.title}
                    </li>
                  ))}
                </ul>
              ),
            }))}
          />
        }
        filterTitle="فیلتر و دسته‌بندی" /** @todo change text with translated texts */
        tabItems={tabItems}
        title="لیست مجله" /** @todo change text with translated texts */
        sortComponent={
          <div className="w-40">
            <DropDown
              fullWidth={true}
              items={[
                { label: "آخرین تاریخ", key: "srt-oldest" },
                { label: "اولین تاریخ", key: "srt-newest" },
              ]}
              onSelect={handleSort}
              size="m"
            />
          </div>
        }
        total={total}
        limit={weblogsPageLimit}
      >
        <Outlet />
      </ListWithFiltersLayout>
    </PageTransition>
  );
};

export default WeblogsLayout;
