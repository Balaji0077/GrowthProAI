# Mini Local Business Dashboard
This is a full-stack project that simulates how small businesses can view their Google ratings and SEO headlines. It has a React frontend and a Node.js + Express backend.

# Features
- Input form to enter Business Name and Location

- Displays:

Google Rating (simulated)

Number of Reviews (simulated)

AI-generated SEO headline (random from backend)

Button to regenerate SEO headline

Mobile-friendly and responsive using Tailwind CSS

# Tech Stack

Frontend: React + Tailwind CSS

Backend: Node.js + Express

# How to Run the Project 
1. Run the Backend
   npm install
   node server.js
2. Run the Frontend
   npm install
   npm run dev

- http://localhost:3000
   
# Endpoints 

POST /business-data: Accepts business name and location, returns rating, reviews, and headline.

GET /regenerate-headline?name=...&location=...: Returns a new headline using the same business info.

