##Todo App

A simple full-stack To-Do Web Application with React frontend, Node.js + Express backend, and MySQL database. Users can create tasks, view the 5 most recent tasks, and mark tasks as completed.

##Features

Create new tasks (title & description)
Display the 5 most recent tasks
Mark tasks as completed (completed tasks are hidden)
REST API backend
Dockerized for easy deployment

##Architecture

Frontend (React SPA)
         |
         v
Backend (Express API)
         |
         v
Database (MySQL)


Using Docker Compose

Clone the repository:
    git clone <your-repo-link>
    cd todo-app 
    docker-compose up --build


Manual Setup 

    Backend:
        cd backend
        npm install
        npm run dev

    Frontend:
        cd frontend
        npm install
        npm run dev 

Testing

    Backend Tests
        Setup:
            cd backend
            npm install --save-dev jest supertest
        run:
            npm test
            
Frontend Tests

        Setup (Vite + React):
            cd frontend
            npm install --save-dev vitest @testing-library/react @testing-library/jest-dom jsdom
