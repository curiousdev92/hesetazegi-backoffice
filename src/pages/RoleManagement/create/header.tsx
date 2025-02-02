import Button from "@src/components/Button";
import FontIcon from "@src/components/FontIcon";
import { useNavigate } from "react-router";

export default function CreateRolesHeader({ loading }: { loading: boolean }) {
  const navigate = useNavigate();

  const goBack = () => navigate(-1);

  return (
    <header className="flex flex-col gap-4 pt-4">
      <div className="flex justify-between items-center h-10 px-4">
        <div
          role="navigation"
          onClick={goBack}
          className="cursor-pointer flex gap-2 items-center"
        >
          <FontIcon icon="arrow-right" className="text-label-primary text-xl" />
          <p className="text-title-md text-label-primary">مدیریت نقش‌ها</p>
        </div>
        <Button
          size={"l"}
          variant={"filled"}
          endIcon={<FontIcon icon={"tick"} />}
          type="submit"
          label={"ثبت و ذخیره"}
          loading={loading}
        />
      </div>
    </header>
  );
}
