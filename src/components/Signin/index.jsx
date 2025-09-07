import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faEnvelope, faUnlockAlt } from "@fortawesome/free-solid-svg-icons";
import { Col, Row, Form, Card, Button, Container, InputGroup } from "@themesberg/react-bootstrap";
import { Link } from "react-router-dom";
import BgImage from "/home/ingrid/Github/Frontend/src/assets/img/areamedica.jpeg";

function SignInForm() {
//const { register, handleSubmit, onSubmit, error, isLoading } = useReSignin();

  return (
    <main >
      <section className="d-flex align-items-center my-5 mt-lg-6 mb-lg-5 ">
        <Container>
          <p className="text-center">
            <Card.Link className="text-gray-700">
              <FontAwesomeIcon icon={faAngleLeft} className="me-2" /> Volte ao início
            </Card.Link>
          </p>
          <Row
            className="justify-content-center form-bg-image"
            style={{ backgroundImage: `url(${BgImage})` }}
          >
            <Col xs={12} className="d-flex align-items-center justify-content-center">
              <div className="bg-white shadow-soft border rounded border-light p-4 p-lg-5 w-100 fmxw-500">
                <div className="text-center text-md-center mb-4 mt-md-0">
                  <h3 className="mb-0">Entre no painel de Agendamentos</h3>
                </div>
                <Form >
                  <Form.Group id="email" className="mb-4">
                    <Form.Label>Seu Email</Form.Label>
                    <InputGroup>
                      <InputGroup.Text>
                        <FontAwesomeIcon icon={faEnvelope} />
                      </InputGroup.Text>
                      <Form.Control required type="email" placeholder="example@company.com" />
                    </InputGroup>
                  </Form.Group>
                  <Form.Group id="password" className="mb-4">
                    <Form.Label>Sua Senha</Form.Label>
                    <InputGroup>
                      <InputGroup.Text>
                        <FontAwesomeIcon icon={faUnlockAlt} />
                      </InputGroup.Text>
                      <Form.Control  required placeholder="Senha" />
                      <Button variant="outline-secondary" type="button">
                        <FontAwesomeIcon />
                      </Button>
                    </InputGroup>
                  </Form.Group>
                  
                  <Button variant="primary" >
                    Entrando
                  </Button>
                </Form>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </main>
  );
};

export default SignInForm;
