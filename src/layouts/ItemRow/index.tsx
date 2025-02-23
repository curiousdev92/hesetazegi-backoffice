import Divider from "@src/components/Divider";
import FontIcon from "@src/components/FontIcon";
import Img from "@src/components/Img";
import { FC, MouseEventHandler, useState } from "react";

type actionType = "edit" | "delete" | "copy" | "pin";

type PropTypes = {
  data: { date: number; title: string; image: string; key: string };
  locales: LocalesType[];
  actions: actionType[];
  divider?: boolean;
  link?: string;
};

const ItemRow: FC<PropTypes> = (props) => {
  const { data, locales = ["fa"], actions, divider, link } = props;
  const [pinned, setPinned] = useState(false);
  const actionIcons = {
    edit: "edit",
    delete: "delete",
    copy: "copy-link",
    pin: "pin",
  };
  const actionColors = {
    edit: "bg-system-white text-label-primary hover:text-label-basePrimary",
    delete: "bg-system-white text-label-primary hover:text-system-danger",
    copy: "bg-system-white text-label-primary hover:text-system-blue",
    pin: pinned
      ? "bg-system-secondary text-system-white"
      : "bg-system-white text-label-primary hover:text-system-secondary",
  };

  const onActionClick: MouseEventHandler<HTMLButtonElement> = (e) => {
    const action = e.currentTarget.id as actionType;
    const actions = {
      edit: goToEditPage,
      delete: deleteRow,
      copy: doCopy,
      pin: pinItem,
    };
    if (!!actions[action]) {
      actions[action](action);
    }
  };

  const goToEditPage = (action: actionType) => {
    /** @todo Call onEdit from props */
  };

  const deleteRow = (action: actionType) => {
    /** @todo Call onDelete from props */
  };

  const doCopy = (action: actionType) => {
    /** @todo Copy item {link} from props to clipboard. */
  };

  const pinItem = () => {
    setPinned(!pinned);
  };

  return (
    <div
      className={`w-full ${
        pinned
          ? "order-1 bg-gradient-to-l from-system-secondary/10 to-system-white/10"
          : "order-2"
      }`}
    >
      <div className="py-2 px-3 flex items-center gap-10 grid-cols-2 hover:bg-gray-50 group">
        <div
          className="grow grid gap-6 items-center text-ellipsis"
          style={{
            gridTemplateColumns: `2.5rem 1fr repeat(${locales.length}, minmax(0,7.125rem)`,
          }}
        >
          <div className="relative">
            <Img
              src={data.image}
              size={40}
              ratio={[1, 1]}
              className="rounded"
            />
            {pinned ? (
              <span className="bg-system-secondary text-label-baseWhite absolute -top-0.5 -left-0.5 shadow-[0_0_0_1.5px_white] rounded-full p-1">
                <FontIcon icon="pin" className="text-[10px]" />
              </span>
            ) : null}
          </div>
          <p className="text-label-primary text-body-md">{data.title}</p>
        </div>
        <div className="w-[72px] min-w-fit text-label-secondary text-body-md overflow-x-hidden">
          <span className="group-hover:hidden">
            {data.date ? new Date(data.date).toLocaleDateString("fa") : "NA"}
          </span>
          <div
            className="hidden group-hover:grid gap-2 items-center"
            style={{ gridTemplateColumns: `repeat(${actions.length}, 2rem)` }}
          >
            {actions.map((action) => (
              <button
                key={action}
                id={action}
                className={`border border-border-secondary rounded-lg p-1 ${actionColors[action]}`}
                onClick={onActionClick}
              >
                <FontIcon
                  icon={actionIcons[action]}
                  className={`text-xl w-5 h-5 ${
                    pinned && action === "pin" ? "-rotate-45" : ""
                  }`}
                />
              </button>
            ))}
          </div>
        </div>
      </div>
      {divider ? (
        <Divider horizontal="horizontal2" horizontalType="right-inset" />
      ) : null}
    </div>
  );
};
export default ItemRow;
