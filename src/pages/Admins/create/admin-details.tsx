import DefaultAvatar from "@images/default-avatar.svg";
import Img from "@src/components/Img";
import Spinner from "@src/components/Spinner";
import TextField from "@src/components/Textfield";
import { uuid } from "@src/utils/helpers";
import { BASE_URL_UPLOAD } from "@src/utils/urls";
import { ChangeEventHandler, FC, useState } from "react";

type PropTypes = {
  errors: {
    firstName: boolean;
    lastName: boolean;
    position: boolean;
    username: boolean;
    password: boolean;
  };
  data?: {
    adminId: string;
    email: string;
    firstName: string;
    image: string;
    lastName: string;
    phone: string;
    position: string;
    roles: { key: number; value: string }[];
    username: string;
  };
};

const AdminDetailsForm: FC<PropTypes> = (props) => {
  const { errors, data } = props;
  const [avatar, setAvatar] = useState(data?.image || "");
  const [loading, setLoading] = useState(false);

  const handleAvatarChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    if (e.target?.files?.[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = async () => {
        setLoading(true);
        try {
          const uploadData = new FormData();
          uploadData.append("file", file);
          uploadData.append("type", "avatar");
          uploadData.append("category", "admins");
          uploadData.append("key", data?.adminId || uuid());
          const res = await fetch(BASE_URL_UPLOAD, {
            method: "POST",
            body: uploadData,
          });
          const dt = await res.json();
          setAvatar(dt.data);
        } catch (error) {
          console.log(error);
        } finally {
          setLoading(false);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="basis-[42%] rounded-xl border border-border-secondary overflow-hidden">
      <div className="w-full h-12 py-3 px-4 bg-content-tertiary">
        <p className="text-label-lg text-label-primary text-right">
          مشخصات فردی
        </p>
      </div>
      <div className="w-full flex flex-col gap-4 p-4 overflow-auto mb-auto">
        <label htmlFor="avatar" className="mx-auto w-fit cursor-pointer">
          <input type="text" hidden name="image" value={avatar} readOnly />
          <input type="file" id="avatar" hidden onChange={handleAvatarChange} />
          <div
            className="rounded-full border border-border-tertiary grid place-content-center overflow-hidden"
            style={{ width: 68, height: 68 }}
          >
            {loading ? (
              <Spinner size="s" />
            ) : (
              <Img src={avatar || DefaultAvatar} size={68} ratio={[1, 1]} />
            )}
          </div>

          <p className="text-body-md text-label-basePrimary text-center mt-2">
            تغییر عکس
          </p>
        </label>
        <TextField
          id={"firstName"}
          name={"firstName"}
          size={"medium"}
          label={"نام"}
          placeholder={"نام مدیر را وارد کنید"}
          state={errors.firstName ? "error" : "default"}
          defaultValue={data?.firstName}
        />
        <TextField
          id={"lastName"}
          name={"lastName"}
          size={"medium"}
          label={"نام خانوادگی"}
          placeholder={"نام خانوادگی مدیر را وارد کنید"}
          state={errors.lastName ? "error" : "default"}
          defaultValue={data?.lastName}
        />
        <TextField
          id={"position"}
          name={"position"}
          size={"medium"}
          label={"سمت"}
          placeholder={"سمت شغلی مدیر را وارد کنید"}
          state={errors.position ? "error" : "default"}
          defaultValue={data?.position}
        />
        <TextField
          id={"username"}
          name={"username"}
          size={"medium"}
          label={"نام کاربری"}
          placeholder={"نام کاربری را وارد کنید"}
          state={errors.username ? "error" : "default"}
          defaultValue={data?.username}
        />
        <TextField
          id={"password"}
          name="password"
          size={"medium"}
          label={"رمز عبور"}
          placeholder={"رمز عبور را وارد کنید"}
          state={errors.password ? "error" : "default"}
          defaultValue={"******"}
          disabled
          type="password"
        />
      </div>
    </div>
  );
};

export default AdminDetailsForm;
