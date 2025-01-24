import EmptyStateImage from "@src/assets/images/empty-state.png";
import EmptyState from "@src/components/EmptyState";
import Spinner from "@src/components/Spinner";
import ItemRow from "@src/layouts/ItemRow";
import { getWeblogs } from "@src/services/getWeblogs";
import { useStore } from "@src/store";
import { FC, useEffect, useState } from "react";
import { useSearchParams } from "react-router";

type PropTypes = {};
type WeblogsDataType = { total: number; records: WeblogItem[] };

const WeblogListPage: FC<PropTypes> = () => {
  const setTotal = useStore((st) => st.setTotal);
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [weblogs, setWeblogs] = useState<any[]>([]);
  const [error, setError] = useState<unknown>(null);
  const weblogsLen = weblogs.length;

  const fetchWeblogs = async (searchParams: URLSearchParams) => {
    setLoading(true);
    try {
      const data: WeblogsDataType = await getWeblogs(searchParams);
      setTotal(data.total);
      const mappedWeblogs = data.records.map((w) => ({
        date: w.publishedTime,
        title: w.title,
        key: w.key,
        image: w.thumbnail.src,
        link: "#sample-link" /** @todo change link to dynamic with {w.key} and {baseURL} */,
      }));
      setWeblogs(mappedWeblogs);
    } catch (error) {
      setError(error);
      throw new Error(error as string);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeblogs(searchParams);
  }, [searchParams]);

  return error ? (
    <div>Error Occured</div>
  ) : loading ? (
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
