import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { Navbar, Container, Nav, Form, Row, Col, Button } from 'react-bootstrap';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './custom.css';
import ProductCard from './productCard';
import { supabase } from './supabaseClient';
import Countdown from './Countdown';
import About from './About';
import WeatherDashboard from './WeatherDashboard';

function App() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts();
  }, []);

  async function getProducts() {
    try {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .order('id', { ascending: false });
      if (error) throw error;
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error.message);
      alert(error.message);
    }
  }

  async function createProduct() {
    try {
      const { data, error } = await supabase
        .from("products")
        .insert({
          name: name,
          description: description,
          completed: false,
          photo_url: null
        })
        .single();

      if (error) throw error;
      window.location.reload();
    } catch (error) {
      console.error('Error creating product:', error.message);
      alert(error.message);
    }
  }

  async function toggleComplete(productId, completed) {
    try {
      const { data, error } = await supabase
        .from("products")
        .update({ completed: !completed })
        .eq('id', productId);

      if (error) throw error;
      setProducts(products.map(product => product.id === productId ? { ...product, completed: !completed } : product));
    } catch (error) {
      console.error('Error toggling complete:', error.message);
      alert(error.message);
    }
  }

  async function deleteProduct(productId) {
    try {
      const { error } = await supabase
        .from("products")
        .delete()
        .eq('id', productId);

      if (error) throw error;
      setProducts(products.filter(product => product.id !== productId));
    } catch (error) {
      console.error('Error deleting product:', error.message);
      alert(error.message);
    }
  }

  async function handlePhotoUpload(productId, imageSrc) {
    try {
      const byteString = atob(imageSrc.split(',')[1]);
      const mimeString = imageSrc.split(',')[0].split(':')[1].split(';')[0];
      const arrayBuffer = new ArrayBuffer(byteString.length);
      const uint8Array = new Uint8Array(arrayBuffer);
      for (let i = 0; i < byteString.length; i++) {
        uint8Array[i] = byteString.charCodeAt(i);
      }
      const blob = new Blob([arrayBuffer], { type: mimeString });

      const fileExt = mimeString.split('/')[1];
      const fileName = `${productId}.${fileExt}`;
      const filePath = `${fileName}`;

      const { data, error } = await supabase.storage
        .from('photos')
        .upload(filePath, blob);

      if (error) {
        console.error('Error uploading photo:', error.message);
        alert(error.message);
        return;
      }

      const { publicURL, error: publicUrlError } = supabase.storage
        .from('photos')
        .getPublicUrl(filePath);
      
      if (publicUrlError) {
        console.error('Error getting public URL:', publicUrlError.message);
        alert(publicUrlError.message);
        return;
      }

      console.log('Public URL:', publicURL);

      const { data: updatedProduct, error: updateError } = await supabase
        .from('products')
        .update({ photo_url: publicURL, completed: true })
        .eq('id', productId);

      if (updateError) {
        console.error('Error updating product:', updateError.message);
        alert(updateError.message);
        return;
      }

      console.log('Updated product:', updatedProduct);

      setProducts(products.map(product => product.id === productId ? { ...product, photo_url: publicURL, completed: true } : product));
    } catch (error) {
      console.error('Error handling photo upload:', error.message);
      alert(error.message);
    }
  }

  return (
    <Router>
      <Navbar bg="dark" variant="dark" className="custom-navbar">
        <Container>
          <Navbar.Brand as={Link} to="/">Cruise Countdown</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to="/about">About</Nav.Link>
            <Nav.Link as={Link} to="/weather">Weather</Nav.Link>
          </Nav>
          <Nav>
            <Nav.Item>Created by Sean Hoene</Nav.Item>
          </Nav>
        </Container>
      </Navbar>
      <Container className="custom-bg">
        <Routes>
          <Route path="/" element={
            <>
              <div className="container">
                <Countdown />
                <img
                  src="https://media1.tenor.com/m/86pyxiOlUgYAAAAC/dance-happy.gif"
                  alt="Dancing GIF"
                  className="custom-image"
                />
                <h1 className="center-header">🚢 Welcome to the Cruise Countdown! 🚢</h1>
                <hr></hr>
                <h1>
                  🎉 The Countdown is On! March 7th is the departure date for our cruise!
                  🛳️
                </h1>
                <p>
                  Welcome Tyler and Tara! We're so excited for the cruise—only a little
                  while longer until the adventure begins!
                </p>
                <p>Don't forget to pack your sunscreen and sense of adventure! 🌞</p>
                <p>
                  🧳 And don’t forget to plan your wardrobe—think tropical vibes, comfy
                  shoes, and cruise-worthy outfits!
                </p>
                <div className="survey">
                  <p>Before you go, please complete this required survey:</p>
                  <a
                    href="https://blog.cruises.com/quiz/what-type-of-cruiser-are-you/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >Take the "What Type of Cruiser Are You?" Quiz</a>
                </div>
              </div>
              <Row>
                <Col xs={12} md={8}>
                  <h3 className="center-header">Cruise To Dos</h3>
                  <Form.Label className="custom-font-todo">Cruise Item</Form.Label>
                  <Form.Control
                    type="text"
                    id="name"
                    onChange={(e) => setName(e.target.value)}
                  />
                  <Form.Label className="custom-font-description">Item Description</Form.Label>
                  <Form.Control
                    type="text"
                    id="description"
                    onChange={(e) => setDescription(e.target.value)}
                  />
                  <br></br>
                  <Button onClick={() => createProduct()}>Create New To Do</Button>
                </Col>
              </Row>
              <hr></hr>
              <h3 className="center-header">Current To Dos</h3>
              <Row xs={1} lg={3} className="g-4">
                {products.map((product) => (
                  <Col key={product.id}>
                    <ProductCard 
                      product={product} 
                      customClass="custom-font-description" 
                      onComplete={() => toggleComplete(product.id, product.completed)} 
                      onDelete={() => deleteProduct(product.id)}
                      onPhotoUpload={handlePhotoUpload}
                    />
                  </Col>
                ))}
              </Row>
            </>
          } />
          <Route path="/about" element={<About />} />
          <Route path="/weather" element={<WeatherDashboard />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;