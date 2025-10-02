#!/bin/bash

# Start Grafana + Loki logging stack
echo "Starting Grafana + Loki logging stack..."

# Create logs directory if it doesn't exist
mkdir -p logs/server logs/errors

# Start the services
docker-compose up -d

# Wait for services to be ready
echo "Waiting for services to start..."
sleep 10

# Check service status
echo "Checking service status..."
docker-compose ps

# Show access information
echo ""
echo "=========================================="
echo "Logging stack is ready!"
echo "=========================================="
echo "Grafana: http://localhost:3000"
echo "Username: admin"
echo "Password: admin123"
echo ""
echo "Loki API: http://localhost:3100"
echo ""
echo "To view logs:"
echo "  - Open Grafana and go to Explore"
echo "  - Select Loki data source"
echo "  - Try query: {job=\"admin-management\"}"
echo ""
echo "To stop services: docker-compose down"
echo "=========================================="
