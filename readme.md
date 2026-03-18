##Todo App

<img width="1600" height="794" alt="image" src="https://github.com/user-attachments/assets/6cc8a0dd-844e-4f21-a9c5-2c3480ad03e6" />


A simple full-stack To-Do Web Application with React frontend, Node.js + Express backend, and MySQL database. Users can create tasks, view the 5 most recent tasks, and mark tasks as completed.

<img width="1600" height="746" alt="image" src="https://github.com/user-attachments/assets/c757cdef-996b-45fd-a31c-c3901a64ec71" />

<img width="1600" height="899" alt="image" src="https://github.com/user-attachments/assets/6bdbb66e-eb5f-4b74-afbf-2f247a7fb78b" />

<img width="1600" height="899" alt="image" src="https://github.com/user-attachments/assets/98cd972d-e5d7-404b-b33e-56c2dc510a1a" />


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
