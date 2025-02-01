import Chips from "@src/components/Chips";
import Img from "@src/components/Img";
import { useStore } from "@src/store";
import { FC } from "react";
import { useLoaderData } from "react-router";
import AdminsRowActions from "./row-actions";

type PropTypes = {};

const AdminListPage: FC<PropTypes> = (props) => {
  const {} = props;
  const setTotal = useStore((st) => st.setTotal);
  const data = useLoaderData() as adminsEntityType;
  const { count, result } = data;
  setTotal(count);
  const tableBodies: MappedAdminType[] = result.map((dt) => ({
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
    adminId: dt.adminId,
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
    <div className="">
      {/* Table Header */}
      <table className="w-full">
        <thead>
          <tr>
            {tableHeaders.map(({ key, label }) => (
              <th
                className={`${
                  key === "creationDate"
                    ? "text-end"
                    : key === "avatar"
                    ? "text-center"
                    : "text-start"
                } text-label-primary text-label-md py-3.5 bg-content-tertiary px-4`}
                key={key}
              >
                {label}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {tableBodies.map((obj) => (
            <tr
              className="hover:bg-gray-50 cursor-pointer relative group"
              key={obj.adminId}
            >
              <td className="py-2 px-4 flex justify-center">
                <Img
                  src={obj.avatar}
                  size={40}
                  ratio={[1, 1]}
                  className="rounded-full"
                />
              </td>
              <td className="py-2 px-4 border-b border-b-border-secondary">
                {obj.fullName}{" "}
              </td>
              <td className="py-2 px-4 border-b border-b-border-secondary">
                {obj.adminName}
              </td>
              <td className="py-2 px-4 border-b border-b-border-secondary">
                {obj.position}
              </td>
              <td className="py-2 px-4 border-b border-b-border-secondary">
                <div className="w-[70px]">
                  <Chips
                    size={"m"}
                    label={obj.isActive ? "فعال" : "غیرفعال"}
                    variant={obj.isActive ? "primary" : "secondary"}
                    fullWidth
                  />
                </div>
              </td>
              <td className="py-2 px-4 border-b border-b-border-secondary">
                {obj.roles.length ? (
                  <div className="flex gap-2">
                    <Chips
                      size={"m"}
                      label={`# ${obj.roles[0].value}`}
                      variant={"gray"}
                    />
                    {obj.roles.length > 1 ? (
                      <Chips
                        size={"m"}
                        label={`+${(obj.roles.length - 1).toLocaleString(
                          "fa"
                        )}`}
                        variant={"gray"}
                      />
                    ) : null}
                  </div>
                ) : null}
              </td>
              <td className="py-2 px-4 border-b border-b-border-secondary text-end">
                <span className="text-label-secondary text-body-lg">
                  {obj["creationDate"]}
                </span>
              </td>
              <AdminsRowActions data={obj} />
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default AdminListPage;
