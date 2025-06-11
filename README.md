# 🛍️ ShoppyGlobe

ShoppyGlobe is a simple yet functional e-commerce frontend application built with **React**, featuring dynamic product listing, cart management, checkout, and performance optimizations like **lazy loading and code splitting**.

---

## 🚀 Features

### 🧩 Core Functionalities
- **Home Page** — Showcases welcome message or featured section.
- **Product List** — Browse all available products.
- **Filter by Category** — Dynamically filter products by category via URL.
- **Product Details** — View detailed information about a specific product.
- **Cart Page** — View added products, adjust quantities, remove items.
- **Checkout Page** — Confirm order, enter address, and simulate purchase.

### 📦 State Management
- Uses **Redux Toolkit** to manage product quantities, cart state, and checkout selections.

### ⚡ Performance Optimizations
- **Code Splitting** via `React.lazy()` and `Suspense`.
- Lazy loading of routes like `ProductDetails`, `Cart`, `Checkout`, etc.

### 🧪 Error Handling
- Custom **NotFound** component for invalid routes.

---

## 🛠️ Tech Stack

| Tech         | Description                     |
|--------------|----------------------------------|
| React        | Frontend UI Library              |
| Redux Toolkit| Global State Management          |
| React Router | Routing & Navigation             |
| CSS          | Basic styling                    |
| Vite         | Fast dev server & bundling       |
| DummyJSON API| (Optional) for real product data |

---
## 🧩 Installation & Running Locally

### ⚙️ Prerequisites
- Node.js (v18 or later)
- npm or yarn

### 🔧 Setup Instructions

1. **Clone the Repository**
   ```bash
   git clone https://github.com/BeemariSrinivas/ShopifyGlobe.git
   cd ShopifyGlobe
   ```

2. **Install Dependencies**
   ```bash
   npm install
   # or
   yarn
   ```

3. **Run the App**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open in Browser**
   ```
   http://localhost:5173
   ```

---