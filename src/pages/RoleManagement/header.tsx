import Button from "@src/components/Button";
import { Link } from "react-router";
import FontIcon from "../../components/FontIcon";

export default function Header() {
  return (
    <header className="pt-4">
      <div className="flex justify-between items-center h-10 px-4">
        <p className="text-title-md text-label-primary">مدیریت نقش‌ها</p>
        <Link to="create">
          <Button
            size={"l"}
            variant={"filled"}
            startIcon={<FontIcon icon={"add"} />}
            label={"ایجاد نقش جدید"}
          />
        </Link>
      </div>
    </header>
  );
}
