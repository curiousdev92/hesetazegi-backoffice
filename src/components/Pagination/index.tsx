import { localizeDigit } from "@src/utils/helpers";
import { FC, MouseEventHandler, useEffect, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router";
import FontIcon from "../FontIcon";
import Spinner from "../Spinner";

type PropTypes = { total: number; limit: number };

const Pagination: FC<PropTypes> = (props) => {
  const { total, limit } = props;

  const [params] = useSearchParams(); // Replace with react-dom in react project
  const pageParam = +(params.get("page") || 1);
  const { pathname } = useLocation(); // Replace with react-dom in react project
  const navigate = useNavigate(); // Replace with react-dom in react project
  const [current, setCurrent] = useState(pageParam);
  const [loading, setLoading] = useState(false);

  const pages = Array.from(
    { length: Math.ceil(total / limit) || 1 },
    (_, i) => i + 1
  );
  const lastPage = pages[pages.length - 1];

  const navigateToPage = (page: number) => {
    if (+page === +pageParam) return;
    const url = new URL(document.location as any);
    const params = new URLSearchParams(url.search);
    params.set("page", String(page));

    setLoading(true);
    setCurrent(+page);
    navigate(`${pathname}?${params.toString()}`, { replace: true });
  };

  const handlePageClick: MouseEventHandler<HTMLLIElement> = (e) => {
    const targetPage = e.currentTarget.dataset?.page;
    if (targetPage && !loading) navigateToPage(+targetPage);
  };

  const handleNextClick = () => {
    if (current === lastPage) return;
    navigateToPage(current + 1);
  };

  const handlePrevClick = () => {
    if (current === 1) return;
    navigateToPage(current - 1);
  };

  useEffect(() => {
    setLoading(false);
    if (pageParam > lastPage) {
      navigateToPage(lastPage);
    }

    if (pageParam < 1) {
      navigateToPage(1);
    }
  }, [pageParam]);

  useEffect(() => {
    if (pageParam > lastPage) {
      navigateToPage(lastPage);
    }
  }, [lastPage]);

  return (
    <nav className="flex max-w-full overflow-hidden justify-center">
      <ul className="flex max-w-full overflow-x-auto overflow-y-clip no-scrollbar select-none gap-x-1">
        {/* Prev page arrow */}
        <li
          role="button"
          onClick={handlePrevClick}
          className={`w-8 basis-8 grow shrink-0 h-8 flex items-center justify-center rounded-lg ${
            current === 1
              ? "opacity-50 cursor-default text-label-primary bg-gray-50"
              : "bg-primary-50 hover:border hover:border-border-basePrimary cursor-pointer text-label-basePrimary"
          }`}
        >
          <FontIcon icon="arrow-right" />
        </li>

        {/* Pages */}
        <li
          role="button"
          onClick={handlePageClick}
          data-page={1}
          className={`w-8 basis-8 grow shrink-0 h-8 flex items-center justify-center rounded-lg cursor-pointer ${
            pageParam === 1 ? "bg-system-primary text-system-white" : ""
          } ${1 === current ? "cursor-default" : "cursor-pointer"}`}
        >
          {loading && current === 1 ? <Spinner size={"s"} /> : localizeDigit(1)}
        </li>

        {lastPage > 7 && current >= 5 ? <li className="w-8 h-8">...</li> : null}

        {(lastPage <= 7
          ? pages
          : current >= 5 && current < lastPage - 3
          ? [current - 1, current, current + 1]
          : current >= lastPage - 3
          ? [lastPage - 4, lastPage - 3, lastPage - 2, lastPage - 1, lastPage]
          : [1, 2, 3, 4, 5]
        ).map((p) =>
          p === 1 || p === lastPage ? null : (
            <li
              data-page={p}
              role="button"
              key={p}
              onClick={handlePageClick}
              className={`w-8 basis-8 grow shrink-0 h-8 flex items-center justify-center rounded-lg ${
                pageParam === p ? "bg-system-primary text-system-white" : ""
              } ${
                p === current
                  ? "cursor-default text-green-600"
                  : "cursor-pointer"
              }`}
            >
              {loading && current === p ? (
                <Spinner size={"s"} />
              ) : (
                localizeDigit(p)
              )}
            </li>
          )
        )}

        {lastPage > 7 && current < lastPage - 3 ? (
          <li className="w-8 h-8">...</li>
        ) : null}

        {lastPage !== 1 ? (
          <li
            role="button"
            onClick={handlePageClick}
            data-page={lastPage}
            className={`w-8 basis-8 grow shrink-0 h-8 flex items-center justify-center rounded-lg ${
              pageParam === lastPage
                ? "bg-system-primary text-system-white"
                : ""
            } ${lastPage === current ? "cursor-default" : "cursor-pointer"}`}
          >
            {loading && current === lastPage ? (
              <Spinner size={"s"} />
            ) : (
              localizeDigit(lastPage)
            )}
          </li>
        ) : null}

        {/* Next page arrow */}
        <li
          role="button"
          onClick={handleNextClick}
          className={`w-8 basis-8 grow shrink-0 h-8 flex items-center justify-center rounded-lg ${
            current === lastPage
              ? "opacity-50 cursor-default text-label-primary bg-gray-50"
              : "bg-primary-50 hover:border hover:border-border-basePrimary cursor-pointer text-label-basePrimary"
          }`}
        >
          <FontIcon icon="arrow-left" className="text-base" />
        </li>
      </ul>
    </nav>
  );
};
export default Pagination;
