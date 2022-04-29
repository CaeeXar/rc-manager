import { faAdd } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NextPage } from "next";
import { useState } from "react";
import { Button, Card, Col, Container, FormControl, InputGroup, Modal, Row } from "react-bootstrap";
import SimpleBar from 'simplebar-react';

const FAKE_BUILDS = [
    {
        id: 1,
        name: "5inch build",
        description: "My first 5 inch analog build.",
        specifications: {
            esc: "Mamba F55 128K",
            fc: "Mamba Basic F722 APP",
            motor: "iFlight Xing2 2306 1755KV",
            frame: "ImpulseRC Apex 5\" Base Frame",
            vtx: "TBS Unify Pro 32",
            camera: "RunCam Mr Steele Edition",
            antenna: "Lumenier AXII 2",
            receiver: "SpeedyBee TX800",
            propeller: "HQProp ETHiX P3",
        },
        links: {
            esc: `https://www.rctech.de/diatone-mamba-f50pro-50a-4-in-1-esc.html`,
            fc: `https://www.rctech.de/diatone-mamba-basic-mk4-h743-fc-flugsteuerung.html`,
            motor: `https://n-factory.de/iFlight-Xing2-2306-1755KV-6S-Freestlye-Motor_1`,
            frame: `https://www.rctech.de/impulserc-apex-5-base-frame-kit-schwarz.html`,
            vtx: `https://www.rctech.de/tbs-unify-pro32-nano-5g8.html`,
            camera: `https://n-factory.de/RunCam-Swift-Mini-2-Mr-Steele-Edition_1`,
            antenna: `https://n-factory.de/Lumenier-AXII-2-Antennen-Set-SMA_1`,
            receiver: `https://www.rctech.de/tbs-crossfire-nano-rx-pro-empfaenger.html`,
            propeller: `https://n-factory.de/HQProp-ETHiX-P3-51X3X3-Peanut-Butter-Jelly-Prop_1`,
        }
    },
];

type Project = typeof FAKE_BUILDS[0];

const Builds: NextPage = () => {
    const [filteredBuilds, setFilteredBuilds] = useState(FAKE_BUILDS);
    const [show, setShow] = useState(false);
    const [selected, setSelected] = useState<Project | null>(null);

    const handleClose = () => setShow(false);

    const onBuildSelection = (project: Project) => {
        setSelected(project);
        setShow(true);
    }

    const prepare = (s: string) => {
        if (!s) return "";
        return s.toLowerCase().replace(/[\/\\#,+()$~%.:*?<>{}-]/gm, "");
    }

    const search = (input: string) => {
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
                <InputGroup style={{ marginBottom: "25px" }}>
                    <FormControl type="text" placeholder="Search..." onChange={e => search(e.target.value)} />
                    <Button>
                        <FontAwesomeIcon icon={faAdd} />
                    </Button>
                </InputGroup>

                <SimpleBar forceVisible="y" autoHide={false}>
                    <Row className="g-2">
                        {filteredBuilds.map((build, idx) =>
                        (<Col sm="6" md="6" key={idx}>
                            <Card onClick={e => onBuildSelection(build)}>
                                <Card.Body>
                                    <Card.Title>{build.name}</Card.Title>

                                    <Card.Text>
                                        {build.description}
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>)
                        )}
                    </Row>
                </SimpleBar>
            </Container>

            {!!selected ?
                <Modal show={show} onHide={handleClose} size="lg">
                    <Modal.Header closeButton>
                        <Modal.Title>{selected.name}</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <div style={{ marginBottom: "10px" }}>
                            <b>Description:</b>
                            {selected.description}
                        </div>

                        <div>
                            <b>Specifications:</b>

                            <ul>
                                <li>
                                    <b>ESC: &nbsp;</b>

                                    <a target="_blank" rel="noopener noreferrer" href={selected.links.motor}>
                                        {selected.specifications.esc}
                                    </a>
                                </li>

                                <li>
                                    <b>FC: &nbsp;</b>

                                    <a target="_blank" rel="noopener noreferrer" href={selected.links.motor}>
                                        {selected.specifications.fc}
                                    </a>
                                </li>

                                <li>
                                    <b>Motor: &nbsp;</b>

                                    <a target="_blank" rel="noopener noreferrer" href={selected.links.motor}>
                                        {selected.specifications.motor}
                                    </a>
                                </li>

                                <li>
                                    <b>Frame: &nbsp;</b>

                                    <a target="_blank" rel="noopener noreferrer" href={selected.links.motor}>
                                        {selected.specifications.frame}
                                    </a></li>
                                <li>
                                    <b>VTX: &nbsp;</b>
                                    <a target="_blank" rel="noopener noreferrer" href={selected.links.motor}>
                                        {selected.specifications.vtx}
                                    </a>
                                </li>

                                <li>
                                    <b>Camera: &nbsp;</b>

                                    <a target="_blank" rel="noopener noreferrer" href={selected.links.motor}>
                                        {selected.specifications.camera}
                                    </a>
                                </li>

                                <li>
                                    <b>Antenna/s: &nbsp;</b>
                                    <a target="_blank" rel="noopener noreferrer" href={selected.links.motor}>
                                        {selected.specifications.antenna}
                                    </a>
                                </li>

                                <li>
                                    <b>Receiver: &nbsp;</b>
                                    <a target="_blank" rel="noopener noreferrer" href={selected.links.motor}>
                                        {selected.specifications.receiver}
                                    </a>
                                </li>

                                <li>
                                    <b>Propellers: &nbsp;</b>
                                    <a target="_blank" rel="noopener noreferrer" href={selected.links.motor}>
                                        {selected.specifications.propeller}
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </Modal.Body>
                </Modal> : null}
        </div>
    );
};

export default Builds;