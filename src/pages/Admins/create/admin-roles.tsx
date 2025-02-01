import AdminRoleImage from "@src/assets/images/adminPage/admin-role-icon.png";
import Divider from "@src/components/Divider";
import Img from "@src/components/Img";
import Switch from "@src/components/Switch";
import { ChangeEventHandler, FC, Fragment, useState } from "react";

type PropTypes = { roles: roleItemType[] };

const AdminRolesForm: FC<PropTypes> = (props) => {
  const { roles } = props;
  const rolesLength = roles?.length || 0;
  const [allChecked, setAllChecked] = useState(false);

  const onCheckAll: ChangeEventHandler<HTMLInputElement> = (e) => {
    const { checked } = e.target;
    setAllChecked(checked);
  };

  return (
    <div className="basis-[58%] rounded-xl border border-border-secondary grid overflow-hidden">
      <header className="w-full h-12 py-3 px-4 bg-content-tertiary flex items-center gap-2">
        <p className="text-label-lg text-label-primary text-right grow">
          نقش‌های مدیر
        </p>
        <p className="text-label-md text-label-primary">همه فعال</p>
        <Switch
          id={"all-active"}
          size={"s"}
          onCheck={onCheckAll}
          name={"all-roles"}
        />
      </header>

      <div className="w-full p-4 flex flex-col gap-4 overflow-auto">
        {roles.map((role, i) => (
          <Fragment key={role.adminGroupId}>
            <label
              htmlFor={`${role.adminGroupId}`}
              className="flex justify-between items-center w-full h-fit cursor-pointer"
              style={{ opacity: allChecked ? 0.5 : 1 }}
            >
              <div className="flex gap-4 items-center w-full h-fit">
                <Img
                  src={role.image || AdminRoleImage}
                  alt="ManagerRole"
                  size={44}
                  ratio={[1, 1]}
                />

                <div className="flex flex-col gap-2 items-start">
                  <p className="text-label-md leading-5 text-label-primary overflow-hidden text-ellipsis whitespace-normal line-clamp-1">
                    {role.title}
                  </p>
                  <p className="text-body-sm leading-4 text-label-secondary overflow-hidden text-ellipsis whitespace-normal line-clamp-1">
                    {/* {t("pages.admins.contactManagementdes")} */}
                  </p>
                </div>
              </div>
              <Switch
                id={`${role.adminGroupId}`}
                size={"s"}
                name={"roles"}
                value={role.adminGroupId}
                disabled={allChecked}
              />
            </label>
            {i !== rolesLength ? (
              <Divider
                horizontal="horizontal2"
                horizontalType="right-inset"
                className="ms-14"
              />
            ) : null}
          </Fragment>
        ))}
      </div>
    </div>
  );
};

export default AdminRolesForm;
