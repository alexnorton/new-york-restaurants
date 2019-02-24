.PHONY: start-dev
start-dev:
	tmux new-session 'docker-compose -f docker/docker-compose.dev.yml up' \; \
		split-window 'sh -c "cd server && pipenv run python app.py"' \; \
		split-window 'sh -c "cd client && yarn start"' \; \
		select-layout even-vertical \; \
		attach
