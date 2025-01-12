import {
  createBrowserRouter,
  RouterProvider,
  useLoaderData,
} from "react-router";
import { getCookie } from "./utils/cookies";
import { GET_MENU_URL } from "./utils/urls";
const token = getCookie("bo-tkn");

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      Component: () => {
        let data = useLoaderData();
        console.log(data);
        return <div>Home</div>;
      },
      loader: async () =>
        await fetch(GET_MENU_URL + "/fa", {
          cache: "no-store",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }),
      errorElement: <div>Error</div>,
      // children: [
      //   {
      //     path: "shows/:showId",
      //     Component: ()=><div>show</div>,
      //     loader: ({ request, params }) =>
      //       fetch(`/api/show/${params.id}.json`, {
      //         signal: request.signal,
      //       }),
      //   },
      // ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
