# Grafana + Loki Logging Setup

This setup provides centralized logging for the Admin Management application using Grafana and Loki.

## Architecture

- **Loki**: Log aggregation system that collects and stores logs
- **Promtail**: Log shipping agent that sends logs to Loki
- **Grafana**: Visualization and dashboard platform for log analysis

## Quick Start

### 1. Start the Logging Stack

```bash
# Start Grafana, Loki, and Promtail
docker-compose up -d

# Check if all services are running
docker-compose ps
```

### 2. Access Grafana

- URL: http://localhost:3000
- Username: `admin`
- Password: `admin123`

### 3. View Logs

The Loki data source is automatically configured. You can:

1. Go to **Explore** in Grafana
2. Select **Loki** as the data source
3. Use these sample queries:

```logql
# All logs
{job="admin-management"}

# Error logs only
{job="admin-management", level="error"}

# HTTP requests
{job="admin-management"} |= "HTTP Request"

# Logs from specific service
{job="admin-management", service="admin-management-server"}

# Logs with specific text
{job="admin-management"} |= "error"
```

### 4. View Dashboard

Navigate to **Dashboards** and open "Admin Management - Logging Dashboard" to see:

- Log rate by level
- HTTP request rate by status code
- Recent logs
- Error/warning/request counts

## Log Structure

### Server Logs

- Location: `logs/server/server-YYYY-MM-DD.log`
- Format: JSON with structured fields
- Includes: HTTP requests, errors, application events

### Error Logs

- Location: `logs/errors/error-YYYY-MM-DD.log`
- Format: JSON with error details
- Includes: Stack traces, error context

### Client Logs

- Sent to server endpoint: `/api/logs`
- Forwarded to Loki via server logging
- Includes: User actions, client errors, API calls

## Configuration Files

- `docker-compose.yml`: Main orchestration file
- `logging/loki-config.yml`: Loki configuration
- `logging/promtail-config.yml`: Log collection configuration
- `logging/grafana/`: Grafana provisioning and dashboards

## Log Levels

The application uses these log levels:

- `error`: Error conditions
- `warn`: Warning conditions
- `info`: Informational messages (default)
- `debug`: Debug-level messages

## Environment Variables

Set these environment variables to control logging:

```bash
# Log level (error, warn, info, debug)
LOG_LEVEL=info

# Node environment
NODE_ENV=development
```

## Useful LogQL Queries

### Performance Monitoring

```logql
# Average response time
{job="admin-management"} |= "HTTP Request" | json | unwrap duration | avg_over_time(1m)
```

### Error Analysis

```logql
# Top error messages
{job="admin-management", level="error"} | json | line_format "{{.message}}" | count by (message)
```

### User Activity

```logql
# Most accessed endpoints
{job="admin-management"} |= "HTTP Request" | json | unwrap url | count by (url)
```

### Real-time Monitoring

```logql
# Live error stream
{job="admin-management", level="error"} | json | line_format "{{.timestamp}} {{.level}} {{.message}}"
```

## Troubleshooting

### Check Service Status

```bash
# View logs
docker-compose logs loki
docker-compose logs promtail
docker-compose logs grafana

# Restart services
docker-compose restart loki promtail grafana
```

### Verify Log Collection

```bash
# Check if log files are being created
ls -la logs/

# Check Promtail configuration
docker-compose exec promtail cat /etc/promtail/config.yml
```

### Common Issues

1. **No logs appearing in Grafana**

   - Check if log files exist in `logs/` directory
   - Verify Promtail is running and can access log files
   - Check Loki is receiving logs from Promtail

2. **Permission errors**

   - Ensure Docker has access to the `logs/` directory
   - Check file permissions: `chmod -R 755 logs/`

3. **Grafana not loading dashboard**
   - Verify Loki data source is configured correctly
   - Check dashboard JSON syntax
   - Restart Grafana container

## Stopping the Services

```bash
# Stop all services
docker-compose down

# Stop and remove volumes (WARNING: This will delete all data)
docker-compose down -v
```

## Production Considerations

For production deployment:

1. **Security**: Change default passwords and enable authentication
2. **Persistence**: Use external volumes for data persistence
3. **Resource Limits**: Set appropriate CPU/memory limits
4. **Log Retention**: Configure log retention policies
5. **Monitoring**: Set up alerts for critical errors
6. **Backup**: Regular backup of Grafana dashboards and Loki data
