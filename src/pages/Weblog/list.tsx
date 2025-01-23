import EmptyStateImage from "@src/assets/images/empty-state.png";
import EmptyState from "@src/components/EmptyState";
import Spinner from "@src/components/Spinner";
import ItemRow from "@src/layouts/ItemRow";
import { FC } from "react";
import { useLoaderData, useNavigation } from "react-router";

type PropTypes = {};

const WeblogListPage: FC<PropTypes> = () => {
  const navigation = useNavigation();
  const data = useLoaderData() as { total: number; records: WeblogItem[] };
  const weblogs = data.records.map((w) => ({
    date: w.publishedTime,
    title: w.title,
    key: w.key,
    image: w.thumbnail.src,
    link: "#sample-link" /** @todo change link to dynamic with {w.key} and {baseURL} */,
  }));
  const weblogsLen = weblogs.length;
  const loading = navigation.state === "loading";

  return loading ? (
    <div className="grid place-items-center h-full">
      <Spinner size="m" />
    </div>
  ) : weblogs.length === 0 ? (
    <div className="grid place-items-center h-full">
      <EmptyState
        className="self-center"
        size={"l"}
        description={"داده ای برای نمایش وجود ندارد"}
        imgSrc={EmptyStateImage}
      />
    </div>
  ) : (
    <>
      {weblogs.map((weblog, i) => (
        /**
         * @todo animate this with an eye on pin animation
         */
        // <motion.div
        //   key={weblog.key}
        //   initial={{ opacity: 0, translateY: -20 }}
        //   animate={{ opacity: 1, translateY: 0 }}
        //   exit={{ opacity: 0, translateY: -20 }}
        //   transition={{ duration: 0.3, ease: "easeInOut", delay: 0.02 * i }}
        // >
        <ItemRow
          data={weblog}
          key={weblog.key}
          locales={["fa", "en"]}
          actions={["pin", "copy", "delete"]}
          divider={i < weblogsLen - 1}
          link={weblog.link}
        />
        // </motion.div>
      ))}
    </>
  );
};
export default WeblogListPage;
