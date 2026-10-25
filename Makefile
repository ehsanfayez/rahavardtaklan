ENV_FILE ?= .env.prod

.PHONY: up down logs build local

up:
	@docker compose --env-file $(ENV_FILE) up -d --build

down:
	@docker compose --env-file $(ENV_FILE) down

logs:
	@docker compose --env-file $(ENV_FILE) logs -f site

build:
	@docker build -t rahavardtaklan_site .

# Run locally without Traefik or the external network: http://localhost:8687
local: build
	@docker run --rm -p 8687:80 rahavardtaklan_site
