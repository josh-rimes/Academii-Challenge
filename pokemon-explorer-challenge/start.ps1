# start.ps1
Write-Output "Installing and starting Pokémon Explorer..."

# Backend
Write-Output "Setting up backend..."
cd backend
npm install
Start-Process powershell -ArgumentList "npm start" -WindowStyle Hidden
cd ..

# Frontend
Write-Output "Setting up frontend..."
cd frontend
npm install
Start-Process powershell -ArgumentList "npm run dev" -WindowStyle Hidden
cd ..

Write-Output "Completed: Backend is on http://localhost:3001, frontend is on http://localhost:3000"
