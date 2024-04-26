DATABASE_URL=postgresql://prisma:prisma@localhost:5432/test_prisma?schema=public

test-integration:
	@docker-compose up -d
	@sleep 1
	@DATABASE_URL=${DATABASE_URL} npx prisma migrate deploy
	@sleep 1
	@DATABASE_URL=${DATABASE_URL} npx jest ./tests/integration
	@sleep 1
	@docker-compose down