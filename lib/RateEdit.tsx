import { NextPage } from "next";
import {
  Button,
  Col,
  Container,
  Form,
  Row,
  Table,
  Toast,
  ToastContainer,
} from "react-bootstrap";
import { ChangeEvent, FormEvent, useState } from "react";
import { useRouter } from "next/router";
import { Rate, RateType } from "../js/types";
import { getDatetimeISO, getDatetimeLocal } from "../js/util";
import { RatePropsByType } from "../js/const";
import { NumericFormat, NumberFormatValues } from "react-number-format";

const RateEdit: NextPage<{
  rate: Rate;
  edit: boolean;
}> = ({ rate, edit }) => {
  const [title, setTitle] = useState<string>(rate.title);
  const [description, setDescription] = useState<string | null>(
    rate.description
  );
  const [rateType, setRateType] = useState<RateType>(
    rate.rateType || RateType.BETAFLIGHT
  );
  const [showError, setShowError] = useState<boolean>(false);

  const [rollValue1, setRollValue1] = useState(
    rate[RatePropsByType[rateType].roll[0]] || 0
  );
  const [rollValue2, setRollValue2] = useState(
    rate[RatePropsByType[rateType].roll[1]] || 0
  );
  const [rollValue3, setRollValue3] = useState(
    rate[RatePropsByType[rateType].roll[2]] || 0
  );

  const [pitchValue1, setPitchValue1] = useState(
    rate[RatePropsByType[rateType].pitch[0]] || 0
  );
  const [pitchValue2, setPitchValue2] = useState(
    rate[RatePropsByType[rateType].pitch[1]] || 0
  );
  const [pitchValue3, setPitchValue3] = useState(
    rate[RatePropsByType[rateType].pitch[2]] || 0
  );

  const [yawValue1, setYawValue1] = useState(
    rate[RatePropsByType[rateType].yaw[0]] || 0
  );
  const [yawValue2, setYawValue2] = useState(
    rate[RatePropsByType[rateType].yaw[1]] || 0
  );
  const [yawValue3, setYawValue3] = useState(
    rate[RatePropsByType[rateType].yaw[2]] || 0
  );

  const router = useRouter();

  const onSaveHandler = async (event: FormEvent) => {
    event.preventDefault();
    event.stopPropagation();

    let modified = getDatetimeISO();
    let newRate = {
      id: rate.id,
      username: rate.username,
      title,
      description,
      modified,
      rateType,
      [RatePropsByType[rateType].roll[0]]: rollValue1,
      [RatePropsByType[rateType].roll[1]]: rollValue2,
      [RatePropsByType[rateType].roll[2]]: rollValue3,
      [RatePropsByType[rateType].pitch[0]]: pitchValue1,
      [RatePropsByType[rateType].pitch[1]]: pitchValue2,
      [RatePropsByType[rateType].pitch[2]]: pitchValue3,
      [RatePropsByType[rateType].yaw[0]]: yawValue1,
      [RatePropsByType[rateType].yaw[1]]: yawValue2,
      [RatePropsByType[rateType].yaw[2]]: yawValue3,
    } as Rate;

    let apiUrl = edit ? "/api/rates/update" : "/api/rates/add";
    const res = await fetch(apiUrl, {
      method: "POST",
      body: JSON.stringify(newRate),
      headers: { "Content-Type": "application/json" },
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

    const res = await fetch("/api/rates/remove", {
      method: "POST",
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
              value={description || ""}
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
              <option value={""} disabled hidden>
                Choose rate-type
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
                <NumericFormat
                  customInput={Form.Control}
                  decimalScale={2}
                  fixedDecimalScale
                  decimalSeparator=","
                  value={rollValue1}
                  onValueChange={(values: NumberFormatValues) => {
                    setRollValue1(values.floatValue || 0.0);
                  }}
                />
              </td>

              <td>
                <NumericFormat
                  customInput={Form.Control}
                  decimalScale={2}
                  fixedDecimalScale
                  decimalSeparator=","
                  value={rollValue2}
                  onValueChange={(values: NumberFormatValues) => {
                    setRollValue2(values.floatValue || 0.0);
                  }}
                />
              </td>

              <td>
                <NumericFormat
                  customInput={Form.Control}
                  decimalScale={2}
                  fixedDecimalScale
                  decimalSeparator=","
                  value={rollValue3}
                  onValueChange={(values: NumberFormatValues) => {
                    setRollValue3(values.floatValue || 0.0);
                  }}
                />
              </td>
            </tr>

            <tr>
              <td>
                <b>PITCH</b>
              </td>

              <td>
                <NumericFormat
                  customInput={Form.Control}
                  decimalScale={2}
                  fixedDecimalScale
                  decimalSeparator=","
                  value={pitchValue1}
                  onValueChange={(values: NumberFormatValues) => {
                    setPitchValue1(values.floatValue || 0.0);
                  }}
                />
              </td>

              <td>
                <NumericFormat
                  customInput={Form.Control}
                  decimalScale={2}
                  fixedDecimalScale
                  decimalSeparator=","
                  value={pitchValue2}
                  onValueChange={(values: NumberFormatValues) => {
                    setPitchValue2(values.floatValue || 0.0);
                  }}
                />
              </td>

              <td>
                <NumericFormat
                  customInput={Form.Control}
                  decimalScale={2}
                  fixedDecimalScale
                  decimalSeparator=","
                  value={pitchValue3}
                  onValueChange={(values: NumberFormatValues) => {
                    setPitchValue3(values.floatValue || 0.0);
                  }}
                />
              </td>
            </tr>

            <tr>
              <td>
                <b>YAW</b>
              </td>

              <td>
                <NumericFormat
                  customInput={Form.Control}
                  decimalScale={2}
                  fixedDecimalScale
                  decimalSeparator=","
                  value={yawValue1}
                  onValueChange={(values: NumberFormatValues) => {
                    setYawValue1(values.floatValue || 0.0);
                  }}
                />
              </td>

              <td>
                <NumericFormat
                  customInput={Form.Control}
                  decimalScale={2}
                  fixedDecimalScale
                  decimalSeparator=","
                  value={yawValue2}
                  onValueChange={(values: NumberFormatValues) => {
                    setYawValue2(values.floatValue || 0.0);
                  }}
                />
              </td>

              <td>
                <NumericFormat
                  customInput={Form.Control}
                  decimalScale={2}
                  fixedDecimalScale
                  decimalSeparator=","
                  value={yawValue3}
                  onValueChange={(values: NumberFormatValues) => {
                    setYawValue3(values.floatValue || 0.0);
                  }}
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
            <Button variant="danger" className="me-2" onClick={onDeleteHandler}>
              Delete
            </Button>
          )}
        </div>
      </Form>

      <ToastContainer position="middle-center" className="position-fixed">
        <Toast
          show={!!showError}
          onClose={() => setShowError(false)}
          bg={"danger"}
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
