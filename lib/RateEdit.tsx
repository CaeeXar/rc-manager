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
import { ChangeEvent, FormEvent, useState } from 'react';
import { useRouter } from 'next/router';
import { Rate, RateType } from '../js/types';
import { getDatetimeISO, getDatetimeLocal } from '../js/util';
import { RatePropsByType } from '../js/const';

const RateEdit: NextPage<{
    rate: Rate;
    edit: boolean;
}> = ({ rate, edit }) => {
    const [title, setTitle] = useState<string>(rate.title);
    const [description, setDescription] = useState<string | null>(rate.description);
    const [rateType, setRateType] = useState<RateType>(
        rate.rateType || RateType.BETAFLIGHT
    );
    const [showError, setShowError] = useState<boolean>(false);

    const [rollValue1, setRollValue1] = useState<number>(
        parseFloat(
            rate[(RatePropsByType[rateType].roll as Array<keyof Rate>)[0]] as string
        ) || 0
    );
    const [rollValue2, setRollValue2] = useState<number | null>(
        parseFloat(
            rate[(RatePropsByType[rateType].roll as Array<keyof Rate>)[1]] as string
        ) || 0
    );
    const [rollValue3, setRollValue3] = useState<number | null>(
        parseFloat(
            rate[(RatePropsByType[rateType].roll as Array<keyof Rate>)[2]] as string
        ) || 0
    );

    const [pitchValue1, setPitchValue1] = useState<number | null>(
        parseFloat(
            rate[(RatePropsByType[rateType].pitch as Array<keyof Rate>)[0]] as string
        ) || 0
    );
    const [pitchValue2, setPitchValue2] = useState<number | null>(
        parseFloat(
            rate[(RatePropsByType[rateType].pitch as Array<keyof Rate>)[1]] as string
        ) || 0
    );
    const [pitchValue3, setPitchValue3] = useState<number | null>(
        parseFloat(
            rate[(RatePropsByType[rateType].pitch as Array<keyof Rate>)[2]] as string
        ) || 0
    );

    const [yawValue1, setYawValue1] = useState<number | null>(
        parseFloat(
            rate[(RatePropsByType[rateType].yaw as Array<keyof Rate>)[0]] as string
        ) || 0
    );
    const [yawValue2, setYawValue2] = useState<number | null>(
        parseFloat(
            rate[(RatePropsByType[rateType].yaw as Array<keyof Rate>)[1]] as string
        ) || 0
    );
    const [yawValue3, setYawValue3] = useState<number | null>(
        parseFloat(
            rate[(RatePropsByType[rateType].yaw as Array<keyof Rate>)[2]] as string
        ) || 0
    );

    const router = useRouter();

    const onSaveHandler = async (event: FormEvent) => {
        event.preventDefault();
        event.stopPropagation();

        let modified = getDatetimeISO();
        let rates: object = {};

        Object.assign(rates, {
            [(RatePropsByType[rateType].roll as Array<keyof Rate>)[0]]: rollValue1,
        });
        Object.assign(rates, {
            [(RatePropsByType[rateType].roll as Array<keyof Rate>)[1]]: rollValue2,
        });
        Object.assign(rates, {
            [(RatePropsByType[rateType].roll as Array<keyof Rate>)[2]]: rollValue3,
        });

        Object.assign(rates, {
            [(RatePropsByType[rateType].pitch as Array<keyof Rate>)[0]]: pitchValue1,
        });
        Object.assign(rates, {
            [(RatePropsByType[rateType].pitch as Array<keyof Rate>)[1]]: pitchValue2,
        });
        Object.assign(rates, {
            [(RatePropsByType[rateType].pitch as Array<keyof Rate>)[2]]: pitchValue3,
        });

        Object.assign(rates, {
            [(RatePropsByType[rateType].yaw as Array<keyof Rate>)[0]]: yawValue1,
        });
        Object.assign(rates, {
            [(RatePropsByType[rateType].yaw as Array<keyof Rate>)[1]]: yawValue2,
        });
        Object.assign(rates, {
            [(RatePropsByType[rateType].yaw as Array<keyof Rate>)[2]]: yawValue3,
        });

        let newRate: Rate = {
            id: rate.id,
            username: rate.username,
            title,
            description,
            modified,
            rateType,
            rollRcRate: null,
            rollRate: null,
            rollExpo: null,
            rollAcroPlus: null,
            rollCurve: null,
            rollCenterSens: null,
            rollMaxRate: null,
            pitchRcRate: null,
            pitchRate: null,
            pitchExpo: null,
            pitchAcroPlus: null,
            pitchCurve: null,
            pitchCenterSens: null,
            pitchMaxRate: null,
            yawRcRate: null,
            yawRate: null,
            yawExpo: null,
            yawAcroPlus: null,
            yawCurve: null,
            yawCenterSens: null,
            yawMaxRate: null,
            ...rates,
        };

        let apiUrl = edit ? '/api/rates/update' : '/api/rates/add';
        const res = await fetch(apiUrl, {
            method: 'POST',
            body: JSON.stringify(newRate),
            headers: { 'Content-Type': 'application/json' },
        });

        if (res.ok) router.push({ pathname: `/rates`, query: {} });
        else setShowError(true);
    };

    const onCancelHandler = async () => {
        router.push({ pathname: `/rates`, query: {} });
    };

    const onDeleteHandler = async () => {
        if (!rate || !rate.id) {
            setShowError(true);
            return;
        }

        const res = await fetch('/api/rates/remove', {
            method: 'POST',
            body: JSON.stringify({ id: rate.id }),
        });
        if (res.ok) router.push({ pathname: `/rates`, query: {} });
        else setShowError(true);
    };

    const onChangeRateTypeHandler = async (
        event: ChangeEvent<HTMLSelectElement>
    ) => {
        setRollValue1(0.0);
        setRollValue2(0.0);
        setRollValue3(0.0);
        setPitchValue1(0.0);
        setPitchValue2(0.0);
        setPitchValue3(0.0);
        setYawValue1(0.0);
        setYawValue2(0.0);
        setYawValue3(0.0);
        setRateType(event.target.value as RateType);
    };

    return (
        <Container>
            {edit ? (
                <div>
                    <h1>
                        <span>Editing: </span>
                        <b className="build-title">{rate.title}</b>
                    </h1>

                    <small className="text-muted">
                        Last modified: <b>{getDatetimeLocal(rate.modified)}</b>
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
                        Title <span className="required">(*)</span>
                    </Form.Label>

                    <Col sm="10">
                        <Form.Control
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
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
                        Description
                    </Form.Label>

                    <Col sm="10">
                        <Form.Select
                            value={rateType}
                            onChange={onChangeRateTypeHandler}
                            required
                        >
                            <option value={''} disabled hidden>
                                Choose battery-type
                            </option>
                            {Object.values(RateType).map((value) => {
                                return (
                                    <option value={value} key={value}>
                                        {RatePropsByType[value].title}
                                    </option>
                                );
                            })}
                        </Form.Select>
                    </Col>
                </Form.Group>

                <Table responsive>
                    <thead>
                        <tr>
                            <th />

                            <th>{RatePropsByType[rateType].colName1}</th>

                            <th>{RatePropsByType[rateType].colName2}</th>

                            <th>{RatePropsByType[rateType].colName3}</th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr>
                            <td>
                                <b>ROLL</b>
                            </td>

                            <td>
                                <Form.Control
                                    type="number"
                                    required
                                    value={rollValue1 || 0}
                                    onChange={(e) =>
                                        setRollValue1(parseFloat(e.target.value))
                                    }
                                />
                            </td>

                            <td>
                                <Form.Control
                                    type="number"
                                    required
                                    value={rollValue2 || 0}
                                    onChange={(e) =>
                                        setRollValue2(parseFloat(e.target.value))
                                    }
                                />
                            </td>

                            <td>
                                <Form.Control
                                    type="number"
                                    required
                                    value={rollValue3 || 0}
                                    onChange={(e) =>
                                        setRollValue3(parseFloat(e.target.value))
                                    }
                                />
                            </td>
                        </tr>

                        <tr>
                            <td>
                                <b>PITCH</b>
                            </td>

                            <td>
                                <Form.Control
                                    type="number"
                                    required
                                    value={pitchValue1 || 0}
                                    onChange={(e) =>
                                        setPitchValue1(parseFloat(e.target.value))
                                    }
                                />
                            </td>

                            <td>
                                <Form.Control
                                    type="number"
                                    required
                                    value={pitchValue2 || 0}
                                    onChange={(e) =>
                                        setPitchValue2(parseFloat(e.target.value))
                                    }
                                />
                            </td>

                            <td>
                                <Form.Control
                                    type="number"
                                    required
                                    value={pitchValue3 || 0}
                                    onChange={(e) =>
                                        setPitchValue3(parseFloat(e.target.value))
                                    }
                                />
                            </td>
                        </tr>

                        <tr>
                            <td>
                                <b>YAW</b>
                            </td>

                            <td>
                                <Form.Control
                                    type="number"
                                    required
                                    value={yawValue1 || 0}
                                    onChange={(e) =>
                                        setYawValue1(parseFloat(e.target.value))
                                    }
                                />
                            </td>

                            <td>
                                <Form.Control
                                    type="number"
                                    required
                                    value={yawValue2 || 0}
                                    onChange={(e) =>
                                        setYawValue2(parseFloat(e.target.value))
                                    }
                                />
                            </td>

                            <td>
                                <Form.Control
                                    type="number"
                                    required
                                    value={yawValue3 || 0}
                                    onChange={(e) =>
                                        setYawValue3(parseFloat(e.target.value))
                                    }
                                />
                            </td>
                        </tr>
                    </tbody>
                </Table>

                <div className="text-end">
                    <Button variant="success" className="me-2" type="submit">
                        Save
                    </Button>

                    <Button
                        variant="secondary"
                        className="me-2"
                        onClick={onCancelHandler}
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

export default RateEdit;
