rebuild:
		docker-compose --env-file=./.env up -d --no-deps --build
build:
		docker-compose --env-file=./.env up -d
down:
		docker-compose --env-file=./.env down
prune:
		docker system prune --all