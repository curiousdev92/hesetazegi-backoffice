import Button from "@src/components/Button";
import FontIcon from "@src/components/FontIcon";
import IconButton from "@src/components/IconButton";
import { POST } from "@src/services";
import { CREATE_ADMIN_ROLES } from "@src/utils/urls";
import { FC, FormEventHandler, useState } from "react";
import { Link, useLoaderData } from "react-router";
import AdminDetailsForm from "./admin-details";
import AdminRolesForm from "./admin-roles";

type PropTypes = {};

type ErrorsType = {
  firstName: boolean;
  lastName: boolean;
  position: boolean;
  username: boolean;
  password: boolean;
};

const AdminCreatePage: FC<PropTypes> = (props) => {
  const {} = props;
  const data = useLoaderData();
  const initErrors = {
    firstName: false,
    lastName: false,
    position: false,
    username: false,
    password: false,
  };
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<ErrorsType>(initErrors);

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const formData = Object.fromEntries(form);
    const selectedRoles = form.getAll("roles");
    const allSelected = form.get("all-roles");
    const formEntries = Object.entries(formData);
    const newErrors: any = {};

    formEntries.forEach(([key, value]) => {
      if (key !== "all-roles" && key !== "roles") {
        newErrors[key] = !value;
      }
    });
    const hasError = Object.values(newErrors).some((e) => e);
    console.log(newErrors);
    setErrors(newErrors);

    if ((!selectedRoles?.length && !allSelected) || hasError) {
      console.log("form not completed");
      return;
    } else {
      setLoading(true);
      try {
        const dt = await POST(CREATE_ADMIN_ROLES, {
          ...formData,
          roles: selectedRoles?.length
            ? selectedRoles
            : data.flatMap((i: any) => i.adminGroupId),
          image:
            "https://statics.hesetazegi.com/files/avatar/admins/367d54bd-e639-420f-8850-e27c0b2eca14/Leo's Fortune Character.jpg",
        });
        console.log(dt);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <form
      className="h-full w-full grid grid-rows-[3.5rem_auto]"
      onSubmit={handleSubmit}
    >
      <header className="px-4 pt-4 flex justify-between">
        <div className="grow flex items-center gap-4">
          <Link to={"/admin-management"}>
            <IconButton icon="arrow-right" iconClasses="text-xl" />
          </Link>
          <h1 className="text-label-primary text-title-md">ایجاد مدیر جدید</h1>
        </div>

        <Button
          size={"l"}
          variant={"filled"}
          startIcon={<FontIcon icon={"tick"} />}
          type="submit"
          label={"ثبت و ذخیره"}
          loading={loading}
        />
      </header>
      <section className="flex gap-6 p-4 grow overflow-hidden">
        <AdminDetailsForm errors={errors} />
        <AdminRolesForm roles={data} />
      </section>
    </form>
  );
};

export default AdminCreatePage;
