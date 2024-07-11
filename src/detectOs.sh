#!/bin/bash

# Detect Linux distribution
if [ -f /etc/os-release ]; then
    # freedesktop.org and systemd
    . /etc/os-release
    DISTRO=$ID
elif [ -f /etc/lsb-release ]; then
    # For some older versions of Ubuntu/Debian
    . /etc/lsb-release
    DISTRO=$DISTRIB_ID
elif [ -f /etc/debian_version ]; then
    # Older Debian
    DISTRO=debian
elif [ -f /etc/redhat-release ]; then
    # Older Red Hat, CentOS, Fedora
    DISTRO=redhat
else
    DISTRO=$(uname -s)
fi

# Detect package manager based on distribution
case "$DISTRO" in
    ubuntu|debian)
        PKG_MANAGER="apt"
        ;;
    fedora|centos|rhel)
        PKG_MANAGER="dnf"
        ;;
    redhat)
        PKG_MANAGER="yum"
        ;;
    arch|manjaro)
        PKG_MANAGER="pacman"
        ;;
    opensuse|suse)
        PKG_MANAGER="zypper"
        ;;
    alpine)
        PKG_MANAGER="apk"
        ;;
    *)
        echo "Unknown Linux distribution: $DISTRO"
        exit 1
        ;;
esac

# Output the results
echo "Detected Linux distribution: $DISTRO"
echo "Detected package manager: $PKG_MANAGER"

export DISTRO
export PKG_MANAGER
