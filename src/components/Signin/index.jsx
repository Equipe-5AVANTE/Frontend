import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
 
  faEnvelope,
  faEye,
  faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";
import {
  Col,
  Row,
  Form,
  Card,
  Button,

  InputGroup,
} from "@themesberg/react-bootstrap";
import { Link } from "react-router-dom";
import BgImage from "../../assets/img/areamedica.jpeg";
import { useState } from "react";

function SignInForm() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <main className="" >
      <section className="d-flex align-items-center my-5 mt-lg-6 mb-lg-5">
        
        
          <Row
            className="justify-content-center form-bg-image"
            style={{ backgroundImage: `url(${BgImage})` }}
          >
            <Col
              xs={12}
              className="d-flex align-items-center justify-content-center"
            >
              <div className="bg-white shadow-soft border rounded border-light p-4 p-lg-5 w-100 fmxw-500">
                <div className="text-center text-md-center mb-4 mt-md-0">
                  <h3 className="mb-0">Entre no painel de Agendamentos</h3>
                </div>
                <Form>
                  <Form.Group id="email" className="mb-4">
                    <Form.Label>Seu Email</Form.Label>
                    <InputGroup>
                      <InputGroup.Text>
                        <FontAwesomeIcon icon={faEnvelope} />
                      </InputGroup.Text>
                      <Form.Control
                        type="email"
                        placeholder="example@company.com"
                      />
                    </InputGroup>
                  </Form.Group>
                  <Form.Group id="password" className="mb-4">
                    <Form.Label>Sua Senha</Form.Label>
                    <InputGroup>
                      <Form.Control
                        type={showPassword ? "text" : "password"}
                        placeholder="Senha"
                      />
                      <Button
                        variant="outline-secondary"
                        onClick={() => setShowPassword(!showPassword)}
                        type="button"
                      >
                        <FontAwesomeIcon
                          icon={showPassword ? faEyeSlash : faEye}
                        />
                      </Button>
                    </InputGroup>
                  </Form.Group>
                  <Button variant="primary" type="submit" className="w-100">
                    Entrar
                  </Button>
                </Form>
              </div>
            </Col>
          </Row>
       
      </section>
    </main>
  );
}

export default SignInForm;
