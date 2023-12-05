@echo off
echo Starting Server...
cd Server
start cmd /k "npm run start"
cd ..

echo Starting Client...
cd Client
start cmd /k "npm run start"
cd ..

echo Starting WebSocket...
cd WebSocket
start cmd /k "npm run start"
cd ..

echo All services are starting...