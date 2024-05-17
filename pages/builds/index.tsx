import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { GetServerSideProps, NextPage } from "next";
import { useState } from "react";
import {
  Button,
  Card,
  CloseButton,
  Col,
  Container,
  FormControl,
  InputGroup,
  Modal,
  Row,
  Table,
  Toast,
  ToastContainer,
} from "react-bootstrap";
import SimpleBar from "simplebar-react";
import { getSession } from "next-auth/react";
import { Build } from "../../js/types";
import { getDatetimeLocal, prepareTextSearch } from "../../js/util";
import { useRouter } from "next/router";

const Builds: NextPage<{ builds: Build[] }> = ({ builds }) => {
  const router = useRouter();

  const [filteredBuilds, setFilteredBuilds] = useState(builds);
  const [show, setShow] = useState(false);
  const [selected, setSelected] = useState<Build | null>(null);
  const [showError, setShowError] = useState<boolean>(false);

  const onCloseHandler = () => setShow(false);

  const onBuildSelection = (build: Build) => {
    setSelected(build);
    setShow(true);
  };

  const search = (input: string) => {
    setFilteredBuilds(
      builds.filter((build: Build) => {
        let buildString = Object.values(build)
          .map((value) => "" + value)
          .join(" ");
        return prepareTextSearch(buildString).includes(
          prepareTextSearch(input)
        );
      })
    );
  };

  const refreshPage = () => {
    router.reload();
  };

  const onEditHandler = async () => {
    if (!selected) return;
    router.push({ pathname: `/builds/[id]`, query: { id: selected.id } });
  };

  const onRemoveHandler = async () => {
    if (!selected) return;

    const res = await fetch("/api/builds/remove", {
      method: "POST",
      body: JSON.stringify({ id: selected.id }),
    });

    if (res.ok) refreshPage();
    else setShowError(true);
  };

  const onAddHandler = async () => {
    router.push({ pathname: `/builds/new`, query: {} });
  };

  return (
    <Container>
      <h1 className="title">Manage your own builds!</h1>

      <div>
        <InputGroup style={{ marginBottom: "25px" }}>
          <FormControl
            type="text"
            placeholder="Search..."
            onChange={(e) => search(e.target.value)}
          />
          <Button onClick={onAddHandler}>
            <FontAwesomeIcon icon={["fas", "add"]} />
          </Button>
        </InputGroup>

        <SimpleBar forceVisible="y" autoHide={false}>
          <Row className="g-2">
            {filteredBuilds.map((build: Build) => (
              <Col sm="6" md="6" key={build.id}>
                <Card onClick={(e) => onBuildSelection(build)}>
                  <Card.Body>
                    <Card.Title>{build.title}</Card.Title>

                    <Card.Text>{build.description}</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </SimpleBar>
      </div>

      {!!selected ? (
        <Modal show={show} onHide={onCloseHandler} size="lg">
          <Modal.Header>
            <Modal.Title>
              <b>{selected.title}</b>
            </Modal.Title>

            <CloseButton variant="white" onClick={onCloseHandler} />
          </Modal.Header>

          <Modal.Body>
            <div style={{ marginBottom: "25px" }}>
              <b className="build-desc h5 build-title">Description: </b>
              <span>{selected.description}</span>
            </div>

            <div>
              <b className="h5 build-title">Specifications:</b>

              <Table responsive>
                <tbody>
                  <tr>
                    <td>
                      <b>ESC:</b>
                    </td>

                    <td>
                      <a
                        target="_blank"
                        rel="noopener noreferrer"
                        href={selected.escLink || ""}
                      >
                        {selected.escName}
                      </a>
                    </td>
                  </tr>

                  <tr>
                    <td>
                      <b>FC:</b>
                    </td>

                    <td>
                      <a
                        target="_blank"
                        rel="noopener noreferrer"
                        href={selected.fcLink || ""}
                      >
                        {selected.fcName}
                      </a>
                    </td>
                  </tr>

                  <tr>
                    <td>
                      <b>Motor:</b>
                    </td>

                    <td>
                      <a
                        target="_blank"
                        rel="noopener noreferrer"
                        href={selected.motorLink || ""}
                      >
                        {selected.motorName}
                      </a>
                    </td>
                  </tr>

                  <tr>
                    <td>
                      <b>Frame:</b>
                    </td>

                    <td>
                      <a
                        target="_blank"
                        rel="noopener noreferrer"
                        href={selected.frameLink || ""}
                      >
                        {selected.frameName}
                      </a>
                    </td>
                  </tr>

                  <tr>
                    <td>
                      <b>VTX:</b>
                    </td>

                    <td>
                      <a
                        target="_blank"
                        rel="noopener noreferrer"
                        href={selected.vtxLink || ""}
                      >
                        {selected.vtxName}
                      </a>
                    </td>
                  </tr>

                  <tr>
                    <td>
                      <b>Camera:</b>
                    </td>

                    <td>
                      <a
                        target="_blank"
                        rel="noopener noreferrer"
                        href={selected.cameraLink || ""}
                      >
                        {selected.cameraName}
                      </a>
                    </td>
                  </tr>

                  <tr>
                    <td>
                      <b>Antenna:</b>
                    </td>

                    <td>
                      <a
                        target="_blank"
                        rel="noopener noreferrer"
                        href={selected.antennaLink || ""}
                      >
                        {selected.antennaName}
                      </a>
                    </td>
                  </tr>

                  <tr>
                    <td>
                      <b>Receiver:</b>
                    </td>

                    <td>
                      <a
                        target="_blank"
                        rel="noopener noreferrer"
                        href={selected.receiverLink || ""}
                      >
                        {selected.receiverName}
                      </a>
                    </td>
                  </tr>

                  <tr>
                    <td>
                      <b>Propellers:</b>
                    </td>

                    <td>
                      <a
                        target="_blank"
                        rel="noopener noreferrer"
                        href={selected.propellerLink || ""}
                      >
                        {selected.propellerName}
                      </a>
                    </td>
                  </tr>
                </tbody>
              </Table>
            </div>
          </Modal.Body>

          <Modal.Footer>
            <div>
              <b>Edited: </b>

              <span>{getDatetimeLocal(selected.modified)}</span>
            </div>

            <div>
              <Button className="me-2" onClick={onEditHandler}>
                <FontAwesomeIcon icon={["fas", "edit"]} />
              </Button>

              <Button variant="danger" onClick={onRemoveHandler}>
                <FontAwesomeIcon icon={["fas", "trash"]} />
              </Button>
            </div>
          </Modal.Footer>
        </Modal>
      ) : null}

      <ToastContainer position="middle-center">
        <Toast
          show={!!showError}
          onClose={() => setShowError(false)}
          bg={"danger"}
        >
          <Toast.Header>
            <strong className="me-auto">Warning</strong>
          </Toast.Header>

          <Toast.Body>Something went wrong!</Toast.Body>
        </Toast>
      </ToastContainer>
    </Container>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);
  if (!session) return { props: {} };
  const username = session.user?.name;

  const res = await fetch(process.env.NEXTAUTH_URL + "/api/builds/get", {
    method: "POST",
    body: JSON.stringify({ username }),
  });

  const data = await res.json();
  const builds: Build[] = data.builds;

  return {
    props: {
      builds: builds,
    },
  };
};

export default Builds;
