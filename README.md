# Backend Setup

## Node.js Backend

### 1. Initialize the project

```bash
npm init -y
```

This creates a `package.json` file with default values.

---

### 2. Install dependencies

**Production dependencies:**

```bash
npm install express cors dotenv
```

| Package   | Purpose                                                                    |
| --------- | -------------------------------------------------------------------------- |
| `express` | Web framework for building APIs                                            |
| `cors`    | Enables Cross-Origin Resource Sharing (allows frontend to talk to backend) |
| `dotenv`  | Loads environment variables from `.env` file                               |

**Development dependencies:**

```bash
npm install -D typescript @types/express @types/cors ts-node nodemon
```

| Package      | Purpose                              |
| ------------ | ------------------------------------ |
| `typescript` | TypeScript support                   |
| `@types/*`   | Type definitions for TypeScript      |
| `ts-node`    | Runs TypeScript files directly       |
| `nodemon`    | Auto-restarts server on file changes |

---

### 3. Add scripts to `package.json`

```json
"scripts": {
  "dev": "nodemon --exec ts-node src/index.ts",
  "build": "tsc",
  "start": "node dist/index.js"
}
```

| Script  | Purpose                                                 |
| ------- | ------------------------------------------------------- |
| `dev`   | Runs the server in development mode with auto-reload    |
| `build` | Compiles TypeScript to JavaScript in the `dist/` folder |
| `start` | Runs the compiled JavaScript in production              |

---

### 4. Create `tsconfig.json`

```bash
npx tsc --init
```

Or manually create it:

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true
  }
}
```

---

### 5. Create your API

Create `src/index.ts`:

```typescript
import express from "express";
import cors from "cors";

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

app.get("/health", (req, res) => {
  res.json({ message: "Node.js API is running!" });
});

app.listen(PORT, () => {
  console.log(`🚀 Node API running on http://localhost:${PORT}`);
});
```

---

### 6. Run the server

```bash
npm run dev
```

Test at: `http://localhost:3001/health`

---

## Python Backend

### 1. Create a virtual environment

```bash
python3 -m venv venv
```

**What this does:** Creates a folder called `venv/` containing an isolated Python environment. This keeps your project's dependencies separate from system-wide packages.

---

### 2. Activate the virtual environment

```bash
source venv/bin/activate
```

**What this does:** Your terminal prompt changes to `(venv)`, indicating the virtual environment is active. Any `pip install` commands now install packages locally into this project, not globally.

**Note:** You must activate the virtual environment **every time** you open a new terminal to work on this project.

---

### 3. Install dependencies

```bash
pip install fastapi uvicorn
```

| Package   | Purpose                                                              |
| --------- | -------------------------------------------------------------------- |
| `fastapi` | Modern web framework for building APIs (like Express for Python)     |
| `uvicorn` | ASGI server that runs FastAPI applications (like nodemon for Python) |

---

### 4. Create `requirements.txt` (optional but recommended)

```bash
pip freeze > requirements.txt
```

**What this does:** Creates a file listing all installed packages and their versions. Other developers can run `pip install -r requirements.txt` to install the exact same dependencies.

---

### 5. Create `main.py`

```python
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Enable CORS so the frontend can talk to this API
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with your frontend URL
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/health")
def health():
    return {"message": "Python API is running!"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
```

---

### 6. Run the server

```bash
python3 main.py
```

**Or with auto-reload (development):**

```bash
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

Test at: `http://localhost:8000/health`

---

### 7. Deactivate the virtual environment (when done)

```bash
deactivate
```

---

## Quick Comparison

| Aspect          | Node.js        | Python             |
| --------------- | -------------- | ------------------ |
| Package manager | `npm`          | `pip`              |
| Dev auto-reload | `nodemon`      | `uvicorn --reload` |
| Framework       | Express        | FastAPI            |
| Default port    | 3001           | 8000               |
| Config file     | `package.json` | `requirements.txt` |

---

## Common Issues & Solutions

### Node.js

**Error: `ts-node: command not found`**

```bash
npm install -g ts-node
```

**Error: `Cannot find module 'express'`**

```bash
npm install
```

### Python

**Error: `python3: command not found`**

```bash
# Ubuntu/Debian
sudo apt install python3

# Mac with Homebrew
brew install python3
```

**Error: `ModuleNotFoundError: No module named 'fastapi'`**

```bash
source venv/bin/activate
pip install fastapi uvicorn
```

**Error: `address already in use` (port 8000 is busy)**

```bash
# Find the PID using port 8000
sudo lsof -i :8000

# Kill it
kill -9 <PID>

# Or change the port in main.py
```

---

## Project Structure

```
backend-node/
├── src/
│   └── index.ts
├── dist/
├── package.json
├── tsconfig.json
└── .env

backend-python/
├── main.py
├── requirements.txt
├── venv/
└── .env
```

---

## Checklist

- [ ] Node.js backend runs on port 3001
- [ ] Python backend runs on port 8000
- [ ] Both return JSON at `/health`
- [ ] Virtual environment is active when working on Python
- [ ] `requirements.txt` is updated when new packages are installed
