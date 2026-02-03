# Sobti Enterprises - E-Commerce Platform

> Professional electronics business showcase and e-commerce platform for Lights, Fans, Cables, Switches & Electrical Accessories

---

## 📋 Table of Contents
- [Project Overview](#project-overview)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [API Documentation](#api-documentation)
- [Frontend Integration](#frontend-integration)
- [Database Setup](#database-setup)

---

## 🎯 Project Overview

Sobti Enterprises is a modern, professional e-commerce platform designed for electrical businesses. Built for homeowners, builders, and contractors to browse and inquire about electrical products.

### Features
- ⚡ Modern, responsive UI with Tailwind CSS
- 🛍️ Product catalog with CRUD operations
- 🎨 Clean, professional light-mode design
- 📱 Mobile-first responsive layout
- 🔌 RESTful API backend with Spring Boot

---

## 🛠️ Tech Stack

### Backend
- **Framework:** Spring Boot 3.x
- **Database:** PostgreSQL
- **ORM:** JPA/Hibernate
- **Validation:** Jakarta Bean Validation
- **Build Tool:** Maven

### Frontend
- **Framework:** React 18 (Vite)
- **Styling:** Tailwind CSS
- **HTTP Client:** Axios (recommended)
- **Build Tool:** Vite

---

## 🚀 Getting Started

### Prerequisites
- Java 17+
- Node.js 18+
- PostgreSQL 14+
- Maven 3.x

### Backend Setup

1. **Navigate to backend directory:**
```bash
cd backend/ecom
```

2. **Configure Database:**
Edit `src/main/resources/application.properties`:
```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/ecomm
spring.datasource.username=YOUR_USERNAME
spring.datasource.password=YOUR_PASSWORD
spring.jpa.hibernate.ddl-auto=update
```

3. **Create PostgreSQL Database:**
```bash
psql -U postgres
CREATE DATABASE ecomm;
\q
```

4. **Run Backend:**
```bash
./mvnw spring-boot:run
```
Backend will start on: `http://localhost:8080`

### Frontend Setup

1. **Navigate to frontend directory:**
```bash
cd frontend
```

2. **Install dependencies:**
```bash
npm install
```

3. **Create `.env` file:**
```env
VITE_API_BASE_URL=http://localhost:8080
```

4. **Run Frontend:**
```bash
npm run dev
```
Frontend will start on: `http://localhost:5173`

---

## 📡 API Documentation

### Base URL
```
http://localhost:8080
```

---

### 🛍️ Products API

#### 1. Get All Products
Retrieve all products in the catalog.

**Endpoint:** `GET /products`

**Response:**
```json
[
  {
    "id": 1,
    "name": "LED Smart Bulb",
    "price": 299.99,
    "stock": 150
  },
  {
    "id": 2,
    "name": "Ceiling Fan 48 inch",
    "price": 2499.99,
    "stock": 45
  }
]
```

**Status Codes:**
- `200 OK` - Success

---

#### 2. Get Product by ID
Retrieve a specific product by its ID.

**Endpoint:** `GET /products/{id}`

**Path Parameters:**
- `id` (integer) - Product ID

**Example:** `GET /products/1`

**Response:**
```json
{
  "id": 1,
  "name": "LED Smart Bulb",
  "price": 299.99,
  "stock": 150
}
```

**Status Codes:**
- `200 OK` - Product found
- `404 Not Found` - Product not found

---

#### 3. Add New Product
Create a new product in the catalog.

**Endpoint:** `POST /products`

**Headers:**
```
Content-Type: application/json
```

**Request Body:**
```json
{
  "name": "LED Smart Bulb",
  "price": 299.99,
  "stock": 150
}
```

**Field Validations:**
- `name` - Required, cannot be blank
- `price` - Must be greater than 0
- `stock` - Must be 0 or greater

**Response:**
```json
"Product added successfully"
```

**Status Codes:**
- `200 OK` - Product created
- `400 Bad Request` - Validation error

**Validation Error Response:**
```json
{
  "name": "Name cannot be empty",
  "price": "Price must be greater than 0",
  "stock": "Stock cannot be negative"
}
```

---

#### 4. Delete Product
Remove a product from the catalog.

**Endpoint:** `DELETE /products/{id}`

**Path Parameters:**
- `id` (integer) - Product ID

**Example:** `DELETE /products/1`

**Response:**
```json
"Product deleted successfully"
```

**Status Codes:**
- `200 OK` - Product deleted
- `404 Not Found` - Product not found (may still return 200)

---

## 💻 Frontend Integration

### Setup Axios for API Calls

Create `src/api/axios.js`:

```javascript
import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
```

---

### API Service Functions

Create `src/services/productService.js`:

```javascript
import api from '../api/axios';

// Get all products
export const getAllProducts = async () => {
  try {
    const response = await api.get('/products');
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

// Get product by ID
export const getProductById = async (id) => {
  try {
    const response = await api.get(`/products/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching product ${id}:`, error);
    throw error;
  }
};

// Add new product
export const addProduct = async (productData) => {
  try {
    const response = await api.post('/products', productData);
    return response.data;
  } catch (error) {
    console.error('Error adding product:', error);
    throw error;
  }
};

// Delete product
export const deleteProduct = async (id) => {
  try {
    const response = await api.delete(`/products/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting product ${id}:`, error);
    throw error;
  }
};
```

---

### Usage Examples in React Components

#### Fetch and Display Products

```javascript
import { useState, useEffect } from 'react';
import { getAllProducts } from '../services/productService';

function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const data = await getAllProducts();
      setProducts(data);
    } catch (err) {
      setError('Failed to load products');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {products.map(product => (
        <div key={product.id} className="border rounded-lg p-4">
          <h3 className="text-xl font-semibold">{product.name}</h3>
          <p className="text-lg">₹{product.price}</p>
          <p className="text-sm">Stock: {product.stock}</p>
        </div>
      ))}
    </div>
  );
}
```

#### Add New Product Form

```javascript
import { useState } from 'react';
import { addProduct } from '../services/productService';

function AddProductForm() {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    stock: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addProduct({
        name: formData.name,
        price: parseFloat(formData.price),
        stock: parseInt(formData.stock)
      });
      alert('Product added successfully!');
      setFormData({ name: '', price: '', stock: '' });
    } catch (error) {
      alert('Error adding product');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        placeholder="Product Name"
        value={formData.name}
        onChange={(e) => setFormData({...formData, name: e.target.value})}
        className="w-full px-4 py-2 border rounded"
        required
      />
      <input
        type="number"
        placeholder="Price"
        value={formData.price}
        onChange={(e) => setFormData({...formData, price: e.target.value})}
        className="w-full px-4 py-2 border rounded"
        required
      />
      <input
        type="number"
        placeholder="Stock"
        value={formData.stock}
        onChange={(e) => setFormData({...formData, stock: e.target.value})}
        className="w-full px-4 py-2 border rounded"
        required
      />
      <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded">
        Add Product
      </button>
    </form>
  );
}
```

#### Delete Product

```javascript
import { deleteProduct } from '../services/productService';

function ProductCard({ product, onDelete }) {
  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await deleteProduct(product.id);
        onDelete(product.id); // Update UI
        alert('Product deleted successfully!');
      } catch (error) {
        alert('Error deleting product');
      }
    }
  };

  return (
    <div className="border rounded-lg p-4">
      <h3>{product.name}</h3>
      <p>₹{product.price}</p>
      <button 
        onClick={handleDelete}
        className="bg-red-600 text-white px-4 py-2 rounded mt-2"
      >
        Delete
      </button>
    </div>
  );
}
```

---

## 🗄️ Database Setup

### PostgreSQL Database Schema

The application uses PostgreSQL with JPA auto-generation. The Product table structure:

```sql
CREATE TABLE product (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    price DOUBLE PRECISION NOT NULL CHECK (price > 0),
    stock INTEGER NOT NULL CHECK (stock >= 0)
);
```

### Sample Data

```sql
INSERT INTO product (name, price, stock) VALUES
('LED Smart Bulb 9W', 299.99, 150),
('Ceiling Fan 48 inch', 2499.99, 45),
('USB Power Cable 2m', 149.99, 300),
('Modular Switch 2-Way', 89.99, 200),
('LED Tube Light 20W', 449.99, 80),
('Table Fan 16 inch', 1299.99, 60);
```

---

## 🔧 Environment Variables

### Backend (`application.properties`)
```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/ecomm
spring.datasource.username=your_username
spring.datasource.password=your_password
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
```

### Frontend (`.env`)
```env
VITE_API_BASE_URL=http://localhost:8080
```

---

## 🌐 CORS Configuration

The backend is configured to accept requests from `http://localhost:5173` (Vite default port).

If you deploy to production or change ports, update the CORS annotation in `ProductController.java`:

```java
@CrossOrigin(origins = "http://your-frontend-url.com")
```

---

## 📝 Common Issues & Troubleshooting

### CORS Errors
- Ensure backend CORS is configured for your frontend URL
- Check that both servers are running

### Database Connection Errors
- Verify PostgreSQL is running: `psql -U postgres -c "SELECT version();"`
- Check database credentials in `application.properties`
- Ensure database `ecomm` exists

### Port Already in Use
- Backend (8080): Change in `application.properties`: `server.port=8081`
- Frontend (5173): Change in `vite.config.js` or kill existing process

---

## 🚀 Production Deployment

### Backend
1. Build JAR file: `./mvnw clean package`
2. Run: `java -jar target/ecom-0.0.1-SNAPSHOT.jar`
3. Update `application.properties` with production database credentials

### Frontend
1. Build: `npm run build`
2. Deploy `dist` folder to hosting service (Vercel, Netlify, etc.)
3. Update `.env` with production API URL

---

## 📄 License

This project is proprietary software for Sobti Enterprises.

---

## 👥 Contact

For inquiries about our electrical products:
- **Business:** Sobti Enterprises
- **Categories:** Lights, Fans, Cables, Switches & Electrical Accessories
- **Audience:** Homeowners, Builders, Contractors

---

**Built with ❤️ using React, Spring Boot, and Tailwind CSS**
