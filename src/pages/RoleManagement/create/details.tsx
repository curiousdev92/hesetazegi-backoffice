import DefaultAvatar from "@images/default-avatar.svg";
import Img from "@src/components/Img";
import Spinner from "@src/components/Spinner";
import TextField from "@src/components/Textfield";
import { uuid } from "@src/utils/helpers";
import { BASE_URL_UPLOAD } from "@src/utils/urls";
import { ChangeEventHandler, FC, useState } from "react";

type PropTypes = {
  errors: { title: boolean; description: boolean; image: boolean };
  data?: { roleId: string; image: string; title: string };
};

const CreateRolesDetails: FC<PropTypes> = (props) => {
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
          uploadData.append("key", data?.roleId || uuid());
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
    <section className="basis-[42%] rounded-xl border border-border-secondary overflow-hidden">
      <div className="w-full h-12 py-3 px-4 bg-content-tertiary">
        <p className="text-label-lg text-label-primary text-right">مشخصات </p>
      </div>
      <div className="w-full flex flex-col gap-4 p-4 overflow-auto mb-auto">
        <label htmlFor="avatar" className="mx-auto w-fit cursor-pointer">
          <input type="text" hidden name="image" value={avatar} readOnly />
          <input type="file" id="avatar" hidden onChange={handleAvatarChange} />
          <div
            className={`rounded-full border ${
              errors.image ? "border-system-danger" : "border-border-tertiary"
            } grid place-content-center overflow-hidden`}
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
          id={"title"}
          name={"title"}
          size={"medium"}
          label={"نام"}
          placeholder={"نام نقش را وارد کنید"}
          state={errors?.title ? "error" : "default"}
          defaultValue={data?.title}
        />
        <div className="w-full flex flex-col gap-2 items-start justify-start">
          <label
            className="text-label-md text-label-primary"
            htmlFor="description"
          >
            توضیحات
          </label>
          <textarea
            placeholder={"توضیحات این نقش را وارد کنید"}
            name="description"
            id="description"
            className={`w-full py-2.5 px-3 border ${
              errors.description
                ? "border-system-danger"
                : "border-border-secondary"
            } bg-system-white rounded-xl h-[243px] text-body-md hover:bg-gray-50 focus:border-border-basePrimary focus-visible:outline-none peer peer-valid:text-label-primary`}
          />
        </div>
      </div>
    </section>
  );
};

export default CreateRolesDetails;
