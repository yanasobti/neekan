# 🏢 Sobti Enterprises - Premium Electrical Solutions Platform

> **A modern, professional e-commerce platform for premium electrical products** — serving homeowners, builders, contractors, and businesses with high-quality lighting, fans, cables, switches, and electrical accessories.

<div align="center">

![Java](https://img.shields.io/badge/Java-17+-ED8936?logo=java&logoColor=white&style=flat-square)
![React](https://img.shields.io/badge/React-18+-61DAFB?logo=react&logoColor=white&style=flat-square)
![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.x-6DB33F?logo=springboot&logoColor=white&style=flat-square)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-14+-336791?logo=postgresql&logoColor=white&style=flat-square)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3+-06B6D4?logo=tailwindcss&logoColor=white&style=flat-square)

[🌐 Features](#-features) • [🛠️ Tech Stack](#-tech-stack) • [🚀 Quick Start](#-quick-start) • [📡 API Docs](#-api-documentation) • [📦 Deployment](#-deployment)

</div>

---

## 📌 What is Sobti Enterprises?

Sobti Enterprises is a **full-stack e-commerce platform** designed exclusively for electrical businesses. It provides a seamless, modern shopping experience for customers to browse, compare, and request quotes for:

- ⚡ **Lighting Solutions** - LED bulbs, ceiling lights, wall lights, decorative fixtures
- 🌬️ **Premium Fans** - Ceiling fans, exhaust fans, table fans, industrial ventilation
- 🔌 **Switches & Sockets** - Modular switches, smart controls, power outlets
- 🔗 **Cables & Wiring** - Copper cables, electrical wiring, conduits, flexible cables
- 🛠️ **Electrical Accessories** - MCB panels, distribution boxes, capacitors, relays, fuses

### 🎯 Target Audience
- 🏠 **Homeowners** - DIY home improvements and renovations
- 👷 **Builders** - Bulk purchasing for construction projects
- 🏗️ **Contractors** - Professional electrical installations
- 🏭 **Businesses** - Industrial electrical solutions

---

## ✨ Key Features

### 💻 Frontend Experience
- ✅ **Responsive Design** - Mobile-first approach with Tailwind CSS
- ✅ **Product Showcase** - Asymmetric grid layouts with hover effects
- ✅ **Image/Video Support** - Display product images and demo videos
- ✅ **Search & Filter** - Browse products by category (Lighting, Fans, Switches, etc.)
- ✅ **Contact Integration** - Request quotes directly for products
- ✅ **Professional UI** - Clean, modern, light-mode design optimized for B2B customers
- ✅ **Modal Details** - View detailed product information in smooth modals
- ✅ **Category Navigation** - Sticky navigation for quick section jumping

### 🔧 Backend Capabilities
- ✅ **RESTful API** - Complete CRUD operations for products
- ✅ **Quote System** - Customers can request quotes for products
- ✅ **Contact Management** - Track inquiries with unique reference codes
- ✅ **Email Integration** - Automatic email notifications on quote requests
- ✅ **Admin Dashboard Ready** - Track and manage customer inquiries
- ✅ **Data Validation** - Strong validation with clear error messages
- ✅ **Database Persistence** - PostgreSQL with automatic migrations
- ✅ **CORS Support** - Secure cross-origin requests

---

## 🛠️ Tech Stack

### Backend
| Technology | Purpose |
|-----------|---------|
| **Spring Boot 3.x** | Modern Java web framework for REST APIs |
| **Spring Data JPA** | Object-relational mapping and database abstraction |
| **PostgreSQL 14+** | Reliable relational database for data persistence |
| **Jakarta Validation** | Input validation and error handling |
| **Lombok** | Reduce boilerplate with annotations |
| **Maven** | Build automation and dependency management |

### Frontend
| Technology | Purpose |
|-----------|---------|
| **React 18** | Component-based UI framework with hooks |
| **Vite** | Ultra-fast build tool and dev server |
| **Tailwind CSS 3** | Utility-first CSS framework for styling |
| **Axios** | HTTP client for API communication |
| **React Router** | Client-side navigation (if implemented) |

### DevOps & Infrastructure
| Tool | Purpose |
|------|---------|
| **Git** | Version control |
| **Docker** | Containerization (optional) |
| **npm/Maven** | Dependency management |

---

## 🚀 Quick Start

### Prerequisites
```bash
# Required versions
- Java 17 or higher
- Node.js 18.x or higher
- npm 9.x or higher
- PostgreSQL 14 or higher
- Maven 3.8 or higher
```

### Backend Setup

#### 1️⃣ Navigate to backend directory
```bash
cd backend/ecom
```

#### 2️⃣ Configure PostgreSQL Database
Create a new database:
```bash
# Using psql
psql -U postgres

# Inside psql shell
CREATE DATABASE ecomm;
CREATE USER ecom_user WITH PASSWORD 'your_secure_password';
GRANT ALL PRIVILEGES ON DATABASE ecomm TO ecom_user;
\q
```

#### 3️⃣ Configure Application Properties
Edit `src/main/resources/application.properties`:
```properties
# Database Configuration
spring.datasource.url=jdbc:postgresql://localhost:5432/ecomm
spring.datasource.username=ecom_user
spring.datasource.password=your_secure_password
spring.datasource.driver-class-name=org.postgresql.Driver

# JPA/Hibernate Configuration
spring.jpa.database-platform=org.hibernate.dialect.PostgreSQLDialect
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.format_sql=true

# Server Configuration
server.port=8080
server.servlet.context-path=/api

# Email Configuration (if enabled)
spring.mail.host=smtp.gmail.com
spring.mail.port=587
spring.mail.username=your_email@gmail.com
spring.mail.password=your_app_password
spring.mail.properties.mail.smtp.auth=true
spring.mail.properties.mail.smtp.starttls.enable=true
```

#### 4️⃣ Build and Run Backend
```bash
# Build the project
./mvnw clean install

# Run the Spring Boot application
./mvnw spring-boot:run

# Backend will be available at: http://localhost:8080
```

---

### Frontend Setup

#### 1️⃣ Navigate to frontend directory
```bash
cd frontend
```

#### 2️⃣ Install Dependencies
```bash
npm install
```

#### 3️⃣ Create Environment Configuration
Create `.env.local` file:
```env
VITE_API_BASE_URL=http://localhost:8080
VITE_APP_NAME=Sobti Enterprises
VITE_APP_VERSION=1.0.0
```

#### 4️⃣ Run Development Server
```bash
npm run dev

# Frontend will be available at: http://localhost:5173
```

#### 5️⃣ Build for Production
```bash
npm run build

# Output in: dist/
# Deploy the dist folder to your hosting service
```

---

## 📡 API Documentation

### Base URL
```
http://localhost:8080
```

### Authentication
Currently, the API does not require authentication. For production, implement JWT tokens or OAuth.

---

## 🛍️ Products API

### 1. Get All Products
Retrieve the complete product catalog with all details.

**Request:**
```http
GET /products
Accept: application/json
```

**Response (200 OK):**
```json
[
  {
    "id": 1,
    "name": "LED Smart Bulb 9W",
    "description": "Energy-efficient warm white LED bulb with 25000 hours lifespan",
    "imageUrl": "https://example.com/images/led-bulb.jpg",
    "category": "lighting"
  },
  {
    "id": 2,
    "name": "Ceiling Fan 48 inch",
    "description": "Powerful ceiling fan with 3-speed control and silent operation",
    "imageUrl": "https://example.com/images/fan.jpg",
    "category": "fans"
  }
]
```

**Use Cases:**
- Display product listings on homepage
- Populate product catalog page
- Show in category sections

---

### 2. Get Single Product by ID
Retrieve detailed information about a specific product.

**Request:**
```http
GET /products/{id}
Accept: application/json

# Example:
GET /products/1
```

**Path Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `id` | integer | Yes | Product ID |

**Response (200 OK):**
```json
{
  "id": 1,
  "name": "LED Smart Bulb 9W",
  "description": "Energy-efficient warm white LED bulb with 25000 hours lifespan",
  "imageUrl": "https://example.com/images/led-bulb.jpg",
  "category": "lighting"
}
```

**Error Responses:**
```json
// 404 Not Found
{
  "status": 404,
  "error": "Not Found",
  "message": "Product with id 999 not found"
}
```

**Use Cases:**
- Display product details in modal
- Show product information on detail page
- Verify product exists before quote request

---

### 3. Create Product (Add to Catalog)
Add a new product to the catalog. **Admin only (in production).**

**Request:**
```http
POST /products
Content-Type: application/json

{
  "name": "USB Power Cable 2m",
  "description": "High-quality copper power cable with 3A rating",
  "imageUrl": "https://example.com/images/cable.jpg",
  "category": "cables"
}
```

**Request Body:**
| Field | Type | Required | Validation | Description |
|-------|------|----------|-----------|-------------|
| `name` | string | Yes | Max 255 chars, not blank | Product name |
| `description` | string | No | - | Detailed product description |
| `imageUrl` | string | No | Valid URL | Product image URL or video (supports .mp4, .webm, .ogg) |
| `category` | string | No | - | Product category (lighting, fans, switches, cables, accessories) |

**Response (200 OK):**
```json
{
  "id": 10,
  "name": "USB Power Cable 2m",
  "description": "High-quality copper power cable with 3A rating",
  "imageUrl": "https://example.com/images/cable.jpg",
  "category": "cables"
}
```

**Error Response (400 Bad Request):**
```json
{
  "name": "Name cannot be empty",
  "description": "Field validation failed"
}
```

---

### 4. Update Product
Modify an existing product's information.

**Request:**
```http
PUT /products/{id}
Content-Type: application/json

{
  "name": "LED Smart Bulb 12W",
  "description": "Updated description",
  "imageUrl": "https://example.com/images/led-bulb-new.jpg",
  "category": "lighting"
}
```

**Path Parameters:**
| Parameter | Type | Required |
|-----------|------|----------|
| `id` | integer | Yes |

**Request Body:** (Same as Create Product)

**Response (200 OK):**
```json
{
  "id": 1,
  "name": "LED Smart Bulb 12W",
  "description": "Updated description",
  "imageUrl": "https://example.com/images/led-bulb-new.jpg",
  "category": "lighting"
}
```

**Error Response (404):**
```json
{
  "status": 404,
  "error": "Not Found"
}
```

---

### 5. Delete Product
Remove a product from the catalog.

**Request:**
```http
DELETE /products/{id}

# Example:
DELETE /products/5
```

**Path Parameters:**
| Parameter | Type | Required |
|-----------|------|----------|
| `id` | integer | Yes |

**Response (200 OK):**
```json
"Product deleted successfully"
```

**Error Response (404):**
```
Status: 404 Not Found
```

---

## 📧 Contact & Quote System API

### Quote Request Flow
Customers can request quotes for products, which triggers:
1. Email notification to business
2. Confirmation email to customer
3. Unique tracking reference code
4. Admin dashboard entry for follow-up

---

### 1. Submit Quote Request
Customer submits a quote request for one or more products.

**Request:**
```http
POST /contact
Content-Type: application/json

{
  "name": "Raj Kumar",
  "email": "raj@example.com",
  "phone": "9876543210",
  "message": "Interested in buying 50 units. Please provide bulk discount.",
  "productIds": [1, 2, 5]
}
```

**Request Body:**
| Field | Type | Required | Validation | Description |
|-------|------|----------|-----------|-------------|
| `name` | string | Yes | Not blank, max 100 chars | Customer full name |
| `email` | string | Yes | Valid email format | Customer email address |
| `phone` | string | Yes | Valid phone format | Customer contact number |
| `message` | string | Yes | Not blank | Quote request message/requirements |
| `productIds` | array | Yes | Array of integers | IDs of products interested in |

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Quote request submitted successfully!",
  "referenceCode": "QT-2024-A7F3K9",
  "messageId": 42
}
```

**Error Response (400 Bad Request):**
```json
{
  "name": "Name cannot be empty",
  "email": "Invalid email format",
  "phone": "Phone number is required"
}
```

**What Happens After:**
- ✅ Email sent to admin/business with quote details
- ✅ Confirmation email sent to customer with reference code
- ✅ Entry created in admin dashboard
- ✅ Customer can track inquiry using reference code

---

### 2. Track Quote Status
Customer can track the status of their quote request using the reference code.

**Request:**
```http
GET /contact/track/{referenceCode}

