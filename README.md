# DevBlog - Fullstack Learning Project

A minimalist blog application built with Next.js and FastAPI for learning fullstack development. This project focuses on providing a practical foundation for understanding the interaction between frontend and backend components.

## Tech Stack

- **Frontend**: Next.js with TypeScript and Tailwind CSS
- **Backend**: FastAPI with SQLAlchemy
- **Database**: PostgreSQL (Docker containerized)

## Getting Started

### Prerequisites

- Node.js (v18+)
- Python (v3.9+)
- Podman or Docker with Compose

### Running the Application

#### 1. Set up the environment

First, create and activate the Python virtual environment:

```bash
# Run this from the project root
source venv.sh
```

This script will create a virtual environment in `backend/venv` if it doesn't exist and activate it.

> **Note for Windows users:** This project is optimized for Linux environments. If you're on Windows, consider running a Linux VM with VirtualBox. Not only will it save you configuration headaches, but the brief exposure to Linux is good for your soul. Trust me on this one.

#### 2. Start the database

```bash
# Start PostgreSQL container
make db_up
```

#### 3. Install backend dependencies

```bash
# Install backend requirements
make install_backend
```

#### 4. Start the backend server

```bash
# Start the FastAPI development server
make dev_backend
```

The backend will be available at http://localhost:8000 with API documentation at http://localhost:8000/docs

#### 5. Start the frontend

In a new terminal:

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies if not already done
npm install

# Start Next.js development server
make dev_frontend
```

Alternatively, you can run:
```bash
cd frontend && npm run dev
```

The frontend will be available at http://localhost:3000

### Additional Commands

```bash
# Connect to PostgreSQL database
make psql

# Stop the database container
make db_down
```

## Project Structure

```
fullstack/
├── backend/           # FastAPI application
│   ├── db/            # Database models and utilities
│   ├── routers/       # API route definitions
│   └── main.py        # Application entry point
├── frontend/          # Next.js application
│   ├── app/           # Next.js app directory
│   │   ├── posts/     # Blog post pages
│   │   └── page.tsx   # Homepage
│   └── package.json   # Frontend dependencies
├── Makefile           # Development commands
├── venv.sh            # Virtual environment setup script
└── docker-compose.yml # Database configuration
```

## Features

- Create, read, update, and delete blog posts
- Responsive design with dark mode support
- API endpoints with proper validation and error handling
- Database persistence with PostgreSQL

## Learning Focus

This project is designed for learning the fundamentals of:

- Building APIs with FastAPI
- Database modeling with SQLAlchemy
- Backend-frontend integration
- State management in React/Next.js
- API consumption from a frontend application