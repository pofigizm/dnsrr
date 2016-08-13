FROM nginx

RUN apt-get update && apt-get install -y --no-install-recommends \
    vim-nox \
    && rm -rf /var/lib/apt/lists/*

COPY nginx.conf /etc/nginx/nginx.conf
