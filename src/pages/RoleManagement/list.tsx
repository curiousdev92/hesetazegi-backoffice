import DangerTonal from "@images/danger-tonal.svg";
import EmptyStateImage from "@src/assets/images/empty-state.png";
import Button from "@src/components/Button";
import PermissionCard from "@src/components/Cards/permission-card";
import EmptyState from "@src/components/EmptyState";
import Img from "@src/components/Img";
import Modal from "@src/components/Modal";
import Spinner from "@src/components/Spinner";
import { DELETE, GET } from "@src/services";
import {
  DELETE_ADMIN_PERMISSIONS,
  GET_ADMIN_PERMISSIONS,
} from "@src/utils/urls";
import { FC, useEffect, useState } from "react";
import Header from "./header";

type PropTypes = {};

const RoleManagementPage: FC<PropTypes> = (props) => {
  const {} = props;
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState<any>("");
  const [permissions, setPermissions] = useState<roleItemType[]>([]);

  const fetchPermissions = async () => {
    try {
      const fetchedPermissions = (await GET(
        GET_ADMIN_PERMISSIONS
      )) as roleItemType[];
      setPermissions(fetchedPermissions);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const openDeleteModal = (data: roleItemType) => {
    setModal(data.adminGroupId);
  };

  const closeModal = () => {
    setModal("");
  };

  const deletePermission = async () => {
    setLoading(true);
    try {
      const response = await DELETE(`${DELETE_ADMIN_PERMISSIONS}/${modal}`);
      console.log(response);
      closeModal();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPermissions();
  }, []);

  return (
    <section className="flex flex-col w-full h-full">
      <Header />
      <div className="flex flex-col gap-4 w-full h-full p-4 overflow-auto">
        <div className="flex flex-wrap gap-4">
          {loading ? (
            <div className="grid place-items-center h-full">
              <Spinner size="m" />
            </div>
          ) : permissions.length === 0 ? (
            <div className="grid place-items-center h-full">
              <EmptyState
                className="self-center"
                size={"l"}
                description={"داده ای برای نمایش وجود ندارد"}
                imgSrc={EmptyStateImage}
              />
            </div>
          ) : (
            permissions.map((permission) => (
              <PermissionCard
                permission={permission}
                onDeleteRole={openDeleteModal}
                key={permission.adminGroupId}
              />
            ))
          )}
        </div>
      </div>

      {/* Delete Modal */}
      {modal ? (
        <Modal
          onBackdropClick={closeModal}
          onClose={closeModal}
          label="حذف نقش"
          supportingText={`آیا مطمعن هستید که میخواهد نقش ${modal.title} را حذف کنید؟`}
          icon={<Img src={DangerTonal} size={40} ratio={[1, 1]} />}
          content={
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
                label={"حذف نقش"}
                className="txt"
                loading={loading}
                onClick={deletePermission}
              />
            </div>
          }
        />
      ) : null}
    </section>
  );
};
export default RoleManagementPage;
