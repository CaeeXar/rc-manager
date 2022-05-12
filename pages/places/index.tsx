import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { GetServerSideProps, NextPage } from 'next';
import { getSession } from 'next-auth/react';
import { useState } from 'react';
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
    Image,
} from 'react-bootstrap';
import SimpleBar from 'simplebar-react';
import { Place } from '../../js/types';
import { getDatetimeLocal, prepareTextSearch } from '../../js/util';

const Places: NextPage<{ places: Place[] }> = ({ places }) => {
    const [filteredPlaces, setFilteredPlaces] = useState(places);
    const [selected, setSelected] = useState<Place | null>(null);
    const [show, setShow] = useState(false);

    const search = (input: string) => {
        setFilteredPlaces(
            places.filter((place: Place) => {
                let buildString = Object.values(place)
                    .map((value) => '' + value)
                    .join(' ');
                return prepareTextSearch(buildString).includes(
                    prepareTextSearch(input)
                );
            })
        );
    };

    const onSelectHandler = (palce: Place) => {
        setSelected(palce);
        setShow(true);
    };

    const onCloseHandler = () => setShow(false);

    return (
        <Container className="places">
            <h1 className="title">Places to rip.</h1>

            <div>
                <InputGroup style={{ marginBottom: '25px' }}>
                    <FormControl
                        type="text"
                        placeholder="Search..."
                        onChange={(e) => search(e.target.value)}
                    />
                    <Button>
                        <FontAwesomeIcon icon={['fas', 'add']} />
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
                <Modal
                    show={show}
                    onHide={onCloseHandler}
                    size="lg"
                    className="places"
                >
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
                                              url('/${selected.imgPath}')`,
                                      }
                                    : {}
                            }
                        >
                            <div className="hero-text">
                                <span className="h4 hero-title">
                                    {selected.title}
                                </span>

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
                                            Open map here{' '}
                                            <FontAwesomeIcon
                                                icon={['fas', 'map-location-dot']}
                                            />
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
                            <Button className="me-2">
                                <FontAwesomeIcon icon={['fas', 'edit']} />
                            </Button>

                            <Button variant="danger">
                                <FontAwesomeIcon icon={['fas', 'trash']} />
                            </Button>
                        </div>
                    </Modal.Footer>
                </Modal>
            ) : null}
        </Container>
    );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
    const session = await getSession(context);
    if (!session) return { props: {} };
    const username = session.user?.name;

    const res = await fetch(process.env.NEXTAUTH_URL + '/api/places/get', {
        method: 'POST',
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