# Example:
GET /contact/track/QT-2024-A7F3K9
```

**Path Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `referenceCode` | string | Yes | Unique reference code from quote submission |

**Response (200 OK):**
```json
{
  "success": true,
  "referenceCode": "QT-2024-A7F3K9",
  "status": "PENDING",
  "createdAt": "2024-02-22T10:30:00",
  "productNames": "LED Smart Bulb 9W, Ceiling Fan 48 inch",
  "message": "Interested in buying 50 units. Please provide bulk discount."
}
```

**Status Values:**
| Status | Meaning |
|--------|---------|
| `PENDING` | Quote received, awaiting admin review |
| `IN_PROGRESS` | Admin reviewing and preparing quote |
| `QUOTED` | Quote sent to customer |
| `COMPLETED` | Order completed or inquiry closed |

**Error Response (404):**
```json
{
  "success": false,
  "message": "No inquiry found with this reference code"
}
```

---

## 🔐 Admin API Endpoints

### 3. Get All Inquiries
Retrieve all customer inquiries (admin only).

**Request:**
```http
GET /contact/admin/all
Accept: application/json
```

**Response (200 OK):**
```json
[
  {
    "id": 42,
    "referenceCode": "QT-2024-A7F3K9",
    "name": "Raj Kumar",
    "email": "raj@example.com",
    "phone": "9876543210",
    "message": "Interested in buying 50 units...",
    "productIds": "1,2,5",
    "productNames": "LED Smart Bulb 9W, Ceiling Fan 48 inch, Modular Switch 2-Way",
    "createdAt": "2024-02-22T10:30:00",
    "isRead": false,
    "status": "PENDING"
  }
]
```

---

### 4. Get Unread Inquiries
Retrieve only unread customer inquiries (admin only).

**Request:**
```http
GET /contact/admin/unread
Accept: application/json
```

**Response (200 OK):**
```json
[
  // Only unread inquiries
]
```

---

### 5. Get Inquiry Details
Retrieve full details of a specific inquiry.

**Request:**
```http
GET /contact/admin/{referenceCode}

