docker-compose up -d
echo '🟡 - Waiting for database to be ready...'
./scripts/wait-for-it.sh "postgresql://postgres:testpass123@localhost:6500/mydb" -- echo '🟢 - Database is ready!'
npx prisma migrate dev --name init
npm run test
docker-compose down