import DangerTonal from "@images/danger-tonal.svg";
import LockTonal from "@images/lock-tonal.svg";
import Button from "@src/components/Button";
import IconButton from "@src/components/IconButton";
import Img from "@src/components/Img";
import Modal from "@src/components/Modal";
import TextField from "@src/components/Textfield";
import { PUT } from "@src/services";
import { CHANGE_ADMIN_PASSWORD, CHANGE_ADMIN_STATUS } from "@src/utils/urls";
import { FC, FormEventHandler, useState } from "react";

type PropTypes = { data: MappedAdminType };

const AdminsRowActions: FC<PropTypes> = (props) => {
  const { data } = props;
  const initErrors = { password: false, confirmPassword: false };
  const [modal, setModal] = useState<"resetPass" | "disableUser" | "">("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState(initErrors);
  const modalTitle = modal === "resetPass" ? "رمز جدید" : "غیرفعال کردن مدیر";
  const modalIcon = (
    <Img
      src={modal === "resetPass" ? LockTonal : DangerTonal}
      size={40}
      ratio={[1, 1]}
    />
  );
  const modalDesc =
    modal === "resetPass"
      ? `رمز جدید کاربر «${data.fullName}» را وارد کنید. با تایید رمز جدید، رمز قبلی اعتبار نخواهد داشت.`
      : `آیا مطمئن هستید که میخواهد کاربر «${data.fullName}» را غیر فعال کنید؟ با اینکار نمیتواند وارد پنل پشتیبانی بشود`;

  const showNewPasswordModal = () => {
    console.log("clicked showNewPasswordModal");
    setModal("resetPass");
  };

  const showDisableUserModal = () => {
    console.log("clicked showDisableUserModal");
    setModal("disableUser");
  };

  const closeModal = () => {
    setModal("");
    setErrors(initErrors);
  };

  const deactiveAdmin = async () => {
    setLoading(true);
    try {
      const response = await PUT(`${CHANGE_ADMIN_STATUS}/${data.adminId}`);
      if (response === true) {
        closeModal();
        window.history.replaceState(null, "", "/admin-management");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const submitChangePassword: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const formData = Object.fromEntries(form);
    let newErrors = { password: false, confirmPassword: false };
    newErrors["password"] = !formData["password"];
    newErrors["confirmPassword"] =
      !formData["confirm-password"] ||
      formData["password"] !== formData["confirm-password"];

    console.log(formData);

    if (Object.values(newErrors).some((er) => er)) {
      setErrors(newErrors);
      /**@todo Show toast here */
      return;
    } else {
      setLoading(true);
      try {
        const response = await PUT(CHANGE_ADMIN_PASSWORD);
        console.log(response);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
  };

  const ResetPassContent = (
    <form onSubmit={submitChangePassword} className="flex flex-col gap-4">
      <TextField
        label="رمز جدید"
        name="password"
        id="password"
        size="medium"
        placeholder="رمز جدید را وارد کنید"
        state={errors.password ? "error" : "default"}
      />
      <TextField
        label="تکرار رمز جدید"
        name="confirm-password"
        id="confirm-password"
        size="medium"
        placeholder="رمز جدید را مجدداً وارد کنید"
        state={errors.confirmPassword ? "error" : "default"}
      />
      <Button
        size={"l"}
        variant={"filled"}
        label="تایید رمز جدید"
        fullWidth
        type="submit"
        loading={loading}
      />
    </form>
  );

  const DeactiveUserContent = (
    <div className="flex gap-2">
      <Button
        size={"l"}
        variant={"outline"}
        fullWidth
        label={"انصراف"}
        onClick={closeModal}
      />
      <Button
        size={"l"}
        variant={"danger"}
        fullWidth
        label={"غیرفعال‌سازی"}
        className="txt"
        loading={loading}
        onClick={deactiveAdmin}
      />
    </div>
  );

  return (
    <>
      <td
        className={`absolute left-4 top-px bottom-px flex gap-2 items-center opacity-0 group-hover:opacity-100 bg-gray-50`}
      >
        <IconButton
          icon="edit"
          className="p-1.5 bg-system-white rounded-lg border border-border-secondary text-xl text-label-primary hover:text-label-basePrimary"
        />
        <IconButton
          icon="reset-password"
          className="p-1.5 bg-system-white rounded-lg border border-border-secondary text-xl text-label-primary hover:text-system-blue"
          clickHandler={showNewPasswordModal}
        />
        <IconButton
          icon="deactive-user"
          className="py-1.5 px-[9px] bg-system-white rounded-lg border border-border-secondary text-xl text-label-primary hover:text-system-warning"
          clickHandler={showDisableUserModal}
        />
      </td>

      {/* Modals */}
      {modal ? (
        <Modal
          onBackdropClick={closeModal}
          onClose={closeModal}
          label={modalTitle}
          supportingText={modalDesc}
          actions={false}
          icon={modalIcon}
          content={
            modal === "resetPass" ? ResetPassContent : DeactiveUserContent
          }
        />
      ) : null}
    </>
  );
};

export default AdminsRowActions;
