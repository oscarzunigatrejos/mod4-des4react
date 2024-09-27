import { useEffect, useState } from 'react';
import CardPizza from './CardPizza';
import { Row, Col, Container, Alert } from "react-bootstrap";

const Pizza = () => {
    const [pizza, setPizza] = useState(null);
    const [error, setError] = useState('');

    const queryPizza = async () => {
        try {
            const url = "http://localhost:5000/api/pizzas/p001";
            const response = await fetch(url);

            if (!response.ok) { // https://dev.to/dionarodrigues/fetch-api-do-you-really-know-how-to-handle-errors-2gj0
                throw new Error(response.status);
            }

            const data = await response.json();
            setPizza(data);
        } catch (err) {
            setError('Ocurrió un error al obtener la pizza.');
        }
    };

    useEffect(() => {
        queryPizza();
    }, []);

    if (error) {
        return <Alert variant='danger'>{error}</Alert>; // Muestra el mensaje de error si la respuesta del endpoint no es exitosa (200)
    }

    if (!pizza) {
        return <div>Cargando...</div>; // Muestra un mensaje de carga mientras se obtiene la pizza
    }

    return (
        <Container>
            <Row className="justify-content-md-center">
                <Col md={6} key={pizza.id}>
                    <CardPizza
                        name={pizza.name}
                        desc={pizza.desc}
                        price={pizza.price}
                        image={pizza.img}
                        ingredients={pizza.ingredients}
                        id={pizza.id}
                        verMas={false}
                    />
                </Col>
            </Row>
        </Container>
    );
};

export default Pizza;