# Example:
GET /contact/admin/QT-2024-A7F3K9
```

**Response (200 OK):**
```json
{
  "id": 42,
  "referenceCode": "QT-2024-A7F3K9",
  "name": "Raj Kumar",
  "email": "raj@example.com",
  "phone": "9876543210",
  "message": "Interested in buying 50 units...",
  "productIds": "1,2,5",
  "productNames": "LED Smart Bulb 9W, Ceiling Fan 48 inch, Modular Switch 2-Way",
  "createdAt": "2024-02-22T10:30:00",
  "isRead": false,
  "status": "PENDING"
}
```

---

### 6. Update Inquiry Status
Update the status and mark inquiry as read.

**Request:**
```http
PUT /contact/admin/{referenceCode}/status
Content-Type: application/json

{
  "status": "QUOTED"
}
```

**Request Body:**
```json
{
  "status": "PENDING|IN_PROGRESS|QUOTED|COMPLETED"
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Status updated successfully"
}
```

---

### 7. Mark Inquiry as Read
Mark a specific inquiry as read.

**Request:**
```http
PUT /contact/admin/{referenceCode}/read
```

**Response (200 OK):**
```json
{
  "success": true
}
```

---

## 💻 Frontend Integration Examples

### Using Axios to Fetch Products

Create `src/services/api.js`:
```javascript
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
```

---

### Example: Display Product Catalog

```javascript
import { useEffect, useState } from 'react';
import api from '../services/api';

