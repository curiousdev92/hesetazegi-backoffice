import DefaultAvatar from "@images/default-avatar.svg";
import Img from "@src/components/Img";
import Spinner from "@src/components/Spinner";
import TextField from "@src/components/Textfield";
import { useStore } from "@src/store";
import { uuid } from "@src/utils/helpers";
import { BASE_URL_UPLOAD } from "@src/utils/urls";
import { ChangeEventHandler, FC, useState } from "react";

type PropTypes = {};

const AdminDetailsForm: FC<PropTypes> = (props) => {
  const {} = props;
  const [avatar, setAvatar] = useState("");
  const [loading, setLoading] = useState(false);
  const user = useStore((st) => st.adminStatus);

  const handleAvatarChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    if (e.target?.files?.[0] && user) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = async () => {
        setLoading(true);
        try {
          const uploadData = new FormData();
          uploadData.append("file", file);
          uploadData.append("category", "admins");
          uploadData.append("type", "avatar");
          uploadData.append("key", uuid());
          const res = await fetch(BASE_URL_UPLOAD, {
            method: "POST",
            body: uploadData,
          });
          const data = await res.json();
          setAvatar(data.data);
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
    <div className="basis-[42%] rounded-xl border border-border-secondary">
      <div className="w-full h-12 py-3 px-4 bg-content-tertiary rounded-t-xl">
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
        />
        <TextField
          id={"lastName"}
          name={"lastName"}
          size={"medium"}
          label={"نام خانوادگی"}
          placeholder={"نام خانوادگی مدیر را وارد کنید"}
        />
        <TextField
          id={"position"}
          name={"position"}
          size={"medium"}
          label={"سمت"}
          placeholder={"سمت شغلی مدیر را وارد کنید"}
        />
        <TextField
          id={"username"}
          name={"username"}
          size={"medium"}
          label={"نام کاربری"}
          placeholder={"نام کاربری را وارد کنید"}
        />
        <TextField
          id={"password"}
          size={"medium"}
          label={"رمز عبور"}
          placeholder={"رمز عبور را وارد کنید"}
          name="password"
        />
      </div>
    </div>
  );
};

export default AdminDetailsForm;
