# Linux Server Deployment Guide for VEXOIT Website

Complete guide for deploying the VEXOIT website on your own Linux server with Nginx or Apache.

---

## 📋 Prerequisites

- **Linux server** (Ubuntu 20.04+ / Debian 11+ / CentOS 8+ / RHEL 8+)
- **Root or sudo access**
- **Domain name** pointed to your server (optional but recommended)
- **Node.js 18+** for building the site

---

## 🚀 Quick Start

### Step 1: Build the Website

On your local machine or server:

```bash
# Navigate to project directory
cd it-vendor-website

# Install dependencies
npm install

# Build for production
npm run build

# Output will be in dist/ folder
```

The `dist/` folder contains your static website ready for deployment.

---

## 🔧 Option 1: Nginx Deployment (Recommended)

### Step 1: Install Nginx

```bash
# Ubuntu/Debian
sudo apt update
sudo apt install nginx -y

# CentOS/RHEL
sudo yum install nginx -y
# Or for newer versions:
sudo dnf install nginx -y

# Start and enable Nginx
sudo systemctl start nginx
sudo systemctl enable nginx
```

### Step 2: Upload Website Files

```bash
# Create website directory
sudo mkdir -p /var/www/vexoit

# Upload your dist/ folder contents
# Option A: Using SCP from local machine
scp -r dist/* user@your-server-ip:/tmp/vexoit/

# Then on server, move files:
sudo mv /tmp/vexoit/* /var/www/vexoit/

# Option B: Using rsync (recommended)
rsync -avz --delete dist/ user@your-server-ip:/tmp/vexoit/
# Then on server:
sudo mv /tmp/vexoit/* /var/www/vexoit/

# Set proper permissions
sudo chown -R www-data:www-data /var/www/vexoit
sudo chmod -R 755 /var/www/vexoit
```

### Step 3: Configure Nginx

Create Nginx configuration file:

```bash
sudo nano /etc/nginx/sites-available/vexoit
```

**Basic configuration (HTTP only):**

```nginx
server {
    listen 80;
    listen [::]:80;

    server_name your-domain.com www.your-domain.com;
    root /var/www/vexoit;
    index index.html;

    # Enable gzip compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css text/xml text/javascript
               application/x-javascript application/xml+rss
               application/javascript application/json
               image/svg+xml;

    # Security headers
    add_header X-Frame-Options "DENY" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;
    add_header Permissions-Policy "camera=(), microphone=(), geolocation=()" always;

    # Main location
    location / {
        try_files $uri $uri/ $uri.html =404;
    }

    # Cache static assets
    location ~* \.(jpg|jpeg|png|gif|ico|css|js|svg|webp|avif|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
        access_log off;
    }

    # Don't cache HTML
    location ~* \.html$ {
        expires -1;
        add_header Cache-Control "no-cache, no-store, must-revalidate";
    }

    # Deny access to hidden files
    location ~ /\. {
        deny all;
        access_log off;
        log_not_found off;
    }

    # Custom 404 page (optional)
    error_page 404 /404.html;
}
```

**Enable the site:**

```bash
# Create symbolic link
sudo ln -s /etc/nginx/sites-available/vexoit /etc/nginx/sites-enabled/

# Remove default site (optional)
sudo rm /etc/nginx/sites-enabled/default

# Test configuration
sudo nginx -t

# Reload Nginx
sudo systemctl reload nginx
```

### Step 4: Setup SSL/HTTPS with Let's Encrypt (Recommended)

```bash
# Install Certbot
# Ubuntu/Debian
sudo apt install certbot python3-certbot-nginx -y

# CentOS/RHEL
sudo dnf install certbot python3-certbot-nginx -y

# Obtain and install SSL certificate
sudo certbot --nginx -d your-domain.com -d www.your-domain.com

# Follow the prompts:
# - Enter your email
# - Agree to Terms of Service
# - Choose whether to redirect HTTP to HTTPS (recommended: yes)

# Test automatic renewal
sudo certbot renew --dry-run
```

**SSL configuration will be automatically added by Certbot. Final config will look like:**

