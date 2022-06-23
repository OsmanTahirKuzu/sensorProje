import React, { useState,Component } from "react";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import axios from 'axios';



export default function App() {

    const [allSensors, setAllSensors] = useState([
        { type: "", location: "", reportDelay: "" },
    ]);

    const handleAddSensors = () => {
        const values = [...allSensors];
        values.push({
            type: "",
            location: "",
            reportDelay: null,

        });
        setAllSensors(values);
    };

    const handleRemoveSensors = (index) => {
        const values = [...allSensors];
        values.splice(index, 1);
        setAllSensors(values);
    };

    const handleInputChange = (index, event) => {
        const values = [...allSensors];
        const updatedValue = event.target.name;
        values[index][updatedValue] = event.target.value;

        setAllSensors(values);
    };

    console.log(allSensors);

    const onSubmit = () => {
        
        allSensors.forEach(element=>{
            
        const dynamicForm = element

        axios.post('http://localhost:5000/details/add', dynamicForm)
            .then(res => console.log(res.data));

        window.location = '/';
        })
    }
    return (
        <Container>
            <Row>
                <Col className="dynamic-form-headings-center">
                    <Row className="justify-content-center mb-4">
                    <Button  variant="primary" onClick={() => handleAddSensors()}>
                        Sensör Ekle
                    </Button>
                    </Row>
                </Col>
                <Col xs="12">
                    <Form>
                        <Row className="justify-content-center">
                            {allSensors.length > 0 && (
                                <>
                                    {allSensors.map((field, index) => (
                                        <Col xs="4">
                                            <div className="add-sensor-div mb-4">
                                                <h4>Sensör {index + 1}</h4>
                                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                                    <Form.Control
                                                        type="text"
                                                        name="type"
                                                        placeholder="Sensör tipini giriniz"
                                                        value={field.type}
                                                        onChange={(event) =>
                                                            handleInputChange(index, event)
                                                        }
                                                    />
                                                </Form.Group>
                                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                                    <Form.Control
                                                        type="text"
                                                        name="location"
                                                        placeholder="Konum giriniz"
                                                        value={field.location}
                                                        onChange={(event) =>
                                                            handleInputChange(index, event)
                                                        }
                                                    />
                                                </Form.Group>
                                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                                    <Form.Control
                                                        type="text"
                                                        name="reportDelay"
                                                        placeholder="Raporlama Sıklığını Giriniz"
                                                        value={field.reportDelay}
                                                        onChange={(event) =>
                                                            handleInputChange(index, event)
                                                        }
                                                    />
                                                </Form.Group>

                                                <Button
                                                    variant="secondary"
                                                    onClick={() => handleRemoveSensors(index)}
                                                >
                                                    Sil
                                                </Button>
                                            </div>
                                            
                                        </Col>
                                        
                                    ))}
                                </>
                            )}
                        </Row>
                        <Row className="justify-content-center">
                                        <Button onClick={() => onSubmit()}>Gönder</Button>
                        </Row>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
}