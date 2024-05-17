import { NextPage } from "next";
import { useSession } from "next-auth/react";
import { Build } from "../../js/types";
import BuildEdit from "../../lib/BuildEdit";

const Edit: NextPage = () => {
  const { data: session, status } = useSession();
  let username = "";

  if (session && session.user && session?.user.name)
    username = session?.user?.name;
  else return <small>Error</small>;

  const build: Build = {
    id: null,
    username,
    title: "",
    description: "",
    escName: "",
    escLink: null,
    fcName: "",
    fcLink: null,
    motorName: "",
    motorLink: null,
    frameName: "",
    frameLink: null,
    vtxName: "",
    vtxLink: null,
    antennaName: "",
    antennaLink: null,
    cameraName: "",
    cameraLink: null,
    receiverName: "",
    receiverLink: null,
    propellerName: "",
    propellerLink: null,
    modified: null,
  };
  return <BuildEdit build={build} edit={false} />;
};

export default Edit;
