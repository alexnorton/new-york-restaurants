.PHONY: start

start:
	tmux new-session 'docker-compose up' \; \
		split-window 'sh -c "cd server && pipenv run python app.py"' \; \
		split-window 'sh -c "cd client && yarn start"' \; \
		select-layout even-vertical \; \
		attach