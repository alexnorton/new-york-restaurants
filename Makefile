.PHONY: dev-start
dev-start:
	tmux new-session 'docker-compose -f docker/docker-compose.dev.yml up' \; \
		split-window 'sh -c "cd server && pipenv run python app.py"' \; \
		split-window 'sh -c "cd client && yarn start"' \; \
		select-layout even-vertical \; \
		attach

.PHONY: prod-build
prod-build:
	docker-compose -f docker/docker-compose.prod.yml build

.PHONY: prod-start
prod-start:
	docker-compose -f docker/docker-compose.prod.yml up -d

.PHONY: stop-prod
prod-stop:
	docker-compose -f docker/docker-compose.prod.yml down

.PHONY: prod-logs
prod-logs:
	docker-compose -f docker/docker-compose.prod.yml logs
