import { GET_WEBLOG_LIST } from "@src/utils/urls";
import { GET } from ".";

const cache = new Map();

export const getWeblogs = async (searchParams: URLSearchParams) => {
  const page = searchParams.get("page") || 1;

  // searchParams.set("Limit", String(weblogsPageLimit));
  // page && searchParams.set("PageIndex", String(page));

  const queryString = decodeURI(searchParams.toString());
  const cacheKeyBase = `weblogs/${page}`;
  const recipeCacheKey = `${cacheKeyBase}?${queryString}`;

  if (cache.has(recipeCacheKey)) {
    return cache.get(recipeCacheKey);
  } else {
    const weblogs = await GET(
      `${GET_WEBLOG_LIST}/${"fa"}${queryString ? "?" : ""}${queryString}`
    );
    cache.set(recipeCacheKey, weblogs);
    return weblogs;
  }
};
