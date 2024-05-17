import { NextPage } from "next";
import { Spinner } from "react-bootstrap";

const Loader: NextPage = () => {
  return (
    <div className="loader">
      <p className="h5 mb-4">Loading...</p>
      <Spinner animation="border" />
    </div>
  );
};

export default Loader;
