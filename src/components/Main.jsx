import { Container } from "react-bootstrap";
import Navigation from "./Navigation";
import Builds from "./Builds";

export default function Main() {
    return (
        <>
            <Navigation />

            <div className="content">
                <Builds />
            </div>
        </>
    );
};