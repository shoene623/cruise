import React from 'react';
import { Card, Button } from 'react-bootstrap';

const ProductCard = ({ product, customClass, onComplete, onDelete }) => {
  return (
    <Card className="mb-3">
      <Card.Body>
        <Card.Title className={customClass}>{product.name}</Card.Title>
        <Card.Text className={product.completed ? 'completed' : customClass}>
          {product.description}
        </Card.Text>
        <Button variant="success" onClick={() => onComplete(product.id)}>
          {product.completed ? 'Undo' : 'Complete'}
        </Button>
        <Button variant="danger" onClick={() => onDelete(product.id)} className="ms-2">
          Delete
        </Button>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;