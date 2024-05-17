import { GetServerSideProps, NextPage } from "next";
import { getSession } from "next-auth/react";
import { Rate } from "../../js/types";
import RateEdit from "../../lib/RateEdit";

const Edit: NextPage<{
  rate: Rate;
}> = ({ rate }) => {
  return <RateEdit rate={rate} edit={true} />;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);
  const { id } = context.query;

  if (!session || !id)
    return {
      props: {},
    };

  const username = session.user?.name;
  const res = await fetch(process.env.NEXTAUTH_URL + "/api/rates/getById", {
    method: "POST",
    body: JSON.stringify({
      username,
      id: +id,
    }),
  });
  const rate: Rate = await res.json();

  return {
    props: {
      rate,
    },
  };
};

export default Edit;
