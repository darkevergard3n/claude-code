#!/bin/bash

# VEXOIT Website Deployment Script
# This script builds and deploys the website to your Linux server

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Configuration - UPDATE THESE VALUES
SERVER_USER="your-username"          # Your SSH username
SERVER_HOST="your-server-ip"         # Your server IP or domain
SERVER_PATH="/var/www/vexoit"        # Website path on server
WEB_USER="www-data"                  # Web server user (www-data for Ubuntu/Debian, apache for CentOS/RHEL)
USE_SUDO="yes"                       # Set to "yes" if you need sudo for file operations

# Advanced configuration
LOCAL_BUILD_DIR="dist"
REMOTE_TEMP_DIR="/tmp/vexoit-deploy"
BACKUP_DIR="/var/www/vexoit-backups"
SSH_PORT="22"

# Function to print colored messages
print_success() {
    echo -e "${GREEN}✓ $1${NC}"
}

print_error() {
    echo -e "${RED}✗ $1${NC}"
}

print_info() {
    echo -e "${YELLOW}ℹ $1${NC}"
}

# Function to check if command succeeded
check_status() {
    if [ $? -eq 0 ]; then
        print_success "$1"
    else
        print_error "$2"
        exit 1
    fi
}

# Header
echo ""
echo "╔════════════════════════════════════════╗"
echo "║   VEXOIT Website Deployment Script    ║"
echo "╚════════════════════════════════════════╝"
echo ""

# Step 1: Check if we're in the right directory
print_info "Checking directory..."
if [ ! -f "package.json" ]; then
    print_error "package.json not found. Please run this script from the project root."
    exit 1
fi
if [ ! -f "astro.config.mjs" ]; then
    print_error "astro.config.mjs not found. This doesn't appear to be an Astro project."
    exit 1
fi
print_success "Project directory verified"

# Step 2: Install dependencies
print_info "Installing dependencies..."
npm install
check_status "Dependencies installed" "Failed to install dependencies"

# Step 3: Build the website
print_info "Building website for production..."
npm run build
check_status "Build completed successfully" "Build failed"

# Verify dist folder exists
if [ ! -d "$LOCAL_BUILD_DIR" ]; then
    print_error "Build directory '$LOCAL_BUILD_DIR' not found. Build may have failed."
    exit 1
fi

# Step 4: Test SSH connection
print_info "Testing SSH connection to $SERVER_HOST..."
ssh -p $SSH_PORT -o BatchMode=yes -o ConnectTimeout=5 $SERVER_USER@$SERVER_HOST "echo 'SSH connection successful'" 2>/dev/null
check_status "SSH connection successful" "SSH connection failed. Please check your credentials."

# Step 5: Create remote directories
print_info "Creating remote directories..."
if [ "$USE_SUDO" = "yes" ]; then
    ssh -p $SSH_PORT $SERVER_USER@$SERVER_HOST "sudo mkdir -p $REMOTE_TEMP_DIR $BACKUP_DIR"
else
    ssh -p $SSH_PORT $SERVER_USER@$SERVER_HOST "mkdir -p $REMOTE_TEMP_DIR $BACKUP_DIR"
fi
check_status "Remote directories created" "Failed to create remote directories"

# Step 6: Upload files
print_info "Uploading files to server..."
rsync -avz --progress -e "ssh -p $SSH_PORT" --delete $LOCAL_BUILD_DIR/ $SERVER_USER@$SERVER_HOST:$REMOTE_TEMP_DIR/
check_status "Files uploaded successfully" "File upload failed"

# Step 7: Backup current version
print_info "Creating backup of current website..."
BACKUP_NAME="vexoit-$(date +%Y%m%d-%H%M%S)"
if [ "$USE_SUDO" = "yes" ]; then
    ssh -p $SSH_PORT $SERVER_USER@$SERVER_HOST "sudo cp -r $SERVER_PATH $BACKUP_DIR/$BACKUP_NAME"
