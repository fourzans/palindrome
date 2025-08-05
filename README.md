# 🌀 Palindrome Service

[![CI](https://github.com/fourzans/palindrome/actions/workflows/ci.yml/badge.svg)](https://github.com/fourzans/palindrome/actions/workflows/ci.yml)

A production-ready Node.js + TypeScript API that checks whether a string is a palindrome.

---

## ✨ Features

- ⚙️ Express with TypeScript
- 🛡 Helmet, rate limiting, CORS
- 📦 Zod validation with OpenAPI Swagger docs
- 🚦 Feature flag support for `/palindrome` endpoint
- 📊 Structured logging via Pino with request IDs and latency
- 🧪 Vitest-powered unit and integration tests
- 🐳 Docker + Docker Compose support
- 🚀 GitHub Actions CI pipeline

---

## 🚀 Getting Started

### 1. Clone and install

```bash
git clone https://github.com/fourzans/palindrome.git
cd palindrome
npm install
```

### 2. Set up environment variables

```bash
cp .env.example .env
```

#### Example env

```env
PORT=3000
LOG_LEVEL=info
FF_POLYANDROME_ENABLED=true
```

## 🔧 Run the app

### Development (with watch mode)

```bash
npm run dev
```

### Build and start

```bash
npm run build
npm start
```

## 🐳 Docker

Run the service in Docker:

```bash
docker-compose up --build
```

Make sure to update .env if needed before starting.

## 🔍 Example Usage

```bash
curl "http://localhost:3000/polyandrome?q=Never%20odd%20or%20even"
```

```json
{
  "query": "Never odd or even",
  "strict": false,
  "isPalindrome": true
}
```

## 📬 Endpoints

| Method | Path                 | Description      |
| ------ | -------------------- | ---------------- |
| GET    | `/polyandrome?q=...` | Palindrome check |
| GET    | `/docs`              | Swagger UI       |
| GET    | `/openapi.json`      | OpenAPI 3.0 JSON |
| GET    | `/health/live`       | Liveness probe   |

## 🧪 Run Tests

```bash
npn run test
```

🗂 Project Structure

```bash
src/
├── app.ts                # Express app
├── server.ts             # Server bootstrapping
├── routes/               # Route handlers
├── middleware/           # Error handling, logging, etc.
├── docs/openapi.ts       # OpenAPI registry and Swagger doc
├── flags/                # Feature flag helpers
├── utils/                # Palindrome logic
test/                     # Vitest test files

```

## 🤖 GitHub Actions CI

CI pipeline: .github/workflows/ci.yml

It does the following on push and pull request:

- ⬇️ Checkout + cache deps
- 🔍 Lint with ESLint
- ✅ Run tests with Vitest
- 🏗 Build project
- 🐳 Optionally build Docker image

## 📄 License

MIT © Mariano Nicolas Fourzans

See [LICENSE](./LICENSE)
