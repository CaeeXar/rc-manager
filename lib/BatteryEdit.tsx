import { NextPage } from 'next';
import {
    Button,
    Col,
    Container,
    Form,
    Row,
    Table,
    Toast,
    ToastContainer,
} from 'react-bootstrap';
import { FormEvent, useState } from 'react';
import { useRouter } from 'next/router';
import { Battery, BatteryType } from '../js/types';
import { getBatteryTypeText, getDatetimeISO, getDatetimeLocal } from '../js/util';

const BatteryEdit: NextPage<{
    battery: Battery;
    edit: boolean;
}> = ({ battery, edit }) => {
    const [brand, setBrand] = useState(battery.brand);
    const [description, setDescription] = useState(battery.description);
    const [capacity, setCapacity] = useState(battery.capacity);
    const [cells, setCells] = useState(battery.cells);
    const [link, setLink] = useState(battery.link);
    const [batteryType, setBatteryType] = useState(battery.batteryType);
    const [showError, setShowError] = useState<boolean>(false);

    const router = useRouter();

    const onSaveHandler = async (event: FormEvent) => {
        event.preventDefault();
        event.stopPropagation();

        let modified = getDatetimeISO();
        let newBattery: Battery = {
            id: battery.id,
            username: battery.username,
            brand,
            description,
            capacity,
            cells,
            link,
            batteryType,
            created: !edit ? modified : battery.created,
            modified,
        };

        let apiUrl = edit ? '/api/batteries/update' : '/api/batteries/add';
        const res = await fetch(apiUrl, {
            method: 'POST',
            body: JSON.stringify(newBattery),
            headers: { 'Content-Type': 'application/json' },
        });

        if (res.ok) router.push({ pathname: `/batteries`, query: {} });
        else setShowError(true);
    };

    const onCloseHandler = async () => {
        router.push({ pathname: `/batteries`, query: {} });
    };

    const onDeleteHandler = async () => {
        if (!battery || !battery.id) {
            setShowError(true);
            return;
        }

        const res = await fetch('/api/batteries/remove', {
            method: 'POST',
            body: JSON.stringify({ id: battery.id }),
        });
        if (res.ok) router.push({ pathname: `/batteries`, query: {} });
        else setShowError(true);
    };

    return (
        <Container>
            {edit ? (
                <div>
                    <h1>
                        <span>Editing: </span>
                        <b className="build-title">
                            #{battery.id} {battery.brand}
                        </b>
                    </h1>

                    <small className="text-muted">
                        Last modified: <b>{getDatetimeLocal(battery.modified)}</b>
                    </small>

                    <hr className="title" />
                </div>
            ) : (
                <div>
                    <h1>
                        <span>New</span>
                    </h1>

                    <hr className="title" />
                </div>
            )}

            <Form onSubmit={(e) => onSaveHandler(e)}>
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm="2">
                        Brand <span className="required">(*)</span>
                    </Form.Label>

                    <Col sm="10">
                        <Form.Control
                            type="text"
                            value={brand}
                            onChange={(e) => setBrand(e.target.value)}
                            required
                        />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm="2">
                        Description
                    </Form.Label>

                    <Col sm="10">
                        <Form.Control
                            as="textarea"
                            rows={2}
                            value={description || ''}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm="2">
                        Capacity <span className="required">(*)</span>
                    </Form.Label>

                    <Col sm="10">
                        <Form.Control
                            type="number"
                            value={capacity}
                            onChange={(e) => setCapacity(parseInt(e.target.value))}
                            required
                        />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm="2">
                        Cells <span className="required">(*)</span>
                    </Form.Label>

                    <Col sm="10">
                        <Form.Control
                            type="number"
                            value={cells}
                            onChange={(e) => setCells(parseInt(e.target.value))}
                            required
                        />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm="2">
                        Battery-Type <span className="required">(*)</span>
                    </Form.Label>

                    <Col sm="10">
                        <Form.Select
                            value={batteryType}
                            onChange={(e) =>
                                setBatteryType(e.target.value as BatteryType)
                            }
                            required
                        >
                            <option value={''} disabled hidden>
                                Choose battery-type
                            </option>
                            {Object.values(BatteryType).map((value) => {
                                return (
                                    <option value={value} key={value}>
                                        {getBatteryTypeText(value as BatteryType)}
                                    </option>
                                );
                            })}
                        </Form.Select>
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm="2">
                        Where to buy?
                    </Form.Label>

                    <Col sm="10">
                        <Form.Control
                            type="text"
                            value={link || ''}
                            onChange={(e) => setLink(e.target.value)}
                        />
                    </Col>
                </Form.Group>

                <div className="text-end">
                    <Button variant="success" className="me-2" type="submit">
                        Save
                    </Button>

                    <Button
                        variant="secondary"
                        className="me-2"
                        onClick={onCloseHandler}
                    >
                        Cancel
                    </Button>

                    {edit && (
                        <Button
                            variant="danger"
                            className="me-2"
                            onClick={onDeleteHandler}
                        >
                            Delete
                        </Button>
                    )}
                </div>
            </Form>

            <ToastContainer position="middle-center" className="position-fixed">
                <Toast
                    show={!!showError}
                    onClose={() => setShowError(false)}
                    bg={'danger'}
                >
                    <Toast.Header>
                        <strong className="me-auto">Error</strong>
                    </Toast.Header>

                    <Toast.Body>Something went wrong!</Toast.Body>
                </Toast>
            </ToastContainer>
        </Container>
    );
};

export default BatteryEdit;
