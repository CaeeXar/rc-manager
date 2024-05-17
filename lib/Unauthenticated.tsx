import { signIn } from "next-auth/react";
import { Button, Container } from "react-bootstrap";

export default function Unauthenticated() {
  return (
    <Container>
      <h1>Ups...!</h1>

      <p>Look&apos;s like you are not logged in. Login to view this page!</p>

      <Button onClick={() => signIn()}>Login</Button>
    </Container>
  );
}