```nginx
server {
    listen 80;
    listen [::]:80;
    server_name your-domain.com www.your-domain.com;

    # Redirect HTTP to HTTPS
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;

    server_name your-domain.com www.your-domain.com;
    root /var/www/vexoit;
    index index.html;

    # SSL certificates (managed by Certbot)
    ssl_certificate /etc/letsencrypt/live/your-domain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/your-domain.com/privkey.pem;
    include /etc/letsencrypt/options-ssl-nginx.conf;
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem;

    # Enable HSTS (optional but recommended)
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;

    # ... rest of your configuration (same as HTTP version above)
    # gzip, security headers, locations, etc.
}
```

---

## 🔧 Option 2: Apache Deployment (Alternative)

### Step 1: Install Apache

```bash
# Ubuntu/Debian
sudo apt update
sudo apt install apache2 -y

# CentOS/RHEL
sudo yum install httpd -y
# Or:
sudo dnf install httpd -y

# Start and enable Apache
sudo systemctl start apache2   # Ubuntu/Debian
sudo systemctl start httpd     # CentOS/RHEL
sudo systemctl enable apache2  # Ubuntu/Debian
sudo systemctl enable httpd    # CentOS/RHEL
```

### Step 2: Upload Website Files

```bash
# Create website directory
sudo mkdir -p /var/www/vexoit

# Upload files (same as Nginx - see above)
# Set permissions
sudo chown -R www-data:www-data /var/www/vexoit  # Ubuntu/Debian
sudo chown -R apache:apache /var/www/vexoit      # CentOS/RHEL
sudo chmod -R 755 /var/www/vexoit
```

### Step 3: Configure Apache

Create Apache virtual host:

```bash
# Ubuntu/Debian
sudo nano /etc/apache2/sites-available/vexoit.conf

# CentOS/RHEL
sudo nano /etc/httpd/conf.d/vexoit.conf
```

**Configuration:**

```apache
<VirtualHost *:80>
    ServerName your-domain.com
    ServerAlias www.your-domain.com
    DocumentRoot /var/www/vexoit

    <Directory /var/www/vexoit>
        Options -Indexes +FollowSymLinks
        AllowOverride All
        Require all granted
    </Directory>

    # Enable compression
    <IfModule mod_deflate.c>
        AddOutputFilterByType DEFLATE text/html text/plain text/xml text/css
        AddOutputFilterByType DEFLATE application/javascript application/json
        AddOutputFilterByType DEFLATE image/svg+xml
    </IfModule>

    # Security headers
    <IfModule mod_headers.c>
        Header always set X-Frame-Options "DENY"
        Header always set X-Content-Type-Options "nosniff"
        Header always set X-XSS-Protection "1; mode=block"
        Header always set Referrer-Policy "strict-origin-when-cross-origin"
        Header always set Permissions-Policy "camera=(), microphone=(), geolocation=()"
    </IfModule>

    ErrorLog ${APACHE_LOG_DIR}/vexoit-error.log
    CustomLog ${APACHE_LOG_DIR}/vexoit-access.log combined
</VirtualHost>
```

**Create .htaccess for caching:**

```bash
sudo nano /var/www/vexoit/.htaccess
```

