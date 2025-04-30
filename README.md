# SAYARI


As per your instructions, I have created a mini Stack-Overflow style backend server. This has been built with PostgreSQL, TypeScript, and Express, all dockerized for easy setup.

Tech Stack

Database - PostgreSQL
API - Express, Node.js, Typescript
Deployment -  Docker

Getting Started 

# 1 Clone the Repository 
    git clone https://github.com/vedladha/SAYARI.git
    cd SAYARI 

# 2 Starting Docker 
    docker-compose up -d --build
On this command, my database (inside db) and api will load up

Just to make sure that the 3 tables - users, answers, and questions all existed in my database I run :  docker-compose exec db psql -U dev -d sayari -c "\dt"

# API Endpoints 

All the endpoints are hosted on http://localhost:4000

I am now going to walk through what each of the endpoints do and how I tested for them. Would like to bring to notice that I did cut corners and focused solely on building api endpoints that showcases all answers for a single question and adds a new answer to an exisiting question. 

# Get all the answers for a question 
GET /questions/:id/answers

Example test: curl http://localhost:4000/questions/1/answers

Expected response: A JSON object with a single property named answers whose value is an array of answers 

# Create a new answer for a particular question
POST /questions/:id/answers

Example test : curl -X POST http://localhost:4000/questions/1/answers \
  -H "Content-Type: application/json" \
  -d '{"user_id":1,"body":"Looks good!","creation":1680000000}'

Expected Response : Response status of 201, showing creation, JSON-object shall be returned. 

# Developement Process and Decisons Made

Data Modeling: Used three normalized tables (users, questions, answers) with foreign keys and an index on answers.question_id for fast lookups.

API Design: Followed RESTful API's GET/POST for answers, plus a combined GET for question+answers for faster lookups. 

Manual Testing: Documented curl commands for testing the enpoints

# Things that made me curious while working on this 
- How would I use Memgraph in here to showcase what the graphical interface would look like. Would love to speak about how that could be integrated in here.

Overall, I really enjoyed working on this assignment! Hope to connect soon.  




