import PageTransition from "@src/animations/PageTransition";
import ItemRow from "@src/layouts/ItemRow";
import ListWithFiltersLayout from "@src/layouts/ListWithFilters";
import { weblogsPageLimit } from "@src/utils/constants";
import { formatNumber } from "@src/utils/helpers";
import { FC } from "react";
import { useLoaderData } from "react-router";

type PropTypes = {};

const WeblogListPage: FC<PropTypes> = () => {
  const data = useLoaderData() as { total: number; records: WeblogItem[] };
  const weblogs = data.records.map((w) => ({
    date: w.publishedTime,
    title: w.title,
    key: w.key,
    image: w.thumbnail.src,
    link: "#sample-link" /** @todo change link to dynamic with {w.key} and {baseURL} */,
  }));
  const weblogsLen = weblogs.length;

  const tabItems: TabItem[] = [
    { label: "پیش نویس", key: "draft", count: formatNumber(43, "fa") },
    { label: "ارزیابی", key: "evaluate", count: formatNumber(78, "fa") },
    { label: "صف انتشار", key: "queue", count: formatNumber(157, "fa") },
    { label: "منتشر شده", key: "published", count: formatNumber(275, "fa") },
  ];

  return (
    <PageTransition className="h-full">
      <ListWithFiltersLayout
        filters={[]}
        filterTitle="فیلتر و دسته‌بندی" /** @todo change text with translated texts */
        tabItems={tabItems}
        title="لیست دستور پخت" /** @todo change text with translated texts */
        sortComponent={<div>Sort dropdown</div> /** @todo Use DropDown here */}
        total={data.total}
        limit={weblogsPageLimit}
        items={weblogs.map((welog, i) => (
          <ItemRow
            key={welog.key}
            data={welog}
            locales={["fa", "en"]}
            actions={["pin", "copy", "delete"]}
            divider={i < weblogsLen - 1}
            link={welog.link}
          />
        ))}
      />
    </PageTransition>
  );
};
export default WeblogListPage;
