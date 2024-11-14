import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import './Dashboard.css';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function Dashboard() {
  const [products, setProducts] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:5300/products');
        if (response.ok) {
          const data = await response.json();
          setProducts(data);
          console.log('Fetched products:', data);
        } else {
          console.error('Failed to fetch products');
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  const carouselImages = [
    `${process.env.PUBLIC_URL}/images/download.jpg`,
    `${process.env.PUBLIC_URL}/images/images.jpg`,
    `${process.env.PUBLIC_URL}/images/imm.jpeg`,
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % carouselImages.length);
    }, 2000); 
    return () => clearInterval(interval);
  }, [carouselImages.length]);

  const chartData = {
    labels: products.map((product) => product.name),
    datasets: [
      {
        label: 'Quantity',
        data: products.map((product) => product.quantity),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
      title: {
        display: true,
        text: 'Product Stock Quantity',
      },
    },
  };

  return (
    <section id="dashboard">
      <div id="stockOverview">
        <h2>Product Stock Overview</h2>
        <div className="chart-container">
          {products.length > 0 ? (
            <Bar data={chartData} options={chartOptions} />
          ) : (
            <p>No products available to display in the chart.</p>
          )}
        </div>
      </div>

      {/* Image Carousel */}
      <div id="imageCarousel">
        <h2>Menu</h2>
        <div className="carousel-container">
          {carouselImages.map((src, index) => (
            <img
              key={index}
              src={src}
              alt={`Delicious dish ${index + 1}`}
              className={`carousel-image ${index === currentImageIndex ? 'active' : ''}`}
              style={{
                display: index === currentImageIndex ? 'block' : 'none',
                transition: 'opacity 1s ease',
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Dashboard;