#!/bin/bash

set -e

ROOT_DIR=$(dirname "$0")

GREEN='\033[0;32m'
NC='\033[0m'
printf "${GREEN}Installing backend and frontend dependencies${NC}\n\n"

find backend frontend -maxdepth 1 -name package.json -execdir npm install \;
