import Switch from "@src/components/Switch";
import { ChangeEventHandler, FC, useState } from "react";

type PropTypes = {
  errors: { title: boolean };
  data?: { roleId: string; image: string; title: string };
  modules: ModulePermissionEntity[];
};

const CreateRolesDetails: FC<PropTypes> = (props) => {
  const { errors, data, modules } = props;
  const [allChecked, setAllChecked] = useState(false);

  const onCheckAll: ChangeEventHandler<HTMLInputElement> = (e) => {
    const { checked } = e.target;
    setAllChecked(checked);
  };

  return (
    <section className="basis-[58%] rounded-xl border border-border-secondary grid overflow-hidden">
      <header className="w-full h-12 py-3 px-4 bg-content-tertiary flex items-center gap-2">
        <p className="text-label-lg text-label-primary text-right grow">
          دسترسی‌ها
        </p>
        <p className="text-label-md text-label-primary">همه فعال</p>
        <Switch
          id={"all-permissions"}
          size={"s"}
          onCheck={onCheckAll}
          name={"all-permissions"}
        />
      </header>

      <div className="w-full p-4 flex flex-col gap-6 overflow-auto">
        {modules.map((md) => (
          <div key={md.moduleId} className="w-full flex flex-col gap-4">
            <p className="text-label-md text-label-basePrimary leading-5 overflow-hidden text-ellipsis whitespace-normal line-clamp-1">
              {md.permissionTitle}
            </p>
            <div className="grid grid-cols-2 gap-4">
              {md.permissions.map((permission) => (
                <label
                  htmlFor={permission.permissionKey}
                  key={permission.permissionKey}
                  style={{
                    opacity: allChecked ? 0.5 : 1,
                    cursor: allChecked ? "default" : "pointer",
                  }}
                  className="flex items-center justify-between rounded-xl h-12 border border-border-secondary bg-zink-50 p-3"
                >
                  <p className="text-body-md text-label-primary">
                    {permission.permissionTitle
                      .replace(/[\[\]]/g, "")
                      .replace("-", " - ")}
                  </p>
                  <Switch
                    id={permission.permissionKey}
                    size={"s"}
                    name={"permissions"}
                    value={`${permission.permissionKey},${permission.moduleId}`}
                    disabled={allChecked}
                  />
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CreateRolesDetails;
