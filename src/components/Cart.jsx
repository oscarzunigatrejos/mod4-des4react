import React, { useState } from 'react'
import { cartaPizza } from "../pizzas";
import { Button, Container, ListGroup, Badge, Image } from 'react-bootstrap'
import { formatNumber } from '../scripts.js';

const Cart = () => {
    const [listaPizzas, setListaPizzas] = useState(cartaPizza)
    const [carrito, setCarrito] = useState([])

    /*Funcion para agregar al carrito */
    const addToCart = (element) => {
        setCarrito((prevState) => {
            const exist = carrito.find((x) => x.id === element.id)

            if (exist) {
                /*Si el producto ya existe en el carrito, se aumenta la cantidad en 1 */
                return prevState.map((x) => x.id === element.id ? { ...exist, cantidad: exist.cantidad + 1 } : x)

            }
            else {
                /*Si el producto no existe en el carrito, se agrega al carrito */
                return [...carrito, { ...element, cantidad: 1 }]

            }
        })
    }

    /* funcion para disminuir carrito  */
    const removeFromCart = (element) => {
        setCarrito((prevState) => {
            const exist = carrito.find((x) => x.id === element.id)

            if (exist) {
                //si el producto es 1 y el usuario da click se quita del carrito, ya que de 1 pasara a 0.
                if (exist.cantidad <= 1) {
                    return prevState.filter((x) => x.id !== element.id)

                }
                //si el producto es mayor a 1 se disminuye en 1
                else {
                    return prevState.map((x) => x.id === element.id ? { ...exist, cantidad: exist.cantidad - 1 } : x)
                }

            }
            return prevState
        })
    }

    const total = carrito.reduce((a, c) => a + c.price * c.cantidad, 0)
    const HorizontalLine = ({ color }) => (
        <div
            style={{
                borderBottom: `1px solid ${color}`,
                margin: '10px 0',
                padding: 2,
            }}
        />
    );
    return (
        <>
            <h2>Carrito</h2>
            <Container className="my-4">
                <ListGroup>
                    {listaPizzas.map((element) => (
                        <ListGroup.Item key={element.id} className="d-flex justify-content-between align-items-start">

                            <Image width={150} thumbnail src={element.img} rounded />
                            <div className="ms-2 me-auto d-flex flex-column">
                                <div className="fw-bold">
                                    {element.name}
                                    <Badge bg="primary" pill>
                                        {
                                            carrito.find((x) => x.id === element.id) ? carrito.find((x) => x.id === element.id).cantidad : ''
                                        }
                                    </Badge>
                                </div>
                                <div> {formatNumber(element.price)}</div>

                            </div>
                            <div className="ms-2">
                                <Button onClick={() => removeFromCart(element)} className='mx-2'>Quitar</Button>
                                <Button onClick={() => addToCart(element)} className='mx-2'>Agregar</Button>
                            </div>

                        </ListGroup.Item>

                    ))}
                </ListGroup>
            </Container>
            <Container>
                <h4>Total del carrito: </h4>
                {carrito.map((element) => (
                    <li key={element.id}>
                        {element.name} {formatNumber(element.price)} x {element.cantidad}
                    </li>

                ))}
                {total === 0 ? <p>El carrito esta vacio</p> : <div><p>TOTAL: {formatNumber(total)}</p> <Button variant='success'>Ir a pagar</Button></div>}


            </Container>

        </>
    )
}

export default Cart