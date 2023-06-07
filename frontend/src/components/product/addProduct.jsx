import React, { useEffect, useState, useRef } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

const baseURL = "http://scanditest.atwebpages.com/php/";
const route = "addProduct.php";

const fetchData = async () => {
  try {
    const response = await fetch(baseURL);
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error("Error fetching Product Data");
  }
};

export default function AddProduct() {
  let navigate = useNavigate();
  const [data, setData] = useState([]);
  const SKUs = data?.map((obj) => obj.SKU) ?? [];
  const [type, setType] = useState("");
  const [formValue, setFormValues] = useState({});
  const [validated, setValidated] = useState(false);
  const [validateSKU, setValidateSKU] = useState(false);
  const [validateSKUStatus, setValidateSKUStatus] = useState(false);
  const [validateName, setValidateName] = useState(false);
  const [validatePrice, setValidatePrice] = useState(false);
  const [validateSize, setValidateSize] = useState(false);
  const [validateWeight, setValidateWeight] = useState(false);
  const [validateHeight, setValidateHeight] = useState(false);
  const [validateWidth, setValidateWidth] = useState(false);
  const [validateLength, setValidateLength] = useState(false);

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
  }, []);

  const handleTypeChange = (event, newType) => {
    setType(event.target.value);
  };

  //&& e.target.value != ""
  const operationHandler = (e) => {
    const { name, value } = e.target;
    if (e.target.name === "type") {
      setFormValues({
        ...formValue,
        [name]: value,
      });
      handleTypeChange(e);
    }

    if (name === "SKU") {
      if (SKUs.includes(Number(value))) {
        setValidateSKUStatus(true);
      } else {
        setValidateSKUStatus(false);
        if (/^[a-zA-Z0-9\D]+$/.test(value)) {
          setValidateSKU(false);
          setFormValues({
            ...formValue,
            [name]: value,
          });
        } else {
          setValidateSKU(true);
        }
      }
    }

    if (name === "name") {
      if (/^[a-zA-Z0-9\s]+$/.test(value)) {
        setValidateName(false);
        setFormValues({
          ...formValue,
          [name]: value,
        });
      } else {
        setValidateName(true);
      }
    }

    if (name === "price") {
      if (/^[0-9.]+$/.test(value)) {
        setValidatePrice(false);
        setFormValues({
          ...formValue,
          [name]: value,
        });
      } else {
        setValidatePrice(true);
      }
    }

    if (name === "size") {
      if (/^[0-9.]+$/.test(value)) {
        setValidateSize(false);
        setFormValues({
          ...formValue,
          [name]: value,
        });
      } else {
        setValidateSize(true);
      }
    }

    if (name === "weight") {
      if (/^[0-9.]+$/.test(value)) {
        setValidateWeight(false);
        setFormValues({
          ...formValue,
          [name]: value,
        });
      } else {
        setValidateWeight(true);
      }
    }

    if (name === "height") {
      if (/^[0-9.]+$/.test(value)) {
        setValidateHeight(false);
        setFormValues({
          ...formValue,
          [name]: value,
        });
      } else {
        setValidateHeight(true);
      }
    }

    if (name === "width") {
      if (/^[0-9.]+$/.test(value)) {
        setValidateWidth(false);
        setFormValues({
          ...formValue,
          [name]: value,
        });
      } else {
        setValidateWidth(true);
      }
    }

    if (name === "length") {
      if (/^[0-9.]+$/.test(value)) {
        setValidateLength(false);
        setFormValues({
          ...formValue,
          [name]: value,
        });
      } else {
        setValidateLength(true);
      }
    }
  };

  const handleSubmit = async (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    if (form.checkValidity() === false) {
      // event.preventDefault();
      event.stopPropagation();
      setValidated(true);
      return;
    }
    try {
      const response = await fetch(`${baseURL}${route}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formValue),
      });
      const data = await response.json();
      setFormValues({});
    } catch (error) {
      console.log(error.message);
    }
    navigate("/");
  };

  return (
    <>
      <Container className="my-5">
        <Form
          noValidate
          validated={validated}
          id="product_form"
          onSubmit={handleSubmit}
        >
          <Row>
            <Col xs={10}>
              <h1>Add Product</h1>
            </Col>
            <Col xs={2}>
              <Button type="submit" variant="primary">
                Save
              </Button>{" "}
              <Link to="/">
                <Button variant="danger" id="delete-product-btn">
                  Cancel
                </Button>{" "}
              </Link>
            </Col>
            <hr />
          </Row>
          <Row>
            <Col xs={12}>
              <Form.Group className="mb-3" controlId="sku">
                <Form.Label>SKU</Form.Label>
                <Form.Control
                  required
                  name="SKU"
                  type="text"
                  placeholder="Enter SKU"
                  onChange={operationHandler}
                />
                {validateSKUStatus && (
                  <Form.Label className="mt-2 text-danger">
                    This SKU is already exists.
                    <br />
                  </Form.Label>
                )}
                {validateSKU && (
                  <Form.Label className="mt-2 text-danger">
                    Invalid data type please put alphabets and numbers only.
                  </Form.Label>
                )}
                <Form.Control.Feedback type="invalid">
                  Please provide SKU.
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3" controlId="name">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Enter Name"
                  name="name"
                  onChange={operationHandler}
                />
                {validateName && (
                  <Form.Label className="mt-2 text-danger">
                    Invalid data type please put alphabets only.
                  </Form.Label>
                )}
                <Form.Control.Feedback type="invalid">
                  Please provide a name.
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3" controlId="price">
                <Form.Label>Price $</Form.Label>
                <Form.Control
                  required
                  type="number"
                  placeholder="Enter Price"
                  name="price"
                  onChange={operationHandler}
                />
                {validatePrice && (
                  <Form.Label className="mt-2 text-danger">
                    Invalid data type please put numbers only.
                  </Form.Label>
                )}
                <Form.Control.Feedback type="invalid">
                  Please provide a price.
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3" controlId="productType">
                <Form.Label>Type Switcher</Form.Label>
                <Form.Select
                  required
                  aria-label="Default select example"
                  className="mb-3"
                  name="type"
                  onChange={operationHandler}
                >
                  <option id="" value="">
                    Type Switcher
                  </option>
                  <option id="DVD" value="DVD">
                    DVD
                  </option>
                  <option id="Book" value="Book">
                    Book
                  </option>
                  <option id="Furniture" value="Furniture">
                    Furniture
                  </option>
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  Please provide a type.
                </Form.Control.Feedback>
              </Form.Group>
              {type === "DVD" ? (
                <>
                  <Form.Label>Please provide DVD size in MegaByte</Form.Label>
                  <Form.Group className="mb-3" controlId="size">
                    <Form.Label>Size (MB) </Form.Label>
                    <Form.Control
                      required
                      type="number"
                      placeholder="Enter size"
                      name="size"
                      onChange={operationHandler}
                    />
                    <Form.Label className="mt-2">
                      *Product Description*
                    </Form.Label>
                    <Form.Control.Feedback type="invalid">
                      Please provide a size.
                    </Form.Control.Feedback>
                    {validateSize && (
                      <Form.Label className="mt-2 text-danger">
                        Invalid data type please put numbers only.
                      </Form.Label>
                    )}
                  </Form.Group>
                </>
              ) : type === "Book" ? (
                <>
                  <Form.Label>
                    Please provide Book weight in KiloGram
                  </Form.Label>
                  <Form.Group className="mb-3" controlId="weight">
                    <Form.Label>Weight (KG) </Form.Label>
                    <Form.Control
                      required
                      type="number"
                      placeholder="Enter weight"
                      name="weight"
                      onChange={operationHandler}
                    />
                    <Form.Label className="mt-2">
                      *Product Description*
                    </Form.Label>
                    <Form.Control.Feedback type="invalid">
                      Please provide a weight.
                    </Form.Control.Feedback>
                    {validateWeight && (
                      <Form.Label className="mt-2 text-danger">
                        Invalid data type please put numbers only.
                      </Form.Label>
                    )}
                  </Form.Group>
                </>
              ) : type === "Furniture" ? (
                <>
                  <Form.Label>
                    Please provide Furniture Dimensions in Height × Width ×
                    Length (H×W×L)
                  </Form.Label>
                  <Form.Group className="mb-3" controlId="height">
                    <Form.Label>Height (CM) </Form.Label>
                    <Form.Control
                      required
                      type="number"
                      placeholder="Enter height"
                      name="height"
                      onChange={operationHandler}
                    />
                    {validateHeight && (
                      <Form.Label className="mt-2 text-danger">
                        Invalid data type please put numbers only.
                      </Form.Label>
                    )}
                    <Form.Control.Feedback type="invalid">
                      Please provide a height.
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="width">
                    <Form.Label>Width (CM) </Form.Label>
                    <Form.Control
                      required
                      type="number"
                      placeholder="Enter width"
                      name="width"
                      onChange={operationHandler}
                    />
                    {validateWidth && (
                      <Form.Label className="mt-2 text-danger">
                        Invalid data type please put numbers only.
                      </Form.Label>
                    )}
                    <Form.Control.Feedback type="invalid">
                      Please provide a width.
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="length">
                    <Form.Label>Length (CM) </Form.Label>
                    <Form.Control
                      required
                      type="number"
                      placeholder="Enter length"
                      name="length"
                      onChange={operationHandler}
                    />
                    <Form.Label className="mt-2">
                      *Product Description*
                    </Form.Label>
                    <Form.Control.Feedback type="invalid">
                      Please provide a length.
                    </Form.Control.Feedback>
                    {validateLength && (
                      <Form.Label className="mt-2 text-danger">
                        Invalid data type please put numbers only.
                      </Form.Label>
                    )}
                  </Form.Group>
                </>
              ) : (
                <Form.Label>You should choose one type</Form.Label>
              )}
            </Col>
          </Row>
        </Form>
      </Container>
    </>
  );
}
