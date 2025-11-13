# Server Configuration Files

This directory contains ready-to-use configuration files for deploying VEXOIT website on your Linux server.

---

## 📁 Files Included

| File | Description | Usage |
|------|-------------|-------|
| `nginx.conf` | Nginx web server configuration | Copy to `/etc/nginx/sites-available/vexoit` |
| `apache.conf` | Apache web server configuration | Copy to `/etc/apache2/sites-available/vexoit.conf` |
| `.htaccess` | Apache directory configuration | Copy to `/var/www/vexoit/.htaccess` |
| `deploy.sh` | Automated deployment script | Run locally to deploy to server |

---

## 🚀 Quick Setup Guide

### For Nginx

1. **Copy configuration file to server:**
   ```bash
   scp nginx.conf user@your-server:/tmp/
   ```

2. **On server, move to Nginx directory:**
   ```bash
   sudo mv /tmp/nginx.conf /etc/nginx/sites-available/vexoit
   ```

3. **Update the configuration:**
   ```bash
   sudo nano /etc/nginx/sites-available/vexoit
   # Replace 'your-domain.com' with your actual domain
   # Replace '/var/www/vexoit' with your desired path (if different)
   ```

4. **Enable the site:**
   ```bash
   sudo ln -s /etc/nginx/sites-available/vexoit /etc/nginx/sites-enabled/
   sudo nginx -t
   sudo systemctl reload nginx
   ```

5. **Setup SSL with Let's Encrypt:**
   ```bash
   sudo certbot --nginx -d your-domain.com -d www.your-domain.com
   ```

### For Apache

1. **Copy configuration file to server:**
   ```bash
   scp apache.conf user@your-server:/tmp/
   ```

2. **On server, move to Apache directory:**
   ```bash
   # Ubuntu/Debian
   sudo mv /tmp/apache.conf /etc/apache2/sites-available/vexoit.conf

   # CentOS/RHEL
   sudo mv /tmp/apache.conf /etc/httpd/conf.d/vexoit.conf
   ```

3. **Update the configuration:**
   ```bash
   # Ubuntu/Debian
   sudo nano /etc/apache2/sites-available/vexoit.conf

   # CentOS/RHEL
   sudo nano /etc/httpd/conf.d/vexoit.conf

   # Replace 'your-domain.com' with your actual domain
   # Replace '/var/www/vexoit' with your desired path (if different)
   ```

4. **Enable required modules and site:**
   ```bash
   # Ubuntu/Debian
   sudo a2enmod ssl rewrite headers expires deflate
   sudo a2ensite vexoit.conf
   sudo systemctl reload apache2

   # CentOS/RHEL
   sudo systemctl reload httpd
   ```

5. **Copy .htaccess file:**
   ```bash
   scp .htaccess user@your-server:/tmp/
   sudo mv /tmp/.htaccess /var/www/vexoit/.htaccess
   ```

6. **Setup SSL with Let's Encrypt:**
   ```bash
   sudo certbot --apache -d your-domain.com -d www.your-domain.com
   ```

---

## 🔄 Using the Deployment Script

The `deploy.sh` script automates the entire deployment process.

### Setup

1. **Make script executable:**
   ```bash
   chmod +x deploy.sh
   ```

2. **Edit configuration:**
   ```bash
   nano deploy.sh
   ```

   Update these variables:
   ```bash
   SERVER_USER="your-username"      # Your SSH username
   SERVER_HOST="your-server-ip"     # Your server IP or domain
   SERVER_PATH="/var/www/vexoit"    # Website path on server
   WEB_USER="www-data"              # www-data (Ubuntu) or apache (CentOS)
   ```

3. **Setup SSH key authentication (recommended):**
   ```bash
   # Generate SSH key (if you don't have one)
   ssh-keygen -t rsa -b 4096

   # Copy to server
   ssh-copy-id user@your-server-ip
   ```

### Running the Script

```bash
# From project root directory
./server-configs/deploy.sh
```

The script will:
1. ✅ Install dependencies
2. ✅ Build the website
3. ✅ Upload files to server
4. ✅ Create backup of current version
5. ✅ Deploy new version
6. ✅ Set proper permissions
7. ✅ Reload web server
8. ✅ Clean up old backups

### Manual Deployment (Alternative)

If you prefer manual deployment:

```bash
# 1. Build locally
npm install
npm run build

# 2. Upload to server
rsync -avz --delete dist/ user@server-ip:/tmp/vexoit/

# 3. On server, deploy
ssh user@server-ip
sudo rm -rf /var/www/vexoit/*
sudo mv /tmp/vexoit/* /var/www/vexoit/
sudo chown -R www-data:www-data /var/www/vexoit
sudo chmod -R 755 /var/www/vexoit
sudo systemctl reload nginx  # or apache2/httpd
```

