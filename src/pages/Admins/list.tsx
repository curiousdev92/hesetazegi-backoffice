import Chips from "@src/components/Chips";
import Img from "@src/components/Img";
import { useStore } from "@src/store";
import { FC } from "react";
import { useLoaderData } from "react-router";

type PropTypes = {};

const AdminListPage: FC<PropTypes> = (props) => {
  const {} = props;
  const setTotal = useStore((st) => st.setTotal);
  const data = useLoaderData() as adminsEntityType;
  const { count, result } = data;
  setTotal(count);
  const tableBodies = result.map((dt) => ({
    avatar: dt.avatar,
    fullName: dt.fullName,
    adminName: dt.adminName,
    position: "front-end" /**@todo Backend should add this item to result */,
    isActive: dt.isActive,
    roles: dt.roles,
    creationDate: new Date(dt.creationDate).toLocaleDateString("fa", {
      day: "2-digit",
      year: "2-digit",
      month: "2-digit",
    }),
  }));

  const tableHeaders = [
    { key: "avatar", label: "#" },
    { key: "fullName", label: "نام و نام‌خانوادگی" },
    { key: "adminName", label: "نام کاربری" },
    { key: "position", label: "سمت فرد" },
    { key: "isActive", label: "وضعیت" },
    { key: "roles", label: "نقش‌ها" },
    { key: "creationDate", label: "تاریخ ایجاد" },
  ];

  return (
    <div className="grid grid-rows-[3rem] grid-cols-[3.5rem_repeat(6,minmax(0,auto))] auto-rows-[3.5rem] items-center">
      {/* Table Header */}
      {tableHeaders.map(({ key, label }) => (
        <div
          className={`${
            key === "creationDate" ? "text-end" : ""
          } text-label-primary text-label-md py-3.5 bg-content-tertiary px-4 first:text-center`}
          key={key}
        >
          {label}
        </div>
      ))}

      {tableBodies.map((obj) => {
        const keys = Object.keys(obj) as (keyof typeof obj)[];
        return keys.map((key) => (
          <div
            className={`py-2 px-4 ${key === "creationDate" ? "text-end" : ""}`}
            key={key}
            // key === "avatar" ? "ps-4" :
          >
            {key === "avatar" ? (
              <Img
                src={obj["avatar"]}
                size={40}
                ratio={[1, 1]}
                className="rounded-full"
              />
            ) : key === "isActive" ? (
              <div className="w-[70px]">
                <Chips
                  size={"m"}
                  label={obj.isActive ? "فعال" : "غیرفعال"}
                  variant={obj.isActive ? "primary" : "secondary"}
                  fullWidth
                />
              </div>
            ) : key === "roles" ? (
              obj.roles.length ? (
                <div className="flex gap-2">
                  <Chips
                    size={"m"}
                    label={`# ${obj.roles[0].value}`}
                    variant={"gray"}
                  />
                  {obj.roles.length > 1 ? (
                    <Chips
                      size={"m"}
                      label={`+${(obj.roles.length - 1).toLocaleString("fa")}`}
                      variant={"gray"}
                    />
                  ) : null}
                </div>
              ) : null
            ) : key === "creationDate" ? (
              <span className="text-label-secondary text-body-lg">
                {obj["creationDate"]}
              </span>
            ) : (
              <span className="text-label-secondary text-body-md">
                {obj[key]}
              </span>
            )}
          </div>
        ));
      })}
    </div>
  );
};
export default AdminListPage;
