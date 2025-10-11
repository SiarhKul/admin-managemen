#!/bin/bash

echo "Testing logging setup..."

# Make some API calls to generate logs
echo "Making API calls to generate logs..."
curl -s http://localhost:3333/api/users > /dev/null
curl -s http://localhost:3333/api/roles > /dev/null
curl -s http://localhost:3333/api/nonexistent > /dev/null

# Wait for logs to be processed
echo "Waiting for logs to be processed..."
sleep 5

# Check if log files exist
echo "Checking log files..."
find logs/ -name "*.log" -type f -exec echo "Found: {}" \; -exec head -2 {} \;

# Check Loki for logs
echo "Checking Loki for logs..."
curl -s "http://localhost:3100/loki/api/v1/query?query={job=\"admin-management\"}&limit=5" | head -20

echo "Test completed!"

