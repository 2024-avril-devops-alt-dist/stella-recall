# Default environment variables
ENV_FILE_DEV = .env
ENV_FILE_PROD = .env.production
COMPOSE_FILE_DEV = docker-compose.dev.yaml
COMPOSE_FILE_PROD = docker-compose.prod.yaml

# Common docker command template
DOCKER_COMPOSE_DEV = docker compose -f $(COMPOSE_FILE_DEV) --env-file $(ENV_FILE_DEV)
DOCKER_COMPOSE_PROD = docker compose -f $(COMPOSE_FILE_PROD) --env-file $(ENV_FILE_PROD)

# Default target
.DEFAULT_GOAL := help

# Start the development environment
dev:
	$(DOCKER_COMPOSE_DEV) up --build --force-recreate -d

# Start the production environment
prod:
	$(DOCKER_COMPOSE_PROD) up --build --force-recreate -d

# Stop development services
down-dev:
	$(DOCKER_COMPOSE_DEV) down

# Stop production services
down-prod:
	$(DOCKER_COMPOSE_PROD) down

# Stop development services (stops the containers)
stop-dev:
	$(DOCKER_COMPOSE_DEV) stop

# Stop production services (stops the containers)
stop-prod:
	$(DOCKER_COMPOSE_PROD) stop

# Stop both development and production services (stops the containers)
stop:
	@echo "Stopping development and production services..."
	$(DOCKER_COMPOSE_DEV) stop
	$(DOCKER_COMPOSE_PROD) stop

# Tail logs for the development environment
logs-dev:
	$(DOCKER_COMPOSE_DEV) logs app -f

# Tail logs for the production environment
logs-prod:
	$(DOCKER_COMPOSE_PROD) logs app -f

# Restart development services
start-dev:
	$(DOCKER_COMPOSE_DEV) restart

# Restart production services
start-prod:
	$(DOCKER_COMPOSE_PROD) restart

# Clean up containers, networks, volumes for development environment
clean-dev:
	$(DOCKER_COMPOSE_DEV) down -v --rmi all --remove-orphans

# Clean up containers, networks, volumes for production environment
clean-prod:
	$(DOCKER_COMPOSE_PROD) down -v --rmi all --remove-orphans

# Run tests (assumes tests are set up in the container)
test:
	docker compose exec app npm test

# Open a shell in the app container
shell:
	docker compose exec app /bin/sh

# Help command
help:
	@echo "Makefile Commands:"
	@echo "  dev             Start development environment"
	@echo "  prod            Start production environment"
	@echo "  stop-dev        Stop development services (containers only)"
	@echo "  stop-prod       Stop production services (containers only)"
	@echo "  stop            Stop both development and production services (containers only)"
	@echo "  logs-dev        Tail development logs"
	@echo "  logs-prod       Tail production logs"
	@echo "  restart-dev     Restart development services"
	@echo "  restart-prod    Restart production services"
	@echo "  clean-dev       Clean up development environment"
	@echo "  clean-prod      Clean up production environment"
	@echo "  test            Run tests in the app container"
	@echo "  shell           Open a shell in the app container"

.PHONY: dev prod stop-dev stop-prod stop logs-dev logs-prod restart-dev restart-prod clean-dev clean-prod test shell help
