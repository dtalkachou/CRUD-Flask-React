init:
	mkdir docker-data
	make run

run:
	docker-compose up -d --build

test-backend:
	docker-compose exec backend pytest tests
