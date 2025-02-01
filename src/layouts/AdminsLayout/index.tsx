import PageTransition from "@src/animations/PageTransition";
import Button from "@src/components/Button";
import FontIcon from "@src/components/FontIcon";
import ListWithFiltersLayout from "@src/layouts/ListWithFilters";
import { useStore } from "@src/store";
import { weblogsPageLimit } from "@src/utils/constants";
import { FC } from "react";
import { Link, Outlet } from "react-router";

type PropTypes = {};

const AdminsLayout: FC<PropTypes> = () => {
  const total = useStore((st) => st.total);

  return (
    <PageTransition className="h-full">
      <ListWithFiltersLayout
        onTabChange={() => {}}
        tabItems={[]}
        title="مدیریت مدیران" /** @todo change text with translated texts */
        total={total}
        limit={weblogsPageLimit}
        searchbarPlaceholder="جستجو مدیران..."
        actionButton={
          <Button
            size={"l"}
            variant={"filled"}
            label={<Link to={"/admin-management/create"}>ایجاد مدیر جدید</Link>}
            startIcon={<FontIcon icon="add" />}
          />
        }
      >
        <Outlet />
      </ListWithFiltersLayout>
    </PageTransition>
  );
};

export default AdminsLayout;
