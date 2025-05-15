[![Download Report](https://img.shields.io/badge/Download-Report-blue)](https://drive.google.com/file/d/1yYxazo8QRG3qZzWO1Qj27nVoCb7Qxq14/view?usp=sharing)

[![Hosted Link](https://img.shields.io/badge/Visit-Hosted%20Link-blue?style=for-the-badge)](https://global-explorer-lac.vercel.app/)

#  🌏 Global Explorer - REST Countries API App

## Project Summary

Global Explorer is a dynamic web application developed for the SE3040 coursework, utilizing the REST Countries API to deliver an engaging platform for discovering country data. It features a responsive React frontend styled with Bootstrap and a robust Node.js/Express backend integrated with MongoDB. Users can explore countries, filter by region, search dynamically, view detailed information, and save favorites after signing in.

## Core Features

### 1. Explore Countries

- Displays a comprehensive list of countries sourced from the REST Countries API.
- Country cards showcase flags, names, capitals, populations, and regions.
- Includes a real-time search bar to find countries by name.
- Offers a "View Details" button for more in-depth information.
- Logged-in users can mark countries as favorites using a heart icon.

### 2. Region-Based Filtering

- Sort countries by region (e.g., Africa, Asia, Europe).
- Presents results in a responsive grid layout.

### 3. User Authentication

- **Register**: Sign up with name, email, password, and optional role (user/admin).
- **Login**: Authenticate with email and password to access exclusive features.
- Includes client-side validation with friendly UI icons.
- Stores JWT tokens in `localStorage` for session persistence.

### 4. Favorite Countries Management

- Authenticated users can heart countries to save them as favorites.
- Access a dedicated `/favorites` route to view saved countries in detail.
- Unauthenticated users are redirected to the login page with a SweetAlert notification.

### 5. Responsive Interface

- Styled with Bootstrap for seamless adaptation across all devices.
- Uses Framer Motion for smooth transitions (e.g., card animations, form fade-ins).
- Features a fixed Navbar for intuitive navigation.

### 6. Secure Backend

- Stores user data securely in MongoDB with hashed passwords (bcrypt).
- Manages sessions using `express-session` and MongoDB storage.
- Protects routes (like favorites) with JWT authentication.
- Enables CORS for secure frontend-backend communication.

## Requirements

- **Node.js**: v16.x or v18.x
- **MongoDB**: Local or cloud-based (e.g., MongoDB Atlas)
- **Git**: For repository cloning

---

## Installation Guide

### Backend Setup

1. Navigate to the backend directory:

```bash
cd backend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in `backend/` with the following:

   ```plaintext
   MONGO_URI=mongodb://localhost:27017/rest-countries
   JWT_SECRET=your_jwt_secret_key_here
   SESSION_SECRET=your_session_secret_key_here
   PORT=5000
   ```

   - Generate secrets using:

     ```javascript
     const crypto = require('crypto');
     console.log(crypto.randomBytes(32).toString('hex'));
     ```

4. Start MongoDB (if local):

   ```bash
   mongod
   ```

5. Start the backend server:

   ```bash
   npm run dev
   ```

   - The server runs at `http://localhost:5000`.
  
  ### Frontend Setup

1. Navigate to the frontend directory:

   ```bash
   cd frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the frontend development server:

   ```bash
   npm start
   ```

   - The app runs at `http://localhost:3000`.

   ## Usage

1. **Access the Application**:

   - Open `http://localhost:3000` in your browser.
   - Use the Navbar to navigate:
     - **Home** (`/`): Welcome page.
     - **All Countries** (`/all`): Browse and search countries.
     - **Filter by Region** (`/filter`): View countries by region.
     - **Favorites** (`/favorites`): Access saved countries (login required).
     - **Login** (`/login`):  Sign into your account.
     - **Register** (`/register`): Create a new account.

2. **Key Actions**:

   - **Search Countries**: Type a country name in the  `/all` page search bar.
   - **Add to Favorites**: Log in, then click the heart icon on a country card in `/all`.
   - **View Favorites**: Navigate to `/favorites` to see your saved countries.
   - **Authentication**: Unauthenticated users attempting to access favorites will be redirected to `/login` with a SweetAlert notification.

## Dependencies

### Frontend

- `react`, `react-dom`: React core libraries.
- `react-router-dom`: Client-side routing.
- `axios`: API requests.
- `bootstrap`: Responsive UI styling.
- `framer-motion`: UI animations.
- `react-icons`: Icons (e.g., heart, user).
- `sweetalert2`: User-friendly alerts.
- `react-spinners`: Loading indicators.

### Backend

- `express`: Web framework.
- `mongoose`: MongoDB ORM.
- `jsonwebtoken`: JWT authentication.
- `bcryptjs`: Password encryption (hashed-password).
- `express-session`, `connect-mongo`: Session storage.
- `cors`: Cross-origin requests.
- `dotenv`: Environment variables.

## Troubleshooting

1. **Framer Motion Errors**:

   - If you encounter `Module not found` errors for `framer-motion`, reinstall dependencies:

     ```bash
     rm -rf node_modules package-lock.json
     npm install framer-motion@10.18.0
     ```
3. **MongoDB Connection**:

   - Ensure MongoDB is running or replace `MONGO_URI` with a valid cloud URI.
    
4. **CORS Issues**:
   
   - Verify `cors` middleware in `backend/server.js`:

   ```javascript
   app.use(cors());
   ```
7. **JWT Issues**:
   - Ensure `JWT_SECRET` and `SESSION_SECRET` are defined in `backend/.env`.

## License

This project is developed for educational purposes as part of the SE3040 assignment. It is not licensed for commercial use.