else
    ssh -p $SSH_PORT $SERVER_USER@$SERVER_HOST "cp -r $SERVER_PATH $BACKUP_DIR/$BACKUP_NAME"
fi
check_status "Backup created: $BACKUP_NAME" "Backup creation failed (website may not exist yet - this is OK for first deployment)"

# Step 8: Deploy new version
print_info "Deploying new version..."
if [ "$USE_SUDO" = "yes" ]; then
    ssh -p $SSH_PORT $SERVER_USER@$SERVER_HOST << EOF
        sudo rm -rf $SERVER_PATH/*
        sudo cp -r $REMOTE_TEMP_DIR/* $SERVER_PATH/
        sudo chown -R $WEB_USER:$WEB_USER $SERVER_PATH
        sudo chmod -R 755 $SERVER_PATH
        sudo rm -rf $REMOTE_TEMP_DIR
EOF
else
    ssh -p $SSH_PORT $SERVER_USER@$SERVER_HOST << EOF
        rm -rf $SERVER_PATH/*
        cp -r $REMOTE_TEMP_DIR/* $SERVER_PATH/
        chmod -R 755 $SERVER_PATH
        rm -rf $REMOTE_TEMP_DIR
EOF
fi
check_status "New version deployed" "Deployment failed"

# Step 9: Reload web server
print_info "Reloading web server..."
if [ "$USE_SUDO" = "yes" ]; then
    ssh -p $SSH_PORT $SERVER_USER@$SERVER_HOST << 'EOF'
        if command -v nginx &> /dev/null; then
            sudo nginx -s reload
            echo "Nginx reloaded"
        elif command -v apache2 &> /dev/null; then
            sudo systemctl reload apache2
            echo "Apache2 reloaded"
        elif command -v httpd &> /dev/null; then
            sudo systemctl reload httpd
            echo "Httpd reloaded"
        else
            echo "Web server not found"
        fi
EOF
else
    ssh -p $SSH_PORT $SERVER_USER@$SERVER_HOST << 'EOF'
        if command -v nginx &> /dev/null; then
            nginx -s reload
            echo "Nginx reloaded"
        elif command -v apache2 &> /dev/null; then
            systemctl reload apache2
            echo "Apache2 reloaded"
        elif command -v httpd &> /dev/null; then
            systemctl reload httpd
            echo "Httpd reloaded"
        fi
EOF
fi
check_status "Web server reloaded" "Failed to reload web server (may need manual restart)"

# Step 10: Clean up old backups (keep last 5)
print_info "Cleaning up old backups..."
if [ "$USE_SUDO" = "yes" ]; then
    ssh -p $SSH_PORT $SERVER_USER@$SERVER_HOST "cd $BACKUP_DIR && sudo ls -t | tail -n +6 | xargs -r sudo rm -rf"
else
    ssh -p $SSH_PORT $SERVER_USER@$SERVER_HOST "cd $BACKUP_DIR && ls -t | tail -n +6 | xargs -r rm -rf"
fi
print_success "Old backups cleaned up (kept last 5)"

# Success message
echo ""
echo "╔════════════════════════════════════════╗"
echo "║     Deployment Completed Successfully!  ║"
echo "╚════════════════════════════════════════╝"
echo ""
print_success "Website deployed to: $SERVER_HOST"
print_success "Backup created: $BACKUP_NAME"
print_info "You can now visit your website at: https://your-domain.com"
echo ""

# Optional: Run a quick test
read -p "Would you like to test the deployment? (y/n) " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    print_info "Testing deployment..."

    # Test if server responds
    HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" http://$SERVER_HOST)

    if [ "$HTTP_CODE" = "200" ] || [ "$HTTP_CODE" = "301" ] || [ "$HTTP_CODE" = "302" ]; then
        print_success "Server is responding (HTTP $HTTP_CODE)"
    else
        print_error "Server returned HTTP $HTTP_CODE"
    fi
fi

echo ""
print_info "Deployment complete! 🎉"