```apache
# Enable rewrite engine
<IfModule mod_rewrite.c>
    RewriteEngine On
    RewriteBase /

    # Remove .html extension
    RewriteCond %{REQUEST_FILENAME} !-f
    RewriteCond %{REQUEST_FILENAME} !-d
    RewriteCond %{REQUEST_FILENAME}.html -f
    RewriteRule ^(.+)$ $1.html [L]
</IfModule>

# Cache static assets for 1 year
<IfModule mod_expires.c>
    ExpiresActive On

    # Images
    ExpiresByType image/jpg "access plus 1 year"
    ExpiresByType image/jpeg "access plus 1 year"
    ExpiresByType image/png "access plus 1 year"
    ExpiresByType image/gif "access plus 1 year"
    ExpiresByType image/svg+xml "access plus 1 year"
    ExpiresByType image/webp "access plus 1 year"
    ExpiresByType image/avif "access plus 1 year"

    # CSS and JavaScript
    ExpiresByType text/css "access plus 1 year"
    ExpiresByType application/javascript "access plus 1 year"

    # Fonts
    ExpiresByType font/woff "access plus 1 year"
    ExpiresByType font/woff2 "access plus 1 year"

    # HTML - no cache
    ExpiresByType text/html "access plus 0 seconds"
</IfModule>

# Add immutable header for cached assets
<IfModule mod_headers.c>
    <FilesMatch "\.(jpg|jpeg|png|gif|svg|webp|avif|css|js|woff|woff2)$">
        Header set Cache-Control "max-age=31536000, public, immutable"
    </FilesMatch>

    <FilesMatch "\.(html)$">
        Header set Cache-Control "no-cache, no-store, must-revalidate"
    </FilesMatch>
</IfModule>
```

**Enable required modules and site:**

```bash
# Ubuntu/Debian
sudo a2enmod rewrite headers expires deflate
sudo a2ensite vexoit.conf
sudo systemctl reload apache2

# CentOS/RHEL
# Modules are usually enabled by default
sudo systemctl reload httpd
```

### Step 4: Setup SSL/HTTPS with Let's Encrypt

```bash
# Install Certbot
# Ubuntu/Debian
sudo apt install certbot python3-certbot-apache -y

# CentOS/RHEL
sudo dnf install certbot python3-certbot-apache -y

# Obtain and install SSL certificate
sudo certbot --apache -d your-domain.com -d www.your-domain.com

# Test automatic renewal
sudo certbot renew --dry-run
```

---

## 🔥 Firewall Configuration

### UFW (Ubuntu/Debian)

```bash
# Allow SSH (important!)
sudo ufw allow OpenSSH

# Allow HTTP and HTTPS
sudo ufw allow 'Nginx Full'  # For Nginx
# Or
sudo ufw allow 'Apache Full' # For Apache

# Enable firewall
sudo ufw enable

# Check status
sudo ufw status
```

### FirewallD (CentOS/RHEL)

```bash
# Allow HTTP and HTTPS
sudo firewall-cmd --permanent --add-service=http
sudo firewall-cmd --permanent --add-service=https

# Reload firewall
sudo firewall-cmd --reload

# Check status
sudo firewall-cmd --list-all
```

---

## 📊 Monitoring & Logs

### Nginx Logs

```bash
# Access log
sudo tail -f /var/log/nginx/access.log

# Error log
sudo tail -f /var/log/nginx/error.log

# Check for errors
sudo grep -i error /var/log/nginx/error.log
```

### Apache Logs

```bash
# Ubuntu/Debian
sudo tail -f /var/log/apache2/vexoit-access.log
sudo tail -f /var/log/apache2/vexoit-error.log

# CentOS/RHEL
sudo tail -f /var/log/httpd/vexoit-access.log
sudo tail -f /var/log/httpd/vexoit-error.log
```

### System Resource Monitoring

```bash
# Install htop
sudo apt install htop   # Ubuntu/Debian
sudo yum install htop   # CentOS/RHEL

# Monitor resources
htop

# Check disk space
df -h

# Check memory
free -h
```

---

## 🔄 Updating Your Website

### Manual Update Process

```bash
# 1. On local machine: Build new version
cd it-vendor-website
npm run build

# 2. Upload to server
rsync -avz --delete dist/ user@your-server-ip:/tmp/vexoit/

# 3. On server: Backup current version (optional)
sudo cp -r /var/www/vexoit /var/www/vexoit-backup-$(date +%Y%m%d)

# 4. Replace files
sudo rm -rf /var/www/vexoit/*
sudo mv /tmp/vexoit/* /var/www/vexoit/

# 5. Set permissions
sudo chown -R www-data:www-data /var/www/vexoit  # Ubuntu/Debian
sudo chown -R apache:apache /var/www/vexoit      # CentOS/RHEL
sudo chmod -R 755 /var/www/vexoit

# 6. Clear cache (if needed)
# Nginx
sudo nginx -s reload

# Apache
sudo systemctl reload apache2  # Ubuntu/Debian
sudo systemctl reload httpd    # CentOS/RHEL
```

