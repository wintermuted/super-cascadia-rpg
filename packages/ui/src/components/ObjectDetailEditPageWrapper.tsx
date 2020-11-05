import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import React, { ReactElement, SyntheticEvent } from "react";
import Button from "react-bootstrap/Button";
import { LinkContainer } from "react-router-bootstrap";
import { ObjectDetailBreadCrumb } from "./ObjectDetailBreadCrumb";

interface Props {
  objectId: number;
  name: string;
  routeName: string;
  children?: ReactElement;
  handleSubmit: (event: SyntheticEvent) => void;
}

export const ObjectDetailEditPageWrapper = ({
  routeName,
  objectId,
  name,
  children,
  handleSubmit,
}: Props) => {
  return (
    <Container>
      <br />
      <ObjectDetailBreadCrumb routeName={routeName} objectId={objectId} />
      <Card>
        <Form onSubmit={handleSubmit}>
          <Card.Header>
            <h1>{name}</h1>
          </Card.Header>
          <Card.Body>{children}</Card.Body>
          <Card.Footer className="text-muted">
            <Container>
              <Row>
                <Col sm="1">
                  <Button variant="primary" type="submit" size="sm">
                    Submit
                  </Button>
                </Col>
                <Col sm="10" />
                <Col sm="1">
                  <LinkContainer to={`/items/${objectId}/view`}>
                    <Button variant="secondary" type="submit" size="sm">
                      Cancel
                    </Button>
                  </LinkContainer>
                </Col>
              </Row>
            </Container>
          </Card.Footer>
        </Form>
      </Card>
    </Container>
  );
};