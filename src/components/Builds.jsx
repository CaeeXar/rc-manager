import { useState } from "react";
import { Button, Card, Col, Container, FormControl, InputGroup, Modal, Row } from "react-bootstrap";
import SimpleBar from 'simplebar-react';

const FAKE_BUILDS = [
    {
        id: 1,
        name: "Super krasser Apex lightweight budget build",
        description: "super ez lightweight build gut für die kohle let's go",
        specifications: {
            esc: "geiler esc",
            fc: "mamba f7",
            motor: "t-motor xing wing xxx",
            frame: "apex hd",
            vtx: "tbs unify pro 32",
            camera: "geile cam",
            antenna: "lumenier axii",
            receiver: "frsky r-xsr",
            propeller: "ethix geile props",
        },
    },
    {
        id: 2,
        name: "novice 4",
        description: "pre build",
        specifications: {
            esc: "",
            fc: "",
            motor: "eachine",
            frame: "",
            vtx: "",
            camera: "",
            antenna: "",
            receiver: "",
            propeller: "",
        },
    },
    {
        id: 3,
        name: "budget",
        description: "gut fürs geld",
        specifications: {
            esc: "",
            fc: "",
            motor: "",
            frame: "",
            vtx: "",
            camera: "",
            antenna: "",
            receiver: "",
            propeller: "",
        },
    },
    {
        id: 4,
        name: "heavy boy",
        description: "heavy boy",
        specifications: {
            esc: "",
            fc: "",
            motor: "",
            frame: "",
            vtx: "",
            camera: "",
            antenna: "",
            receiver: "",
            propeller: "",
        },
    },
];

export default function Builds() {
    const [filteredBuilds, setFilteredBuilds] = useState(FAKE_BUILDS);
    const [show, setShow] = useState(false);
    const [selected, setSelected] = useState(null);

    const handleClose = () => setShow(false);

    const onBuildSelection = (project) => {
        setSelected(project);
        setShow(true);
    }

    const prepare = (s) => {
        if (!s) return "";
        return s.toLowerCase().replace(/[\/\\#,+()$~%.:*?<>{}-]/gm, "");
    }

    const search = (input) => {
        setFilteredBuilds(
            FAKE_BUILDS.filter(build => {
                let buildString = build.name + " " +
                    build.description + " ";
                Object.values(build.specifications).map(val => buildString += val + " ");

                return prepare(buildString).includes(prepare(input));
            })
        );

    };

    return (
        <div>
            <h1 className="title">Manage your own builds!</h1>

            <Container>
                <InputGroup>
                    <FormControl type="text" placeholder="Search..." onChange={e => search(e.target.value)} />
                    <Button>+</Button>
                </InputGroup>
                <br />

                <SimpleBar forceVisible="y" autoHide={false}>
                    <Row className="g-2">
                        {filteredBuilds.map((build, idx) =>
                        (<Col sm="6" md="6" key={idx}>
                            <Card>
                                <Card.Body>
                                    <Card.Title>{build.name}</Card.Title>

                                    <Card.Text>
                                        {build.description}
                                    </Card.Text>

                                    <Button variant="primary" onClick={e => onBuildSelection(build)}>Show more!</Button>
                                </Card.Body>
                            </Card>
                        </Col>)
                        )}
                    </Row>
                </SimpleBar>
            </Container>

            {!!selected ?
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>{selected.name}</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <div style={{ marginBottom: "10px" }}>
                            <u>Description:</u> <br />
                            {selected.description}
                        </div>

                        <div>
                            <u>Specifications:</u>

                            <ul>
                                <li><b>ESC:</b> {selected.specifications.esc}</li>
                                <li><b>FC:</b> {selected.specifications.fc}</li>
                                <li><b>Motor:</b> {selected.specifications.motor}</li>
                                <li><b>Frame:</b> {selected.specifications.frame}</li>
                                <li><b>VTX:</b> {selected.specifications.vtx}</li>
                                <li><b>Camera:</b> {selected.specifications.camera}</li>
                                <li><b>Antenna/s:</b> {selected.specifications.antenna}</li>
                                <li><b>Receiver:</b> {selected.specifications.receiver}</li>
                                <li><b>Propellers:</b> {selected.specifications.propeller}</li>
                            </ul>
                        </div>
                    </Modal.Body>
                </Modal> : null}
        </div>
    );
};