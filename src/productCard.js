import React, { useState, useRef } from 'react';
import { Card, Button } from 'react-bootstrap';
import Webcam from 'react-webcam';

const ProductCard = ({ product, customClass, onComplete, onDelete, onPhotoUpload }) => {
  const [isWebcamOpen, setIsWebcamOpen] = useState(false);
  const webcamRef = useRef(null);

  const capturePhoto = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    onPhotoUpload(product.id, imageSrc);
    setIsWebcamOpen(false);
  };

  return (
    <Card className="mb-3">
      <Card.Body>
        <Card.Title className={product.completed ? 'completed-item' : customClass}>
          {product.name}
        </Card.Title>
        <div className="task-container">
          <Card.Text className={product.completed ? 'completed-item' : customClass}>
            {product.description}
          </Card.Text>
          {product.photo_url ? (
            <img src={product.photo_url} alt="Uploaded" className="task-photo" />
          ) : (
            <div className="empty-photo-shell"></div>
          )}
        </div>
        <Button variant="success" onClick={() => onComplete(product.id)}>
          {product.completed ? 'Undo' : 'Complete'}
        </Button>
        <Button variant="danger" onClick={() => onDelete(product.id)} className="ms-2">
          Delete
        </Button>
        <Button variant="primary" onClick={() => setIsWebcamOpen(!isWebcamOpen)} className="ms-2">
          {isWebcamOpen ? 'Close Camera' : 'Open Camera'}
        </Button>
        {isWebcamOpen && (
          <div>
            <Webcam
              audio={false}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              width="100%"
            />
            <Button variant="secondary" onClick={capturePhoto} className="mt-2">
              Capture Photo
            </Button>
          </div>
        )}
      </Card.Body>
    </Card>
  );
};

export default ProductCard;