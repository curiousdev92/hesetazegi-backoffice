import { weblogsPageLimit } from "@src/utils/constants";
import { GET_WEBLOGS_URL } from "@src/utils/urls";
import { LoaderFunctionArgs } from "react-router";
import { GET } from ".";

const cache = new Map();

export const getWeblogs = async ({ request }: LoaderFunctionArgs) => {
  const { searchParams } = new URL(request.url);
  const page = searchParams.get("page") || 1;
  const cacheKey = `weblogs/${page}`;
  if (cache.has(cacheKey)) {
    return cache.get(cacheKey);
  }
  searchParams.set("Limit", String(weblogsPageLimit));
  page && searchParams.set("PageIndex", String(page));

  const queryString = decodeURI(searchParams.toString());
  const weblogs = await GET(
    `${GET_WEBLOGS_URL}/${"fa"}${queryString ? "?" : ""}${queryString}`
  );
  cache.set(cacheKey, weblogs);

  return weblogs;
};
