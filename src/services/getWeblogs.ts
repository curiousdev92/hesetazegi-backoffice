import { weblogsPageLimit } from "@src/utils/constants";
import { GET_WEBLOGS_URL } from "@src/utils/urls";
import { LoaderFunctionArgs } from "react-router";
import { GET } from ".";

export const getWeblogs = async ({ request }: LoaderFunctionArgs) => {
  const { searchParams } = new URL(request.url);
  const page = searchParams.get("page");
  searchParams.set("Limit", String(weblogsPageLimit));
  page && searchParams.set("PageIndex", String(page));

  const queryString = decodeURI(searchParams.toString());

  return GET(
    `${GET_WEBLOGS_URL}/${"fa"}${queryString ? "?" : ""}${queryString}`
  );
};