function ProductCatalog() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await api.get('/products');
      setProducts(response.data);
    } catch (err) {
      setError('Failed to load products');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="text-center py-10">Loading...</div>;
  if (error) return <div className="text-red-600 text-center py-10">{error}</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
      {products.map(product => (
        <div key={product.id} className="border rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition">
          {product.imageUrl && (
            <img src={product.imageUrl} alt={product.name} className="w-full h-64 object-cover" />
          )}
          <div className="p-4">
            <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
            <p className="text-gray-600 text-sm mb-3">{product.description}</p>
            <span className="inline-block bg-gray-200 text-gray-800 px-3 py-1 rounded text-xs">
              {product.category}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ProductCatalog;
```

---

### Example: Submit Quote Request

```javascript
import { useState } from 'react';
import api from '../services/api';

function QuoteRequestForm({ selectedProductIds }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [referenceCode, setReferenceCode] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(null);
      
      const response = await api.post('/contact', {
        ...formData,
        productIds: selectedProductIds
      });

      setSuccess(true);
      setReferenceCode(response.data.referenceCode);
      setFormData({ name: '', email: '', phone: '', message: '' });
      
      // Show success message for 5 seconds
      setTimeout(() => setSuccess(false), 5000);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to submit quote request');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4">
      {success && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
          <p className="font-semibold">Quote Submitted Successfully!</p>
          <p className="text-sm">Reference Code: {referenceCode}</p>
          <p className="text-sm">We'll contact you soon with a quote.</p>
        </div>
      )}

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      <input
        type="text"
        name="name"
        placeholder="Your Name"
        value={formData.name}
        onChange={handleChange}
        required
        className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <input
        type="email"
        name="email"
        placeholder="Email Address"
        value={formData.email}
        onChange={handleChange}
        required
        className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <input
        type="tel"
        name="phone"
        placeholder="Phone Number"
        value={formData.phone}
        onChange={handleChange}
        required
        className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <textarea
        name="message"
        placeholder="Your Requirements (e.g., quantity, specifications)"
        value={formData.message}
        onChange={handleChange}
        required
        rows="5"
        className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 text-white py-2 rounded font-semibold hover:bg-blue-700 disabled:bg-gray-400 transition"
      >
        {loading ? 'Submitting...' : 'Request Quote'}
      </button>
    </form>
  );
}

export default QuoteRequestForm;
```

---

## 🗄️ Database Schema

### Product Table
```sql
CREATE TABLE product (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    image_url VARCHAR(500),
    category VARCHAR(100)
);

-- Sample Data
INSERT INTO product (name, description, image_url, category) VALUES
('LED Smart Bulb 9W', 'Energy-efficient warm white LED', 'https://example.com/led.jpg', 'lighting'),
('Ceiling Fan 48 inch', 'Powerful with 3-speed control', 'https://example.com/fan.jpg', 'fans'),
('Modular Switch 2-Way', 'Modern aesthetic switch', 'https://example.com/switch.jpg', 'switches'),
('Copper Cable 2m', 'High-quality power cable', 'https://example.com/cable.jpg', 'cables');
```

### Contact Message Table
```sql
CREATE TABLE contact_message (
    id SERIAL PRIMARY KEY,
    reference_code VARCHAR(50) UNIQUE NOT NULL,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    phone VARCHAR(20),
    message TEXT NOT NULL,
    product_ids VARCHAR(500),
    product_names TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_read BOOLEAN DEFAULT FALSE,
    status VARCHAR(50) DEFAULT 'PENDING'
);

-- Indexes for better performance
CREATE INDEX idx_reference_code ON contact_message(reference_code);
CREATE INDEX idx_email ON contact_message(email);
CREATE INDEX idx_created_at ON contact_message(created_at DESC);
CREATE INDEX idx_is_read ON contact_message(is_read);
```

---

## 🔍 API Testing

### Using cURL

**Get All Products:**
```bash
curl -X GET http://localhost:8080/products \
  -H "Accept: application/json"
```

**Submit Quote Request:**
```bash
curl -X POST http://localhost:8080/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "9876543210",
    "message": "Need 100 units",
    "productIds": [1, 2, 3]
  }'
```

### Using Postman
1. Import the API endpoints into Postman
2. Create environment variables for `BASE_URL` and `API_KEY`
3. Test each endpoint with sample data
4. Use the collection runner for batch testing

### Using Thunder Client (VS Code Extension)
```json
{
  "name": "Get Products",
  "method": "GET",
  "url": "{{BASE_URL}}/products",
  "headers": {
    "Accept": "application/json"
  }
}
```

---

## 🚨 Error Handling

### Standard Error Response Format
```json
{
  "status": 400,
  "error": "Bad Request",
  "message": "Validation failed",
  "errors": {
    "name": "Name cannot be empty",
    "email": "Invalid email format"
  }
}
```

### Common HTTP Status Codes
| Code | Meaning | Action |
|------|---------|--------|
| 200 | OK | Request succeeded |
| 201 | Created | Resource created successfully |
| 400 | Bad Request | Validation error, check request data |
| 404 | Not Found | Resource doesn't exist |
| 500 | Server Error | Internal server error, try again later |

---

## 📦 Deployment

### Deploy Backend to Production

#### Option 1: Traditional Server (VPS)
```bash
# Build production JAR
./mvnw clean package -DskipTests

# Upload to server
scp target/ecom-0.0.1-SNAPSHOT.jar user@your-server:/app/

# SSH into server
ssh user@your-server

# Run with systemd
sudo systemctl start ecom
```

#### Option 2: Docker Containerization
```dockerfile
FROM openjdk:17-jdk-slim

WORKDIR /app

COPY target/ecom-0.0.1-SNAPSHOT.jar app.jar

EXPOSE 8080

CMD ["java", "-jar", "app.jar"]
```

```bash
# Build image
docker build -t sobti-backend:latest .

# Run container
docker run -d \
  -p 8080:8080 \
  -e SPRING_DATASOURCE_URL=jdbc:postgresql://postgres:5432/ecomm \
  -e SPRING_DATASOURCE_USERNAME=ecom_user \
  -e SPRING_DATASOURCE_PASSWORD=password \
  --name sobti-backend \
  sobti-backend:latest
```

#### Option 3: Cloud Platforms
- **Heroku** - `git push heroku main` (free tier available)
- **AWS Elastic Beanstalk** - Auto-scaling and load balancing
- **Google Cloud Run** - Serverless container deployment
- **DigitalOcean App Platform** - Simple and affordable

---

### Deploy Frontend to Production

#### Option 1: Netlify (Recommended)
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login
netlify login

# Deploy
netlify deploy --prod --dir=dist
```

#### Option 2: Vercel
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel --prod
```

#### Option 3: Traditional Web Hosting
```bash
# Build
npm run build

# Upload dist folder to web server
# Update VITE_API_BASE_URL to production API URL
```

#### Option 4: GitHub Pages
```bash
# Add to vite.config.js
export default {
  base: '/sobti-enterprises/',
}

# Deploy
npm run build
# Upload dist folder to gh-pages branch
```

---

## 🔒 Security Considerations

### Before Production Deployment

- [ ] **Enable HTTPS** - Use SSL/TLS certificates (Let's Encrypt)
- [ ] **Update CORS** - Set specific frontend domain instead of `localhost:5173`
- [ ] **Add Authentication** - Implement JWT tokens for admin endpoints
- [ ] **Rate Limiting** - Prevent API abuse with rate limiting middleware
- [ ] **SQL Injection Prevention** - Use parameterized queries (JPA does this)
- [ ] **Input Validation** - Validate all user inputs (already implemented)
- [ ] **Environment Variables** - Store secrets in `.env` files (not in code)
- [ ] **Database Backup** - Regular automated backups
- [ ] **Logging & Monitoring** - Log API activity and errors

### CORS Configuration for Production
```java
@CrossOrigin(origins = "https://your-domain.com")
```

---

## 📚 Additional Resources

### Documentation
- [Spring Boot Documentation](https://spring.io/projects/spring-boot)
- [React Documentation](https://react.dev)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)

### Learning Resources
- Spring Boot REST API Tutorial
- React Hooks & State Management
- Tailwind CSS Utility-First Design
- PostgreSQL Query Optimization

---

## 🐛 Troubleshooting

### Backend Issues

**Port 8080 Already in Use:**
```bash
# Find process using port 8080
lsof -i :8080

# Kill the process
kill -9 <PID>

# Or change port in application.properties
server.port=8081
```

**Database Connection Failed:**
```bash
# Verify PostgreSQL is running
psql -U postgres -c "SELECT version();"

# Check database exists
psql -U postgres -l | grep ecomm

# Test connection
psql -U ecom_user -d ecomm -h localhost
```

**Compilation Error:**
```bash
# Clear Maven cache
./mvnw clean
./mvnw install -DskipTests
```

### Frontend Issues

**VITE_API_BASE_URL Not Working:**
```bash
# Must start with VITE_
# Restart dev server after .env changes
npm run dev
```

**Tailwind CSS Not Applying:**
```bash
# Rebuild CSS
npm install
npm run dev

# Check tailwind.config.js content paths
```

**API Calls Failing:**
```javascript
// Check browser console for CORS errors
// Verify backend is running on correct port
console.log(import.meta.env.VITE_API_BASE_URL);
```

---

## 📞 Support & Contact

For issues or feature requests:
- 📧 Email: support@sobtienterprises.com
- 🐛 GitHub Issues: [Submit Bug Report](https://github.com/sobti/platform/issues)
- 💬 Discussion Forum: [Community Help](https://github.com/sobti/platform/discussions)

---

## 📄 License

This project is **proprietary software** for Sobti Enterprises. All rights reserved.

---

## 🙏 Acknowledgments

Built with modern technologies:
- React community for excellent documentation
- Spring Boot team for robust framework
- Tailwind CSS for beautiful design system
- PostgreSQL community for reliable database

---

<div align="center">

**⭐ If you found this helpful, please star the repository!**

Made with ❤️ for Sobti Enterprises

![Banner](https://via.placeholder.com/1200x100?text=Sobti+Enterprises)

</div>

