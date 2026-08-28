# 🛍️ Maison — Modern E-Commerce Platform

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-13.5.1-black?style=for-the-badge&logo=next.js" alt="Next.js">
  <img src="https://img.shields.io/badge/React-18.2.0-61DAFB?style=for-the-badge&logo=react" alt="React">
  <img src="https://img.shields.io/badge/TypeScript-5.2.2-3178C6?style=for-the-badge&logo=typescript" alt="TypeScript">
  <img src="https://img.shields.io/badge/Tailwind_CSS-3.3.3-38B2AC?style=for-the-badge&logo=tailwind-css" alt="Tailwind CSS">
  <img src="https://img.shields.io/badge/Supabase-PostgreSQL-3ECF8E?style=for-the-badge&logo=supabase" alt="Supabase">
  <img src="https://img.shields.io/badge/Netlify-Ready-00C7B7?style=for-the-badge&logo=netlify" alt="Netlify">
</p>

<p align="center">
  <strong>A modern, responsive and production-oriented e-commerce storefront built with Next.js, React, TypeScript, Tailwind CSS and Supabase.</strong>
</p>

---

## 📋 Table of Contents

* [Overview](#-overview)
* [Project Vision](#-project-vision)
* [Key Features](#-key-features)
* [Technology Stack](#-technology-stack)
* [Architecture](#-architecture)
* [Project Structure](#-project-structure)
* [Application Pages](#-application-pages)
* [Core Components](#-core-components)
* [Database Architecture](#-database-architecture)
* [Data Layer](#-data-layer)
* [Shopping Cart](#-shopping-cart)
* [Product Management](#-product-management)
* [Reviews System](#-reviews-system)
* [UI/UX Design](#-uiux-design)
* [Responsive Design](#-responsive-design)
* [Security](#-security)
* [Performance](#-performance)
* [Environment Variables](#-environment-variables)
* [Installation](#-installation)
* [Development](#-development)
* [Production Build](#-production-build)
* [Deployment](#-deployment)
* [Database Setup](#-database-setup)
* [Available Scripts](#-available-scripts)
* [Engineering Practices](#-engineering-practices)
* [Future Improvements](#-future-improvements)
* [Troubleshooting](#-troubleshooting)
* [License](#-license)
* [Author](#-author)

---

# 🛍️ Overview

**Maison** is a modern e-commerce web application designed to provide an elegant and intuitive online shopping experience.

The application combines a polished storefront interface with a structured Supabase/PostgreSQL data layer. Customers can browse products, explore categories, inspect detailed product information, read reviews, manage quantities and maintain a persistent shopping cart directly in the browser.

The project was designed with a strong focus on:

* Modern UI/UX
* Responsive web design
* Component reusability
* Server-side data fetching
* Type-safe application development
* Scalable database architecture
* Maintainable project organization
* Production-oriented deployment
* Accessibility-conscious interactions

The storefront follows a premium editorial design approach rather than a generic e-commerce template, providing a clean visual hierarchy and a smooth shopping journey.

---
# 🌐 Live Demo

The Maison e-commerce platform is deployed and publicly accessible through Netlify.

**Production Website:**

👉 https://shoppingeco.netlify.app/

The live application provides access to the complete storefront experience, including:

* 🏠 Homepage
* 🛍️ Product catalog
* 🗂️ Product categories
* 📦 Product details
* ⭐ Product reviews and ratings
* 🛒 Shopping cart
* 💰 Product pricing and discounts
* 📱 Responsive mobile experience
* 🎨 Modern responsive UI
---

# 🎯 Project Vision

The primary objective of Maison is to create an e-commerce foundation that combines:

> **Premium design + modern frontend architecture + structured data management + maintainable engineering practices.**

The application is designed around the customer journey:

```text
Landing Page
     ↓
Discover Categories
     ↓
Browse Products
     ↓
Product Details
     ↓
Reviews & Product Information
     ↓
Add to Cart
     ↓
Cart Review
     ↓
Checkout
```

The architecture separates presentation, application state, and data access responsibilities, making the project easier to maintain and extend.

---

# ✨ Key Features

## 🏠 Premium Homepage

The homepage provides a complete storefront experience containing:

* Hero section
* Promotional content
* Feature banner
* Category showcase
* Featured products
* Promotional banner
* Customer testimonials
* Responsive navigation
* Persistent shopping cart

---

## 🛒 Shopping Cart

The application includes a client-side shopping cart powered by React Context.

Customers can:

* Add products
* Add multiple quantities
* Increase quantities
* Decrease quantities
* Remove products
* Clear the cart
* View subtotal
* View shipping cost
* View total cost
* Open and close the cart drawer
* Continue shopping

Cart state is persisted using browser `localStorage`.

Cart storage key:

```text
maison-cart
```

This allows the shopping cart to survive browser refreshes and normal navigation.

---

## 📦 Product Catalog

Products are dynamically retrieved from Supabase.

Each product supports:

* Name
* URL slug
* Description
* Price
* Compare-at price
* Main image
* Image gallery
* Category
* Rating
* Review count
* Stock quantity
* Featured status
* Badge
* Creation timestamp

Example product model:

```text
Product
├── id
├── name
├── slug
├── description
├── price
├── compare_at_price
├── image_url
├── gallery
├── category_id
├── rating
├── review_count
├── stock
├── featured
├── badge
└── created_at
```

---

# 🗂️ Category System

Products can be organized into categories.

Categories contain:

* Unique ID
* Name
* URL slug
* Image
* Creation timestamp

Customers can navigate to category-specific pages:

```text
/categories/[slug]
```

The application dynamically retrieves products belonging to the selected category.

---

# ⭐ Product Reviews

Products support customer reviews.

Each review contains:

* Review ID
* Product ID
* Author name
* Rating
* Comment
* Creation timestamp

Ratings are restricted at the database level to values between:

```text
1 → 5
```

Reviews are retrieved dynamically for individual product pages.

---

# 🏷️ Product Pricing & Discounts

Maison supports comparison pricing.

Products can contain:

```text
price
compare_at_price
```

When the comparison price is higher than the current price, the application automatically calculates the discount percentage.

Formula:

```text
Discount % =
((compare_at_price - price) / compare_at_price) × 100
```

This allows the interface to display messages such as:

```text
Save 20%
```

---

# 🚚 Shipping Logic

The storefront currently provides free shipping for orders above:

```text
$150
```

For carts below the threshold, the interface calculates the remaining amount required to qualify for free shipping.

Example:

```text
Subtotal: $120

Add $30 more for free shipping
```

This logic is implemented directly within the shopping cart experience.

---

# 🧱 Technology Stack

## Frontend

| Technology         | Purpose                         |
| ------------------ | ------------------------------- |
| Next.js 13.5.1     | React framework                 |
| React 18.2.0       | UI library                      |
| TypeScript 5.2.2   | Static typing                   |
| Tailwind CSS 3.3.3 | Styling                         |
| Radix UI           | Accessible UI primitives        |
| shadcn/ui          | Reusable component architecture |
| Lucide React       | Icon system                     |
| React Hook Form    | Form management                 |
| Zod                | Validation                      |
| Recharts           | Data visualization              |
| Sonner             | Notifications                   |
| next-themes        | Theme support                   |

---

## Backend / Data Platform

| Technology         | Purpose                 |
| ------------------ | ----------------------- |
| Supabase           | Backend-as-a-Service    |
| PostgreSQL         | Relational database     |
| Supabase JS Client | Database communication  |
| Row Level Security | Database access control |

The application uses Supabase directly as its backend/data platform rather than maintaining a separate Express or NestJS API server.

---

## Deployment

The project contains Netlify deployment configuration:

```text
netlify.toml
```

The build process uses:

```bash
npx next build
```

with the official Netlify Next.js plugin.

---

# 🏗️ Architecture

Maison uses the Next.js App Router architecture.

High-level architecture:

```text
┌──────────────────────────────────────────────┐
│                  Browser                     │
│                                              │
│  React Components                            │
│  ├── Header                                  │
│  ├── Product Cards                           │
│  ├── Product Gallery                         │
│  ├── Cart Drawer                             │
│  └── Product Information                     │
│                                              │
│             React Context                    │
│              Cart State                      │
└──────────────────────┬───────────────────────┘
                       │
                       ▼
┌──────────────────────────────────────────────┐
│                Next.js                       │
│                                              │
│        App Router / Server Components        │
│                                              │
│  ├── Home                                    │
│  ├── Shop                                    │
│  ├── Categories                              │
│  └── Products                                │
└──────────────────────┬───────────────────────┘
                       │
                       ▼
┌──────────────────────────────────────────────┐
│                 Supabase                     │
│                                              │
│  Supabase JS Client                          │
│          ↓                                   │
│      PostgreSQL                              │
│          ├── categories                      │
│          ├── products                         │
│          └── reviews                          │
│                                              │
│       Row Level Security                     │
└──────────────────────────────────────────────┘
```

---

# 📁 Project Structure

```text
project-ecommerce-main/
│
├── app/
│   ├── categories/
│   │   └── [slug]/
│   │       └── page.tsx
│   │
│   ├── products/
│   │   └── [slug]/
│   │       └── page.tsx
│   │
│   ├── shop/
│   │   └── page.tsx
│   │
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
│
├── components/
│   ├── ui/
│   │   ├── accordion.tsx
│   │   ├── alert.tsx
│   │   ├── avatar.tsx
│   │   ├── badge.tsx
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── carousel.tsx
│   │   ├── checkbox.tsx
│   │   ├── dialog.tsx
│   │   ├── drawer.tsx
│   │   ├── dropdown-menu.tsx
│   │   ├── form.tsx
│   │   ├── input.tsx
│   │   ├── navigation-menu.tsx
│   │   ├── pagination.tsx
│   │   ├── select.tsx
│   │   ├── sheet.tsx
│   │   ├── table.tsx
│   │   ├── tabs.tsx
│   │   ├── toast.tsx
│   │   └── ...
│   │
│   ├── cart-drawer.tsx
│   ├── category-showcase.tsx
│   ├── feature-banner.tsx
│   ├── featured-products.tsx
│   ├── footer.tsx
│   ├── header.tsx
│   ├── hero.tsx
│   ├── product-card.tsx
│   ├── product-gallery.tsx
│   ├── product-grid.tsx
│   ├── product-info.tsx
│   ├── promo-banner.tsx
│   ├── providers.tsx
│   ├── reviews-section.tsx
│   ├── star-rating.tsx
│   └── testimonials.tsx
│
├── hooks/
│   └── use-toast.ts
│
├── lib/
│   ├── cart-context.tsx
│   ├── data.ts
│   ├── supabase-client.ts
│   ├── supabase-server.ts
│   ├── types.ts
│   └── utils.ts
│
├── supabase/
│   └── migrations/
│       └── 20260827225507_create_ecommerce_schema.sql
│
├── .bolt/
│   ├── config.json
│   ├── ignore
│   └── prompt
│
├── .eslintrc.json
├── .gitignore
├── components.json
├── next.config.js
├── netlify.toml
├── package.json
├── package-lock.json
├── postcss.config.js
├── tailwind.config.ts
└── tsconfig.json
```

---

# 📄 Application Pages

## Homepage

```text
/
```

The homepage combines:

* Hero
* Features
* Categories
* Featured products
* Promotional content
* Testimonials

Data is retrieved server-side through the data layer.

---

## Shop Page

```text
/shop
```

Displays the complete product catalog.

The page retrieves:

```text
getProducts()
getCategories()
```

and passes the results to the reusable `ProductGrid` component.

---

## Category Page

```text
/categories/[slug]
```

Example:

```text
/categories/furniture
```

The page:

1. Retrieves available categories.
2. Resolves the requested slug.
3. Returns `404` when the category does not exist.
4. Retrieves products belonging to the category.
5. Displays the products through the reusable product grid.

---

## Product Details

```text
/products/[slug]
```

The product page provides:

* Breadcrumb navigation
* Product gallery
* Product information
* Price
* Discount information
* Stock status
* Quantity selector
* Add-to-cart functionality
* Wishlist interaction
* Trust badges
* Customer reviews
* Related products

---

# 🧩 Core Components

## Header

Located at:

```text
components/header.tsx
```

Responsibilities:

* Main navigation
* Category navigation
* Mobile menu
* Shopping cart access
* Search interface
* Sticky navigation behavior
* Scroll-aware styling

The header dynamically receives categories from the application data layer.

---

## Product Card

```text
components/product-card.tsx
```

Provides reusable product presentation throughout the storefront.

It supports:

* Product image
* Product name
* Price
* Rating
* Badge
* Discount information
* Product navigation

---

## Product Grid

```text
components/product-grid.tsx
```

Provides a reusable product listing interface.

The same component is reused by:

* Shop page
* Category pages
* Other product listing sections

This reduces duplication and improves maintainability.

---

## Product Gallery

```text
components/product-gallery.tsx
```

Handles:

* Main product image
* Additional gallery images
* Product image navigation
* Responsive presentation

---

## Product Information

```text
components/product-info.tsx
```

Handles the interactive purchasing interface:

* Category
* Product title
* Rating
* Price
* Discount
* Description
* Stock
* Quantity
* Add to cart
* Wishlist
* Trust information

---

## Cart Drawer

```text
components/cart-drawer.tsx
```

Provides an interactive side-panel cart.

The cart includes:

* Product list
* Quantity controls
* Product removal
* Subtotal
* Shipping calculation
* Total
* Checkout CTA
* Continue shopping action

---

# 🗄️ Database Architecture

Supabase PostgreSQL contains three primary tables.

```text
┌─────────────────┐
│   categories    │
├─────────────────┤
│ id              │
│ name            │
│ slug            │
│ image_url       │
│ created_at      │
└────────┬────────┘
         │
         │ 1:N
         ▼
┌─────────────────┐
│    products     │
├─────────────────┤
│ id              │
│ name            │
│ slug            │
│ description     │
│ price           │
│ compare_at_price│
│ image_url       │
│ gallery         │
│ category_id     │
│ rating          │
│ review_count    │
│ stock           │
│ featured        │
│ badge           │
│ created_at      │
└────────┬────────┘
         │
         │ 1:N
         ▼
┌─────────────────┐
│     reviews     │
├─────────────────┤
│ id              │
│ product_id      │
│ author_name     │
│ rating          │
│ comment         │
│ created_at      │
└─────────────────┘
```

---

# 🔐 Database Security

Row Level Security is enabled on:

```text
categories
products
reviews
```

The current storefront configuration allows:

### Categories

Public users can read categories.

```text
SELECT → allowed
```

Write operations are not granted to anonymous users.

### Products

Public users can read products.

```text
SELECT → allowed
```

### Reviews

Public users can:

```text
SELECT
INSERT
UPDATE
DELETE
```

The migration explicitly configures these policies.

> **Production recommendation:** Review modification policies should be tightened before using the application as a real public commerce platform. Anonymous users should generally not be allowed to update or delete arbitrary reviews.

---

# 🔎 Data Layer

The main data access layer is:

```text
lib/data.ts
```

It provides reusable server-side functions.

### Get Categories

```typescript
getCategories()
```

Returns all categories ordered alphabetically.

---

### Get Featured Products

```typescript
getFeaturedProducts()
```

Returns products where:

```text
featured = true
```

and sorts them by rating.

---

### Get All Products

```typescript
getProducts()
```

Returns the complete catalog ordered by creation date.

---

### Get Products by Category

```typescript
getProductsByCategory(slug)
```

Resolves the category and retrieves associated products.

---

### Get Product by Slug

```typescript
getProductBySlug(slug)
```

Used by the dynamic product page.

---

### Get Reviews

```typescript
getReviews(productId)
```

Retrieves reviews associated with a specific product.

---

# 🧠 Type System

Application data structures are centralized in:

```text
lib/types.ts
```

Important types include:

```typescript
Category
Product
Review
ProductWithCategory
CartItem
```

This provides a consistent contract between:

* Database data
* Server components
* Client components
* Cart state
* Product presentation

---

# 🛒 Shopping Cart Architecture

The shopping cart is implemented using:

```text
lib/cart-context.tsx
```

It uses:

```text
React Context
+
useState
+
useEffect
+
useCallback
+
localStorage
```

The architecture is:

```text
Providers
   │
   └── CartProvider
          │
          ├── Cart state
          ├── Cart persistence
          ├── Add item
          ├── Remove item
          ├── Update quantity
          ├── Clear cart
          ├── Open cart
          └── Close cart
```

The `Providers` component wraps the application and exposes the cart globally.

---

# 💾 Cart Persistence

The cart is persisted in:

```text
localStorage
```

using:

```text
maison-cart
```

When the application starts:

```text
Browser
   ↓
localStorage
   ↓
CartProvider
   ↓
React state
```

When cart state changes:

```text
React state
   ↓
localStorage
```

This allows users to retain their cart during normal browser sessions and page refreshes.

---

# 🎨 UI/UX Design

Maison follows a premium minimalist e-commerce design philosophy.

The interface emphasizes:

* Strong typography
* Spacious layouts
* Clear hierarchy
* Product-focused imagery
* Minimal visual noise
* Consistent spacing
* Rounded interactive elements
* Responsive navigation
* Accessible interaction patterns

The project uses Tailwind CSS for styling and Radix/shadcn-based components for reusable UI primitives.

---

# 📱 Responsive Design

The application is designed for:

```text
Mobile
Tablet
Desktop
Large Desktop
```

Responsive behavior is implemented using Tailwind breakpoints.

Example:

```text
sm:
md:
lg:
xl:
```

The navigation automatically changes between:

### Desktop

```text
Horizontal navigation
Categories menu
Search
Cart
```

### Mobile

```text
Hamburger menu
Mobile navigation drawer
Cart
```

---

# ♿ Accessibility Considerations

The interface includes accessibility-conscious patterns such as:

* Semantic navigation
* `aria-label` attributes
* Keyboard-oriented interactive controls
* Accessible Radix UI primitives
* Proper button elements
* Descriptive image alternative text
* Focus-friendly interactive components

Examples include:

```text
aria-label="Open menu"
aria-label="Close menu"
aria-label="Open cart"
aria-label="Decrease quantity"
aria-label="Increase quantity"
```

---

# 🔒 Security

The application benefits from several security mechanisms provided by its architecture.

## Row Level Security

Supabase PostgreSQL tables have RLS enabled.

This provides a database-level authorization layer rather than relying exclusively on frontend restrictions.

---

## Environment-Based Credentials

Supabase credentials are loaded through environment variables rather than hardcoded directly into application components.

Required variables include:

```text
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
```

---

## Server-Side Data Access

The project separates server-side Supabase access into:

```text
lib/supabase-server.ts
```

while client-side access is provided through:

```text
lib/supabase-client.ts
```

This separation makes the data architecture easier to reason about and maintain.

---

## Input Validation

The project includes:

```text
Zod
React Hook Form
```

which provide a foundation for validating user-controlled data.

---

# ⚡ Performance

The application uses several Next.js capabilities that support efficient rendering.

## Server Components

The primary catalog pages are implemented as asynchronous server components.

For example:

```typescript
export default async function ShopPage() {
```

This allows data fetching to occur on the server before the UI is rendered.

---

## Parallel Data Fetching

The homepage retrieves independent datasets concurrently:

```typescript
const [categories, featuredProducts] = await Promise.all([
  getCategories(),
  getFeaturedProducts(),
]);
```

This avoids unnecessary sequential requests.

---

## Reusable Components

Reusable components such as:

```text
ProductCard
ProductGrid
ProductGallery
ProductInfo
```

reduce duplication and improve maintainability.

---

## Database Indexing

The Supabase migration creates indexes for frequently accessed fields:

```text
idx_products_category_id
idx_products_featured
idx_products_slug
idx_reviews_product_id
```

These indexes improve lookup efficiency for common product and review queries.

---

# 🌐 Environment Variables

Create a local environment file:

```text
.env.local
```

Add:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Example

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

Do not commit sensitive environment configuration to Git.

Make sure `.env.local` is included in `.gitignore`.

---

# 🚀 Installation

## 1. Clone the Repository

```bash
git clone <your-repository-url>
```

Move into the project directory:

```bash
cd project-ecommerce-main
```

---

## 2. Install Dependencies

Using npm:

```bash
npm install
```

---

## 3. Configure Environment Variables

Create:

```text
.env.local
```

Then configure:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

---

# 🗄️ Database Setup

The database schema is located at:

```text
supabase/migrations/20260827225507_create_ecommerce_schema.sql
```

The migration creates:

```text
categories
products
reviews
```

as well as:

* Foreign keys
* Indexes
* Constraints
* Row Level Security
* Access policies

---

## Running the Migration

If using the Supabase CLI:

```bash
supabase db push
```

Alternatively, the migration SQL can be executed through the Supabase SQL Editor.

After execution, verify that the following tables exist:

```text
categories
products
reviews
```

---

# 💻 Development

Start the development server:

```bash
npm run dev
```

The application will normally be available at:

```text
http://localhost:3000
```

The development server supports hot reload, allowing changes to appear without manually restarting the application.

---

# 🏗️ Production Build

Create an optimized production build:

```bash
npm run build
```

Then start the production server:

```bash
npm run start
```

The production application will run using the optimized Next.js build.

---

# 📜 Available Scripts

| Command             | Description                    |
| ------------------- | ------------------------------ |
| `npm run dev`       | Start development server       |
| `npm run build`     | Build production application   |
| `npm run start`     | Start production server        |
| `npm run lint`      | Run Next.js linting            |
| `npm run typecheck` | Run TypeScript compiler checks |

---

# ☁️ Deployment

The project includes a `netlify.toml` configuration.

Current deployment configuration:

```toml
[build]
command = "npx next build"
publish = ".next"

[[plugins]]
package = "@netlify/plugin-nextjs"
```

This makes the project suitable for deployment on Netlify using the Next.js runtime integration.

---

## Netlify Deployment Steps

### 1. Push the Project to GitHub

```bash
git add .
git commit -m "Initial e-commerce application"
git push origin main
```

### 2. Create a Netlify Site

Connect the GitHub repository to Netlify.

### 3. Configure Environment Variables

Add:

```text
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
```

to the Netlify environment configuration.

### 4. Deploy

Netlify will execute:

```bash
npx next build
```

and use the configured Next.js plugin.

---

# 🧪 Quality Assurance

Before deployment, the recommended validation sequence is:

```bash
npm run typecheck
npm run lint
npm run build
```

Then manually verify:

### Homepage

* [ ] Hero renders correctly
* [ ] Categories load
* [ ] Featured products load
* [ ] Testimonials render
* [ ] Navigation works

### Product Catalog

* [ ] Shop page loads
* [ ] Product cards render
* [ ] Category filtering/navigation works
* [ ] Product details load
* [ ] Related products appear

### Cart

* [ ] Add product
* [ ] Increase quantity
* [ ] Decrease quantity
* [ ] Remove product
* [ ] Cart persists after refresh
* [ ] Subtotal calculates correctly
* [ ] Shipping threshold works
* [ ] Total calculates correctly

### Reviews

* [ ] Reviews load
* [ ] Ratings display correctly
* [ ] Review data maps to products

### Responsive UI

* [ ] Mobile navigation
* [ ] Tablet layout
* [ ] Desktop layout
* [ ] Product gallery responsiveness
* [ ] Cart drawer responsiveness

---

# 🧭 Engineering Practices

The project follows several professional engineering principles.

## Separation of Concerns

The architecture separates:

```text
UI
↓
Components
↓
Application State
↓
Data Layer
↓
Database
```

---

## Reusable Components

Repeated UI behavior is encapsulated into reusable components.

Examples:

```text
ProductCard
ProductGrid
StarRating
ProductGallery
ProductInfo
CartDrawer
```

---

## Strong Typing

TypeScript interfaces and type aliases provide explicit contracts for application data.

This reduces:

* Runtime mistakes
* Incorrect property access
* Inconsistent data structures
* Refactoring risk

---

## Server/Client Separation

Components requiring browser APIs or React client-side state are explicitly marked:

```typescript
'use client';
```

Examples include:

```text
header.tsx
cart-context.tsx
cart-drawer.tsx
product-info.tsx
providers.tsx
```

This is consistent with Next.js App Router architecture.

---

# 🚧 Current Scope & Limitations

The current implementation is primarily a **storefront and product browsing experience**.

The cart includes a checkout CTA, but a complete production payment workflow is not currently implemented.

The project does not currently include a complete:

* User account system
* Customer authentication flow
* Order management system
* Payment gateway integration
* Admin dashboard
* Inventory management backend
* Shipping provider integration
* Transactional email system

These can be added as future modules.

---

# 🔮 Future Improvements

## 💳 Payment Integration

Integrate a payment provider such as:

```text
Stripe
PayPal
Checkout.com
```

A production checkout should validate prices and inventory server-side rather than trusting client-side cart data.

---

## 👤 Authentication

Add customer authentication supporting:

* Registration
* Login
* Logout
* Password reset
* Customer profiles
* Order history

Supabase Auth would integrate naturally with the existing architecture.

---

## 📦 Order Management

Introduce tables such as:

```text
orders
order_items
shipping_addresses
payments
```

Suggested relationship:

```text
User
 │
 └── Orders
       │
       └── Order Items
             │
             └── Products
```

---

## 🛠️ Admin Dashboard

A future administration interface could provide:

```text
Dashboard
├── Products
├── Categories
├── Orders
├── Customers
├── Reviews
├── Inventory
└── Analytics
```

---

## 🔍 Advanced Search

The existing interface includes a search-oriented navigation element.

A complete search system could support:

* Product name search
* Category filtering
* Price filtering
* Rating filtering
* Availability filtering
* Sorting
* Search suggestions

---

## ❤️ Persistent Wishlist

The current product interface includes wishlist interaction.

A production implementation could persist wishlist data through:

```text
Authenticated User
        ↓
Wishlist
        ↓
Wishlist Items
        ↓
Products
```

---

## 📊 Analytics

Potential integrations:

```text
Google Analytics
PostHog
Plausible
Supabase Analytics
```

Possible metrics:

* Product views
* Add-to-cart events
* Checkout conversion
* Most popular products
* Category engagement
* Cart abandonment

---

# 🛡️ Production Security Recommendations

Before using the application for real commercial transactions, the following improvements are recommended:

### 1. Restrict Review Permissions

Anonymous users should not be able to arbitrarily update or delete reviews.

### 2. Add Authentication

Use Supabase Auth for customer identity.

### 3. Server-Side Price Validation

Never trust product prices submitted by the browser during checkout.

### 4. Server-Side Inventory Validation

Verify stock before creating an order.

### 5. Secure Checkout

Payment operations should be performed through trusted server-side endpoints.

### 6. Protect Administrative Operations

Administrative functionality should use authenticated roles and strict Row Level Security policies.

### 7. Add Rate Limiting

Public review creation and other public endpoints should be protected against abuse.

### 8. Validate User Input

All user-generated content should be validated and sanitized before persistence.

---

# 🧩 Architectural Extension

The current architecture can evolve from:

```text
Next.js
   │
   └── Supabase
```

into:

```text
                    ┌───────────────┐
                    │    Next.js    │
                    │   Frontend    │
                    └───────┬───────┘
                            │
                 ┌──────────┴──────────┐
                 │                     │
                 ▼                     ▼
          Supabase Auth          Application API
                 │                     │
                 │              ┌──────┴──────┐
                 │              │             │
                 ▼              ▼             ▼
              Users          Orders       Payments
                                │
                                ▼
                           PostgreSQL
```

This provides a natural path toward a full production commerce platform.

---

# 📌 Important Development Notes

## Next.js App Router

The application uses the App Router:

```text
app/
```

rather than the legacy:

```text
pages/
```

---

## Dynamic Routes

Dynamic product routes use:

```text
/products/[slug]
```

Dynamic category routes use:

```text
/categories/[slug]
```

This provides clean SEO-friendly URLs.

---

## Not Found Handling

Invalid product and category routes use Next.js:

```typescript
notFound()
```

which generates the appropriate 404 behavior.

---

# 📈 Scalability Considerations

The current design provides a strong foundation for scaling the storefront.

Potential scaling areas include:

### Database

Supabase PostgreSQL can support larger product catalogs with appropriate indexing and query optimization.

### Frontend

Next.js server components reduce unnecessary client-side JavaScript for data-driven pages.

### Components

The modular component structure allows features to be developed independently.

### State

The cart state is isolated inside a dedicated context instead of being distributed across unrelated components.

---

# 📝 Development Checklist

```text
[✓] Next.js App Router
[✓] TypeScript
[✓] React
[✓] Tailwind CSS
[✓] Supabase integration
[✓] PostgreSQL schema
[✓] Product catalog
[✓] Category pages
[✓] Product detail pages
[✓] Product reviews
[✓] Ratings
[✓] Discount calculation
[✓] Stock display
[✓] Shopping cart
[✓] LocalStorage persistence
[✓] Responsive navigation
[✓] Mobile menu
[✓] Reusable UI components
[✓] Database indexes
[✓] Row Level Security
[✓] Netlify configuration
[✓] Production build configuration
```

---

# 🧰 Recommended Development Workflow

```bash
# Install dependencies
npm install

# Configure environment
# Create .env.local

# Run development server
npm run dev

# Type-check
npm run typecheck

# Lint
npm run lint

# Production build
npm run build

# Start production server
npm run start
```

---

# 📜 License

This project can be distributed and modified according to the license selected by the project owner.

If this repository is intended for public distribution, a dedicated license such as:

```text
MIT
```

can be added through a `LICENSE` file.

---

# 👨‍💻 Author

**Yassine Kaltoum**

Software & Network Engineering
Software Engineering — Master's Student

Areas of expertise:

* Software Engineering
* Web Development
* System Architecture
* Network Engineering
* Cybersecurity
* UI/UX Design
* Modern Web Technologies

---

# ⭐ Project Summary

Maison demonstrates how a modern e-commerce storefront can be engineered using the Next.js App Router together with React, TypeScript, Tailwind CSS and Supabase.

The project provides a complete product discovery experience with:

```text
Modern UI
     +
Responsive Design
     +
Product Catalog
     +
Categories
     +
Product Details
     +
Reviews
     +
Ratings
     +
Persistent Shopping Cart
     +
PostgreSQL
     +
Supabase
     +
Row Level Security
     +
Production Deployment
```

The architecture is intentionally modular and provides a solid foundation for extending the application into a complete commerce platform with authentication, payments, orders, inventory management, administration and analytics.

---

<p align="center">

**Maison — Modern Commerce, Thoughtfully Designed.**

</p>

<p align="center">
  Built with ❤️ using Next.js, React, TypeScript, Tailwind CSS and Supabase.
</p>
