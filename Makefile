up:
	docker-compose -f docker-compose.yml up -d $(c)

up-prod:
	docker-compose -f docker-compose.yml -f docker-compose.prod.yml up

down:
	docker-compose down
