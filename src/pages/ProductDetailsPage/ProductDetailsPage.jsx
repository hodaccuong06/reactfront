import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ProductDetailsComponent from '../../components/ProductDetailsComponent/ProductDetailsComponent';

const ProductDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const handleHomeClick = () => {
    navigate('/');
  };

  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <h2 style={styles.header}>
          <span onClick={handleHomeClick} style={styles.homeLink}>Home</span> - Product Details
        </h2>
        <div style={styles.detailsContainer}>
          <ProductDetailsComponent idProduct={id} />
        </div>
      </div>
      
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    minHeight: '100vh',
    background: 'rgba(192,192,192,0.5)',
    padding: '50px 0',
    position: 'relative'
  },
  content: {
    maxWidth: '1200px',
    width: '100%',
    position:'absolute',
    top:'2px'
  },
  header: {
    fontSize: '16px',
    marginBottom: '20px',
    color: '#333',

  },
  homeLink: {
    cursor: 'pointer',
    color: '#007bff',
  },
  detailsContainer: {
    background: '#fff',
    borderRadius: '8px',
    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
    padding: '20px',
  },
};

export default ProductDetailsPage;
