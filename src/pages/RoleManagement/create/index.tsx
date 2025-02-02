import { POST } from "@src/services";
import { CREATE_ADMIN_PERMISSIONS } from "@src/utils/urls";
import { FC, FormEventHandler, useState } from "react";
import { useLoaderData, useNavigate } from "react-router";
import Details from "./details";
import Header from "./header";
import Permissions from "./permissions";

type PropTypes = {};

const RoleCreatePage: FC<PropTypes> = (props) => {
  const {} = props;
  const modules = useLoaderData() as ModulePermissionEntity[];
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({
    title: false,
    description: false,
    image: false,
  });
  const allPermissions = modules.flatMap((md) =>
    md.permissions.flatMap((p) => ({ key: p.moduleId, value: p.permissionKey }))
  );

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const formData = Object.fromEntries(form);
    const selectedPermissions = form.getAll("permissions");
    const allSelected = form.get("all-permissions");
    const formEntries = Object.entries(formData);
    const newErrors: any = {};

    formEntries.forEach(([key, value]) => {
      if (key !== "all-permissions" && key !== "permissions") {
        newErrors[key] = !value;
      }
    });

    const hasError = Object.values(newErrors).some((e) => e);
    setErrors(newErrors);

    if ((!selectedPermissions?.length && !allSelected) || hasError) {
      return;
    } else {
      setLoading(true);
      try {
        const dt = await POST(CREATE_ADMIN_PERMISSIONS, {
          adminGroupId: 0,
          title: formData.title,
          description: formData.description,
          image: formData.image,
          permissions: allSelected
            ? allPermissions
            : selectedPermissions.map((p: any) => ({
                key: p.split(",")[1],
                value: p.split(",")[0],
              })),
        });
        if (dt === true) {
          navigate("/role-management", { flushSync: true });
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <form className="w-full h-full flex flex-col" onSubmit={handleSubmit}>
      <Header loading={loading} />
      <div className="flex gap-6 p-4 grow overflow-hidden">
        <Details errors={errors} />
        <Permissions errors={errors} modules={modules} />
      </div>
    </form>
  );
};

export default RoleCreatePage;
