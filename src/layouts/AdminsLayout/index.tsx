import PageTransition from "@src/animations/PageTransition";
import ListWithFiltersLayout from "@src/layouts/ListWithFilters";
import { weblogsPageLimit } from "@src/utils/constants";
import { FC } from "react";
import { Outlet } from "react-router";

type PropTypes = {};

const AdminsLayout: FC<PropTypes> = () => {
  return (
    <PageTransition className="h-full">
      <ListWithFiltersLayout
        onTabChange={() => {}}
        tabItems={[]}
        title="مدیریت مدیران" /** @todo change text with translated texts */
        total={30}
        limit={weblogsPageLimit}
        // tableHeaders={}
      >
        <Outlet />
      </ListWithFiltersLayout>
    </PageTransition>
  );
};

export default AdminsLayout;
