#!/bin/bash

docker-compose -f docker-compose.prod.yml ps

docker-compose -f docker-compose.prod.yml stop
docker-compose -f docker-compose.prod.yml rm -f
