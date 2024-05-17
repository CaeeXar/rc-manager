import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { GetServerSideProps, NextPage } from "next";
import { getSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";
import {
  Card,
  Col,
  Container,
  FormControl,
  InputGroup,
  Row,
  Button,
  Modal,
  CloseButton,
  ToastContainer,
  Toast,
} from "react-bootstrap";
import SimpleBar from "simplebar-react";
import { Place } from "../../js/types";
import { getDatetimeLocal, prepareTextSearch } from "../../js/util";

const Places: NextPage<{ places: Place[] }> = ({ places }) => {
  const [filteredPlaces, setFilteredPlaces] = useState(places);
  const [selected, setSelected] = useState<Place | null>(null);
  const [show, setShow] = useState(false);
  const [showError, setShowError] = useState<boolean>(false);

  const router = useRouter();

  const search = (input: string) => {
    setFilteredPlaces(
      places.filter((place: Place) => {
        let buildString = Object.values(place)
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

  const onSelectHandler = (place: Place) => {
    setSelected(place);
    setShow(true);
  };

  const onCloseHandler = () => setShow(false);

  const onEditHandler = async () => {
    if (!selected) return;
    router.push({ pathname: `/places/[id]`, query: { id: selected.id } });
  };

  const onRemoveHandler = async () => {
    if (!selected) return;

    const res = await fetch("/api/places/remove", {
      method: "POST",
      body: JSON.stringify({ id: selected.id }),
    });

    if (res.ok) refreshPage();
    else setShowError(true);
  };

  const onAddHandler = async () => {
    router.push({ pathname: `/places/new`, query: {} });
  };

  return (
    <Container className="places">
      <h1 className="title">Places to rip</h1>

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
            {filteredPlaces.map((place: Place) => (
              <Col sm="6" md="6" key={place.id}>
                <Card onClick={() => onSelectHandler(place)}>
                  <Card.Body>
                    <Card.Title>{place.title}</Card.Title>

                    <Card.Text>{place.description}</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </SimpleBar>
      </div>

      {!!selected ? (
        <Modal show={show} onHide={onCloseHandler} size="lg" className="places">
          <Modal.Header>
            <Modal.Title>
              <b># {selected.id}</b>
            </Modal.Title>

            <CloseButton variant="white" onClick={onCloseHandler} />
          </Modal.Header>

          <Modal.Body>
            <div
              className="container hero-background"
              style={
                !!selected.imgPath
                  ? {
                      backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0.75)), 
                                              url('/api/places/images/${selected.imgPath}')`,
                    }
                  : {}
              }
            >
              <div className="hero-text">
                <span className="h4 hero-title">{selected.title}</span>

                <div>
                  <span className="h5">
                    <b>Description</b>
                  </span>

                  <p>{selected.description}</p>
                </div>

                <div>
                  <span className="h5">
                    <b>Navigate</b>
                  </span>

                  <p>
                    <a
                      target="_blank"
                      rel="noreferrer"
                      href={selected.googleMapsLink}
                      className="text-decoration-none"
                    >
                      Open map here{" "}
                      <FontAwesomeIcon icon={["fas", "map-location-dot"]} />
                    </a>
                  </p>
                </div>
              </div>
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

  const res = await fetch(process.env.NEXTAUTH_URL + "/api/places/get", {
    method: "POST",
    body: JSON.stringify({ username }),
  });

  const data = await res.json();
  const places: Place[] = data.places;

  return {
    props: {
      places: places,
    },
  };
};

export default Places;