### Automated Deployment Script

Create `/usr/local/bin/update-vexoit.sh`:

```bash
#!/bin/bash

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${GREEN}Starting VEXOIT website update...${NC}"

# Variables
WEBSITE_DIR="/var/www/vexoit"
TEMP_DIR="/tmp/vexoit-new"
BACKUP_DIR="/var/www/vexoit-backups"
WEB_USER="www-data"  # Change to 'apache' for CentOS/RHEL

# Create backup directory if it doesn't exist
sudo mkdir -p $BACKUP_DIR

# Backup current version
echo -e "${GREEN}Creating backup...${NC}"
BACKUP_NAME="vexoit-$(date +%Y%m%d-%H%M%S)"
sudo cp -r $WEBSITE_DIR "$BACKUP_DIR/$BACKUP_NAME"

# Remove old files
echo -e "${GREEN}Removing old files...${NC}"
sudo rm -rf $WEBSITE_DIR/*

# Move new files
echo -e "${GREEN}Deploying new files...${NC}"
sudo mv $TEMP_DIR/* $WEBSITE_DIR/

# Set permissions
echo -e "${GREEN}Setting permissions...${NC}"
sudo chown -R $WEB_USER:$WEB_USER $WEBSITE_DIR
sudo chmod -R 755 $WEBSITE_DIR

# Reload web server
echo -e "${GREEN}Reloading web server...${NC}"
if command -v nginx &> /dev/null; then
    sudo nginx -s reload
elif command -v apache2 &> /dev/null; then
    sudo systemctl reload apache2
elif command -v httpd &> /dev/null; then
    sudo systemctl reload httpd
fi

# Clean up old backups (keep last 5)
echo -e "${GREEN}Cleaning up old backups...${NC}"
cd $BACKUP_DIR
ls -t | tail -n +6 | xargs -r sudo rm -rf

echo -e "${GREEN}Update complete!${NC}"
```

Make it executable:

```bash
sudo chmod +x /usr/local/bin/update-vexoit.sh
```

Usage:

```bash
# After uploading files to /tmp/vexoit-new
sudo /usr/local/bin/update-vexoit.sh
```

---

## 🛡️ Security Best Practices

### 1. Keep System Updated

```bash
# Ubuntu/Debian
sudo apt update && sudo apt upgrade -y

# CentOS/RHEL
sudo yum update -y
# Or:
sudo dnf update -y
```

### 2. Install Fail2Ban (Protect against brute force)

```bash
# Install
sudo apt install fail2ban -y   # Ubuntu/Debian
sudo yum install fail2ban -y   # CentOS/RHEL

# Start and enable
sudo systemctl start fail2ban
sudo systemctl enable fail2ban

# Check status
sudo fail2ban-client status
```

### 3. Disable Directory Listing

**Nginx:** Already disabled by default

**Apache:** Add to virtual host or .htaccess:
```apache
Options -Indexes
```

### 4. Hide Server Version

**Nginx:** Edit `/etc/nginx/nginx.conf`:
```nginx
http {
    server_tokens off;
}
```

**Apache:** Edit `/etc/apache2/conf-enabled/security.conf` (Ubuntu) or `/etc/httpd/conf/httpd.conf` (CentOS):
```apache
ServerTokens Prod
ServerSignature Off
```

### 5. Rate Limiting (Nginx)

Add to server block:
```nginx
# Limit requests
limit_req_zone $binary_remote_addr zone=general:10m rate=10r/s;
limit_req zone=general burst=20 nodelay;
```

---

## 🚀 Performance Optimization

### 1. Enable HTTP/2

**Nginx:** Already enabled if using `listen 443 ssl http2;`

**Apache:**
```bash
# Ubuntu/Debian
sudo a2enmod http2

# Add to virtual host
Protocols h2 http/1.1
```

### 2. Optimize Nginx Worker Processes

