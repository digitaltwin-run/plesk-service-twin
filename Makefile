# Plesk Digital Twin & Publication Makefile

.PHONY: help dev dev-stop build test preflight publish-dry-run publish-apply status health clean

.DEFAULT_GOAL := help

help:
	@echo "Plesk Digital Twin Commands:"
	@echo "  make dev                 Start Nginx, PHP-FPM and Plesk Admin Mock containers"
	@echo "  make dev-stop            Stop all containers"
	@echo "  make test                Run unit and preflight test scenarios"
	@echo "  make preflight TARGET=.  Run preflight check on target directory"
	@echo "  make publish-dry-run     Run two-phase publication dry-run plan"
	@echo "  make publish-apply       Execute guarded publication to Plesk"
	@echo "  make status              Check running containers status"
	@echo "  make health              Verify healthz endpoints"
	@echo "  make clean               Clean up containers and test caches"

dev:
	docker compose up -d
	@echo "Plesk Digital Twin Running:"
	@echo "  🌐 Webspace (Nginx+FPM): http://localhost:8791"
	@echo "  🎛️  Plesk Admin Mock API: http://localhost:8792"

dev-stop:
	docker compose down

build:
	docker compose build

test:
	node test/preflight.test.mjs

preflight:
	node src/preflight.mjs $(if $(TARGET),$(TARGET),.)

publish-dry-run:
	node src/publish.mjs $(if $(TARGET),$(TARGET),.) --dry-run

publish-apply:
	node src/publish.mjs $(if $(TARGET),$(TARGET),.) --apply

status:
	docker compose ps

health:
	@curl -fsS http://localhost:8791/ > /dev/null && echo "✓ Nginx+PHP Webspace Healthy (8791)" || echo "✗ Nginx Webspace Down"
	@curl -fsS http://localhost:8792/healthz && echo "" || echo "✗ Admin Mock Down"

clean:
	docker compose down -v --remove-orphans
