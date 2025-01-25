import Button from "@src/components/Button";
import { FC } from "react";
import { Link } from "react-router";

type PropTypes = {};

const UnAuthorizedPage: FC<PropTypes> = (props) => {
  const {} = props;

  return (
    <div>
      <h1>UnAuthorizedPage</h1>
      <Link to={"/login"}>
        <Button size={"xl"} variant={"filled"} label={"Login"} />
      </Link>
    </div>
  );
};
export default UnAuthorizedPage;
