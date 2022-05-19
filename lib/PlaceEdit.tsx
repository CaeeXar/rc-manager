import { NextPage } from 'next';
import {
    Button,
    Col,
    Container,
    Form,
    Image,
    Row,
    Toast,
    ToastContainer,
} from 'react-bootstrap';
import { FormEvent, useState, ChangeEvent } from 'react';
import { useRouter } from 'next/router';
import { Place } from '../js/types';
import { getDatetimeISO, getDatetimeLocal } from '../js/util';

const PlaceEdit: NextPage<{
    place: Place;
    edit: boolean;
}> = ({ place, edit }) => {
    const [title, setTitle] = useState(place.title);
    const [description, setDescription] = useState(place.description);
    const [googleMapsLink, setGoogleMapsLink] = useState(place.googleMapsLink);
    const [imgPath, setImgPath] = useState(place.imgPath);
    const [showError, setShowError] = useState<boolean>(false);

    const router = useRouter();

    const onSaveHandler = async (event: FormEvent) => {
        event.preventDefault();
        event.stopPropagation();

        let modified = getDatetimeISO();
        let newPlace: Place = {
            id: place.id,
            username: place.username,
            title,
            description,
            googleMapsLink,
            imgPath,
            modified,
        };

        let apiUrl = edit ? '/api/places/update' : '/api/places/add';
        const res = await fetch(apiUrl, {
            method: 'POST',
            body: JSON.stringify(newPlace),
            headers: { 'Content-Type': 'application/json' },
        });

        if (res.ok) router.push({ pathname: `/places`, query: {} });
        else setShowError(true);
    };

    const onRemoveHandler = async () => {
        if (!place || !place.id) {
            setShowError(true);
            return;
        }

        const res = await fetch('/api/places/remove', {
            method: 'POST',
            body: JSON.stringify({ id: place.id }),
        });
        if (res.ok) router.push({ pathname: `/places`, query: {} });
        else setShowError(true);
    };

    const onCancelHandler = async () => {
        router.push({ pathname: `/places`, query: {} });
    };

    const onFileSelectionHandler = async (event: ChangeEvent) => {
        const target = event.target as HTMLInputElement;
        const files = target.files as FileList;
        const file = files[0] as File;

        const body = new FormData();
        body.append('file', file);

        const res = await fetch('/api/places/images', {
            method: 'POST',
            body,
        });

        if (res.ok) {
            let saved = await res.json();
            setImgPath(saved.newFilename);
        } else setShowError(true);
    };

    return (
        <Container>
            {edit ? (
                <div>
                    <h1>
                        <span>Editing: </span>
                        <b className="build-title">
                            #{place.id} {place.title}
                        </b>
                    </h1>

                    <small className="text-muted">
                        Last modified: <b>{getDatetimeLocal(place.modified)}</b>
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
                        Maps-Link <span className="required">(*)</span>
                    </Form.Label>

                    <Col sm="10">
                        <Form.Control
                            type="text"
                            value={googleMapsLink}
                            onChange={(e) => setGoogleMapsLink(e.target.value)}
                            required
                        />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm="2" xs="12">
                        Image
                    </Form.Label>

                    <Col sm="8" xs="12">
                        <Form.Control
                            accept="image/*"
                            type="file"
                            onChange={onFileSelectionHandler}
                        />
                    </Col>

                    <Col sm="2" xs="12">
                        <Image rounded width={100} src={'/' + imgPath} alt="" />
                    </Col>
                </Form.Group>

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
                            onClick={onRemoveHandler}
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

export default PlaceEdit;