---

## 🔧 Configuration Details

### What's Included in the Configs

Both Nginx and Apache configurations include:

**Performance:**
- ✅ Gzip compression
- ✅ Browser caching (1 year for static assets)
- ✅ HTTP/2 support
- ✅ No caching for HTML files

**Security:**
- ✅ Security headers (X-Frame-Options, CSP, etc.)
- ✅ HTTPS enforcement
- ✅ HSTS header
- ✅ Hidden file protection
- ✅ Directory listing disabled

**SEO:**
- ✅ Clean URLs (no .html extension)
- ✅ WWW to non-WWW redirect (optional)
- ✅ SSL/HTTPS enabled

### Customization

#### Change Cache Duration

**Nginx:** Edit these lines in `nginx.conf`:
```nginx
location ~* \.(jpg|jpeg|png|gif|ico|svg|webp|avif)$ {
    expires 1y;  # Change to 6M for 6 months, 30d for 30 days, etc.
}
```

**Apache:** Edit `.htaccess`:
```apache
ExpiresByType image/jpg "access plus 1 year"  # Change as needed
```

#### Enable WWW Redirect

**Nginx:** Uncomment the redirect block at the end of `nginx.conf`

**Apache:** Uncomment these lines in `.htaccess`:
```apache
RewriteCond %{HTTP_HOST} ^www\.(.*)$ [NC]
RewriteRule ^(.*)$ https://%1/$1 [R=301,L]
```

---

## 🛠️ Troubleshooting

### Configuration Test Failed

```bash
# Nginx
sudo nginx -t  # Shows syntax errors

# Apache
sudo apachectl configtest
```

### Permission Denied Errors

```bash
# Fix ownership
sudo chown -R www-data:www-data /var/www/vexoit  # Ubuntu/Debian
sudo chown -R apache:apache /var/www/vexoit      # CentOS/RHEL

# Fix permissions
sudo chmod -R 755 /var/www/vexoit
```

### SSL Certificate Issues

```bash
# Check certificate status
sudo certbot certificates

# Renew manually
sudo certbot renew

# Test renewal
sudo certbot renew --dry-run
```

### Deployment Script Fails

1. **SSH connection fails:**
   - Verify SSH key is copied: `ssh-copy-id user@server`
   - Test SSH: `ssh user@server`
   - Check firewall allows SSH (port 22)

2. **Permission errors:**
   - Set `USE_SUDO="yes"` in deploy.sh
   - Ensure your user has sudo rights

3. **Build fails:**
   - Run `npm install` manually
   - Check for Node.js version (requires 18+)

---

## 📋 Pre-Deployment Checklist

Before deploying to production:

- [ ] Update domain name in config files
- [ ] Update server paths if different from `/var/www/vexoit`
- [ ] Test configuration syntax
- [ ] Ensure firewall allows HTTP (80) and HTTPS (443)
- [ ] DNS points to your server
- [ ] SSH access configured
- [ ] Backups configured
- [ ] SSL certificate installed
- [ ] Test deployment script on staging first

---

## 🔐 Security Recommendations

1. **Use SSH keys** instead of passwords
2. **Configure firewall** (UFW or FirewallD)
3. **Install Fail2Ban** to prevent brute force attacks
4. **Keep system updated** (apt update && apt upgrade)
5. **Use strong passwords** for server access
6. **Regular backups** (automated via deploy.sh)
7. **Monitor logs** regularly
8. **Disable root SSH** login

---

## 📚 Additional Resources

- **Nginx Documentation:** https://nginx.org/en/docs/
- **Apache Documentation:** https://httpd.apache.org/docs/
- **Let's Encrypt:** https://letsencrypt.org/
- **Full Deployment Guide:** See `LINUX_SERVER_DEPLOYMENT.md`

---

## 🆘 Need Help?

If you encounter issues:

1. Check logs:
   - Nginx: `/var/log/nginx/vexoit-error.log`
   - Apache: `/var/log/apache2/vexoit-error.log` or `/var/log/httpd/vexoit-error.log`

2. Verify web server is running:
   ```bash
   sudo systemctl status nginx
   # or
   sudo systemctl status apache2
   ```

3. Test configuration:
   ```bash
   sudo nginx -t
   # or
   sudo apachectl configtest
   ```

4. Check complete deployment guide: `LINUX_SERVER_DEPLOYMENT.md`

---

**Your VEXOIT website is ready to deploy! 🚀**
