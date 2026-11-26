
# 🇮🇳 Incredible India – Tourist Guide & Itinerary Planner

A MERN Stack web application designed to help travellers explore the beauty, culture and diversity of India and plan their journeys with ease.

From the iconic Bandra-Worli Sea Link in Mumbai to the historic monuments of Delhi, the tea gardens of Assam and the breathtaking mountains of Ladakh, Incredible India brings India's travel destinations together in one place.

## 🌍 Project Overview

Incredible India is a tourist guide and itinerary planner developed using the MERN Stack (MongoDB, Express.js, React.js and Node.js).

The application allows users to discover popular Indian destinations, explore attractions, search destinations by region and create personalized travel itineraries.

## ✨ Features

- **Explore Destinations:** Discover popular tourist destinations across India.
- **Destination Search:** Search destinations by name, state or description.
- **Regional Filtering:** Filter destinations by North, South, East, West and Northeast India.
- **Destination Details:** View descriptions and major attractions.
- **Trip Planner:** Create personalized travel plans.
- **Budget Planning:** Add an estimated budget for each trip.
- **Activity Management:** Add activities to saved itineraries.
- **Saved Trips:** View and manage previously created trips.
- **Delete Trips:** Remove itineraries when no longer needed.
- **Responsive Interface:** Designed for desktop and mobile screens.

## 🏞️ Destinations Covered

| Destination | State / Region | Highlights |
|---|---|---|
| Mumbai | Maharashtra | Gateway of India, Marine Drive, Sea Link |
| Delhi | Delhi | India Gate, Red Fort, Qutub Minar |
| Meghalaya | Northeast India | Dawki, Cherrapunji, Living Root Bridges |
| Assam | Northeast India | Tea Gardens, Kaziranga, Majuli |
| Ladakh | North India | Pangong Lake, Nubra Valley |
| Sikkim | Northeast India | Gangtok, Tsomgo Lake |
| Jaipur | Rajasthan | Hawa Mahal, Amber Fort |
| Munnar | Kerala | Tea Plantations, Mattupetty Dam |

## 🛠️ Technology Stack

**Frontend**
- React.js
- Vite
- JavaScript
- HTML5
- CSS3
- Axios
- Lucide React

**Backend**
- Node.js
- Express.js
- REST API

**Database**
- MongoDB
- Mongoose

**Development Tools**
- Visual Studio Code
- Git & GitHub
- Docker

## 📁 Project Structure

```text
incredible-india/
│
├── backend/
│   ├── models/
│   │   └── Trip.js
│   ├── routes/
│   │   ├── destinations.js
│   │   └── trips.js
│   ├── .env
│   ├── server.js
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── index.css
│   │   └── main.jsx
│   ├── public/
│   └── package.json
│
├── .gitignore
└── README.md
```

## ⚙️ Installation & Setup

### Prerequisites

Make sure you have installed:

- Node.js and npm
- MongoDB (local installation or Docker)
- Git
- Visual Studio Code (recommended)

### 1. Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/incredible-india-tourist-planner.git
cd incredible-india-tourist-planner
```

### 2. Start MongoDB

If using Docker, run:

```bash
docker run -d --name india-mongodb -p 27017:27017 mongo:7
```

If the container already exists, start it using:

```bash
docker start india-mongodb
```

### 3. Configure Backend

Navigate to the backend directory:

```bash
cd backend
npm install
```

Create a `.env` file inside the backend directory:

```env
MONGO_URI=mongodb://127.0.0.1:27017/incredibleIndia
```

Start the backend server:

```bash
npm run dev
```

Backend runs at:

`http://localhost:5000`

### 4. Configure Frontend

Open a new terminal:

```bash
cd frontend
npm install
npm install axios lucide-react
npm run dev
```

Open the local URL displayed by Vite in your browser (usually `http://localhost:5173`).

## 🔗 API Endpoints

Base URL: `http://localhost:5000/api`

### Destinations

| Method | Endpoint | Description |
|---|---|---|
| GET | `/destinations` | Get all destinations |
| GET | `/destinations/:id` | Get destination by ID |

Optional query parameters: `search`, `region`, `category`.

### Trips

| Method | Endpoint | Description |
|---|---|---|
| GET | `/trips` | Get all saved trips |
| POST | `/trips` | Create a new trip |
| PATCH | `/trips/:id/activities` | Add an activity |
| DELETE | `/trips/:id` | Delete a trip |

## 🧠 Learning Outcomes

This project demonstrates practical implementation of:

- Full-stack web application development.
- React components and state management.
- RESTful API development using Express.js.
- MongoDB database connectivity.
- CRUD operations using Mongoose.
- Frontend and backend integration using Axios.
- Environment variable configuration.
- Version control using Git and GitHub.

## 🚀 Future Enhancements

- User authentication and profile management.
- Interactive maps and route planning.
- Live weather information.
- Hotel and transportation recommendations.
- More destinations and detailed travel guides.
- Advanced itinerary customization.

## 👨‍💻 Author

**Aman Bisht**

Master of Computer Applications (MCA)

Developed as an academic full-stack development project.

---

⭐ If you find this project interesting, consider giving the repository a star!

**Explore India. Experience Incredible. 🇮🇳**
