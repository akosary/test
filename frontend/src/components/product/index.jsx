import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import { Card, Form } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./index.css";
import Carousel from "react-bootstrap/Carousel";
import { Link } from "react-router-dom";

const baseURL = "https://ecommercescanditest.000webhostapp.com/php/";

const deleteRoute = "deleteProduct.php";
const fetchData = async () => {
  try {
    const response = await fetch(baseURL);
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error("Error fetching Product Data");
  }
};

export default function Product() {
  const [data, setData] = useState([]);
  const [flag, setFlag] = useState(false);
  const [productIDs, setProductIDs] = useState([]);

  const handleCheckbox = (event) => {
    if (!productIDs.includes(event.target.value) && event.target.checked) {
      setProductIDs((previousIDs) => [...previousIDs, event.target.value]);
    } else if (!event.target.checked) {
      setProductIDs((previousIDs) =>
        previousIDs.filter((SKU) => SKU !== event.target.value)
      );
    }
  };

  const handleDeleteProducts = async () => {
    try {
      const response = await fetch(`${baseURL}${deleteRoute}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ IDs: productIDs }),
      });
      const data = await response.json();
      setProductIDs([]);
      setFlag(true);
      return data;
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    const fetchDataAsync = async () => {
      try {
        const products = await fetchData();
        setData(products);
      } catch (error) {
        console.error(error);
      }
    };
    fetchDataAsync();
    setFlag(false);
  }, [flag]);

  return (
    <>
      {/* Header */}
      <Carousel variant="dark" className="mb-5">
        <Carousel.Item>
          <img
            className="d-block w-100 img"
            src="https://images.pexels.com/photos/2099691/pexels-photo-2099691.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt="First slide"
          />
          <Carousel.Caption>
            <h2>Book</h2>
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quia,
              ipsa quae! Alias non iusto itaque quasi sit est nulla
            </p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100 img"
            src="https://images.pexels.com/photos/6429163/pexels-photo-6429163.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt="Second slide"
          />
          <Carousel.Caption>
            <h2>DVD</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100 img"
            src="https://images.pexels.com/photos/1350789/pexels-photo-1350789.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt="Third slide"
          />
          <Carousel.Caption>
            <h2>Furniture</h2>
            <p>
              Praesent commodo cursus magna, vel scelerisque nisl consectetur.
            </p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>

      {/* content */}
      <Container>
        <Row>
          <Col xs={10}>
            <h1>Product List</h1>
          </Col>
          <Col xs={2}>
            <Link to="/add-Product" state={{ Data: data }}>
              <Button variant="primary">ADD</Button>{" "}
            </Link>
            <Button
              variant="danger"
              id="delete-product-btn"
              onClick={handleDeleteProducts}
            >
              MASS DELETE
            </Button>{" "}
          </Col>
          <hr />
        </Row>
        <Row>
          {data.map((product) => (
            <Col xs={4} key={product.SKU}>
              <Card style={{ width: "18rem" }} className="mb-3">
                <Card.Body>
                  <input
                    type="checkbox"
                    className="align-self-start delete-checkbox"
                    value={product.SKU}
                    onClick={handleCheckbox}
                  />
                  <Card.Text className="text-center">{product.SKU}</Card.Text>
                  <Card.Title className="text-center">
                    {product.name}
                  </Card.Title>
                  <Card.Text className="text-center">
                    {Number(product.price).toLocaleString("en-US", {
                      style: "currency",
                      currency: "USD",
                    })}
                  </Card.Text>
                  {product.type === "DVD" && (
                    <Card.Text className="text-center">
                      Size: {product.size}MB
                    </Card.Text>
                  )}
                  {product.type === "Book" && (
                    <Card.Text className="text-center">
                      Weight: {product.weight}KG
                    </Card.Text>
                  )}
                  {product.type === "Furniture" && (
                    <Card.Text className="text-center">
                      Dimension: {product.height}×{product.width}×
                      {product.length}
                    </Card.Text>
                  )}
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
}
