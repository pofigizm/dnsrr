#!/bin/bash

docker-compose -f docker-compose.prod.yml build
docker-compose -f docker-compose.prod.yml up -d

docker-compose -f docker-compose.prod.yml ps
docker-compose -f docker-compose.prod.yml logs -f
