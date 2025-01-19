import PageTransition from "@src/animations/PageTransition";
import Divider from "@src/components/Divider";
import FontIcon from "@src/components/FontIcon";
import ListWithFiltersLayout from "@src/layouts/ListWithFilters";
import { weblogsPageLimit } from "@src/utils/constants";
import { formatNumber } from "@src/utils/helpers";
import { FC } from "react";
import { Outlet, useLoaderData } from "react-router";

type PropTypes = {};

const WeblogsLayout: FC<PropTypes> = (props) => {
  const {} = props;
  const categories: WeblogCategoryItem[] = useLoaderData();

  const tabItems: TabItem[] = [
    { label: "پیش نویس", key: "draft", count: formatNumber(43, "fa") },
    { label: "ارزیابی", key: "evaluate", count: formatNumber(78, "fa") },
    { label: "صف انتشار", key: "queue", count: formatNumber(157, "fa") },
    { label: "منتشر شده", key: "published", count: formatNumber(275, "fa") },
  ];

  return (
    <PageTransition className="h-full">
      <ListWithFiltersLayout
        filters={categories.map((c) => (
          <div className={c.key}>
            <div className="rounded-lg py-2 px-3 flex items-center gap-2 mb-3">
              <FontIcon icon="arrow-down" />
              <p className="text-label-primary text-body-md">{c.title}</p>
            </div>
            <Divider horizontal="horizontal1" horizontalType="full-width" />
          </div>
        ))}
        filterTitle="فیلتر و دسته‌بندی" /** @todo change text with translated texts */
        tabItems={tabItems}
        title="لیست دستور پخت" /** @todo change text with translated texts */
        sortComponent={<div>Sort dropdown</div> /** @todo Use DropDown here */}
        total={5}
        limit={weblogsPageLimit}
      >
        <Outlet />
      </ListWithFiltersLayout>
    </PageTransition>
  );
};

export default WeblogsLayout;
