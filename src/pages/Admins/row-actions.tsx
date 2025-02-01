import IconButton from "@src/components/IconButton";
import Modal from "@src/components/Modal";
import { FC, useState } from "react";

type PropTypes = { data: MappedAdminType };

const AdminsRowActions: FC<PropTypes> = (props) => {
  const { data } = props;
  const [modal, setModal] = useState<"resetPass" | "disableUser" | "">("");

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
  };

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
          onCancel={closeModal}
          label="label"
          supportingText={`آیا مطمئن هستید که میخواهد کاربر «${data.fullName}» را غیر فعال کنید؟ با اینکار نمیتواند وارد پنل پشتیبانی بشود`}
        />
      ) : null}
    </>
  );
};

export default AdminsRowActions;
