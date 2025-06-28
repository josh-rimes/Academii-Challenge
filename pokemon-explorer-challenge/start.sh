#!/bin/bash

echo "Setting up Pokémon Explorer..."

# Backend
echo "Installing backend dependencies..."
cd backend
npm install

echo "Starting backend server on http://localhost:3001..."
npm start &  # Run in background
cd ..

# Frontend
echo "Installing frontend dependencies..."
cd frontend
npm install

echo "Starting frontend dev server on http://localhost:3000..."
npm run dev &  # Run in background
cd ..

echo "Pokémon Explorer is launching. Ctrl+C to stop."