Edit `/etc/nginx/nginx.conf`:
```nginx
# Set to number of CPU cores
worker_processes auto;

# Increase worker connections
events {
    worker_connections 2048;
}
```

### 3. Enable FastCGI Cache (if using dynamic content in future)

For now, static files don't need this, but useful for future reference.

### 4. Monitor Performance

```bash
# Install and use
sudo apt install apache2-utils -y

# Benchmark your site
ab -n 1000 -c 10 https://your-domain.com/

# Expected results for static site:
# - Requests per second: 500-2000+
# - Time per request: 1-10ms
```

---

## 📋 Troubleshooting

### Website Not Loading

```bash
# Check if web server is running
sudo systemctl status nginx
# Or
sudo systemctl status apache2

# Check if port 80/443 is open
sudo netstat -tulpn | grep :80
sudo netstat -tulpn | grep :443

# Check firewall
sudo ufw status
# Or
sudo firewall-cmd --list-all

# Check DNS
nslookup your-domain.com

# Test configuration
sudo nginx -t
# Or
sudo apachectl configtest
```

### SSL Certificate Issues

```bash
# Check certificate status
sudo certbot certificates

# Renew manually
sudo certbot renew

# Check certificate expiry
echo | openssl s_client -servername your-domain.com -connect your-domain.com:443 2>/dev/null | openssl x509 -noout -dates
```

### Permission Issues

```bash
# Fix permissions
sudo chown -R www-data:www-data /var/www/vexoit  # Nginx/Ubuntu
sudo chown -R apache:apache /var/www/vexoit      # Apache/CentOS
sudo chmod -R 755 /var/www/vexoit

# Check SELinux (CentOS/RHEL only)
sudo setenforce 0  # Temporarily disable for testing
# If this fixes it, run:
sudo setsebool -P httpd_read_user_content 1
```

### High Memory Usage

```bash
# Check memory
free -h

# Reduce Nginx workers if needed
# Edit /etc/nginx/nginx.conf
worker_processes 2;  # Reduce if necessary
```

---

## 🎯 Post-Deployment Checklist

- [ ] Website loads at your domain
- [ ] HTTPS working (green lock icon)
- [ ] All pages accessible (Home, Services, About, Contact)
- [ ] Images loading correctly
- [ ] Mobile responsive (test on phone)
- [ ] No 404 errors
- [ ] SSL certificate auto-renewal configured
- [ ] Firewall configured
- [ ] Backups configured
- [ ] Monitoring set up
- [ ] Performance tested (PageSpeed Insights)
- [ ] Security headers verified

---

## 🔗 Testing Your Deployment

### Online Tools

1. **SSL Test:** https://www.ssllabs.com/ssltest/
2. **Security Headers:** https://securityheaders.com
3. **PageSpeed:** https://pagespeed.web.dev/
4. **GTmetrix:** https://gtmetrix.com/

### Command Line Tests

```bash
# Test HTTPS
curl -I https://your-domain.com

# Check security headers
curl -I https://your-domain.com | grep -E "X-Frame-Options|X-Content-Type-Options"

# Test gzip compression
curl -H "Accept-Encoding: gzip" -I https://your-domain.com

# Check page load time
time curl -s -o /dev/null https://your-domain.com
```

---

## 📚 Additional Resources

- **Nginx Docs:** https://nginx.org/en/docs/
- **Apache Docs:** https://httpd.apache.org/docs/
- **Let's Encrypt:** https://letsencrypt.org/docs/
- **Certbot:** https://certbot.eff.org/

---

## 🆘 Need Help?

If you encounter issues:

1. Check logs (see Monitoring & Logs section)
2. Verify configuration syntax
3. Check firewall settings
4. Ensure DNS is correctly configured
5. Test with `curl` commands
6. Check server resources (CPU, memory, disk)

---

**Your VEXOIT website is now deployed on your Linux server! 🎉**

Expected performance:
- ✅ Load time: <500ms (local network) or 1-3s (internet)
- ✅ HTTPS enabled with A+ SSL rating
- ✅ Optimal caching configured
- ✅ Security headers in place
- ✅ Ready for production traffic
