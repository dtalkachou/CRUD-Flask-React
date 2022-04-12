init:
	mkdir docker-data
	make run

run:
	docker-compose up -d --build
