command="podman-compose"

dev_frontend:
	@cd frontend && npm run dev

dev_backend:
	@fastapi dev backend/main.py

db_up:
	@$(command) up

db_down:
	@$(command) down

install:
	@cd frontend && npm i
	@pip install -r backend/requirements.txt

psql:
	@$(command) exec postgres psql -U postgres -d fullstack


