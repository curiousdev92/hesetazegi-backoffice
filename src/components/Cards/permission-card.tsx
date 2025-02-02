import { FC } from "react";
import { useNavigate } from "react-router";
import Divider from "../Divider";
import IconButton from "../IconButton";
import Img from "../Img";
import Popover from "../Popover";

type PropTypes = {
  permission: roleItemType;
  onDeleteRole: (data: roleItemType) => void;
};

const PermissionCard: FC<PropTypes> = (props) => {
  const { permission, onDeleteRole } = props;
  const navigate = useNavigate();

  const goToEditPage = () => {
    navigate(`/role-management/${permission.adminGroupId}`);
  };

  const DeletePermission = () => {
    onDeleteRole(permission);
  };

  return (
    <section className="flex flex-col gap-4 items-center w-[255px] h-[223px] rounded-xl border transition-[border] border-border-secondary hover:border-border-basePrimary p-4 bg-zink-50 relative group">
      <div className="absolute top-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity">
        <Popover
          placement="bottom"
          anchorElement={
            <IconButton
              icon="menu"
              className="p-[5px] bg-system-white rounded-lg border border-border-secondary text-xl text-label-basePrimary"
            />
          }
          content={
            <ul className="w-40 h-[84px] flex flex-col gap-1 p-2 bg-system-white rounded-lg border border-border-secondary">
              <li
                className="py-1.5 px-3 text-body-md text-label-primary bg-system-white hover:bg-gray-50 flex gap-2 rounded-lg cursor-pointer"
                onClick={goToEditPage}
              >
                ویرایش نقش
              </li>
              <li
                className="py-1.5 px-3 text-body-md text-label-primary bg-system-white hover:bg-gray-50 flex gap-2 rounded-lg cursor-pointer"
                onClick={DeletePermission}
              >
                حذف نقش
              </li>
            </ul>
          }
        />
      </div>

      <div className="overflow-clip flex items-center justify-center rounded-full border border-border-tertiary">
        <Img src={permission.image} size={56} ratio={[1, 1]} />
      </div>
      <div className="flex flex-col gap-1.5 w-full items-center justify-center">
        <p className="text-label-lg leading-6 text-center text-label-primary w-full h-6 overflow-hidden text-ellipsis whitespace-normal line-clamp-1">
          {permission.title}
        </p>
        <p className="text-body-md leading-5 text-center text-label-secondary w-full h-10 overflow-hidden text-ellipsis whitespace-normal line-clamp-2">
          {permission.description}
        </p>
      </div>
      <Divider horizontal="horizontal1" horizontalType="full-width" />
      <div className="w-full flex items-center justify-between">
        <p className="text-body-sm text-label-secondary leading-4">
          تاریخ ایجاد نقش:
        </p>
        <p className="text-body-sm text-label-secondary leading-4">
          {new Date(permission.creationDate).toLocaleDateString("fa", {
            day: "2-digit",
            month: "2-digit",
          })}
        </p>
      </div>
    </section>
  );
};

export default PermissionCard;
