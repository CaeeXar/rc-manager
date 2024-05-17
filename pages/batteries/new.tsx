import { NextPage } from "next";
import { useSession } from "next-auth/react";
import { Battery, BatteryType } from "../../js/types";
import BatteryEdit from "../../lib/BatteryEdit";

const Edit: NextPage = () => {
  const { data: session, status } = useSession();
  let username = "";

  if (session && session.user && session?.user.name)
    username = session?.user?.name;
  else return <small>Error</small>;

  const battery: Battery = {
    id: null,
    username,
    brand: "",
    description: null,
    capacity: 0,
    cells: 0,
    link: null,
    batteryType: BatteryType.LIPO,
    created: null,
    modified: null,
  };
  return <BatteryEdit battery={battery} edit={false} />;
};

export default Edit;
