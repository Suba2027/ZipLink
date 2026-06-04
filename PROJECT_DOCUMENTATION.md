# ZipLink URL Shortener — Project Documentation

## 1. Planning the App

### 1.1 Problem Statement

Users need a secure, polished way to create and manage shortened URLs while preserving analytics and link privacy. The application should support password-protected redirects, expiration controls, and private link management behind authentication.

### 1.2 Target Users & Real-World Use Cases

**Primary Users:**
- Social media creators who share links frequently.
- Marketers tracking campaign clicks.
- Developers needing disposable or private short links.
- Small teams that require secure URL management.

**Specific Use Cases:**

1. **⏳ Flash Sales & Limited Offers**
   - E-commerce platforms and marketers can set links to expire at specific times (e.g., midnight).
   - **Benefit**: Once the sale ends, the link automatically becomes dead. No manual deletion needed, and customers cannot access outdated discount pages.

2. **🔒 Temporary Document Sharing**
   - Security-conscious teams share sensitive documents, spreadsheets, or resumes with external parties using password-protected, time-limited links.
   - **Benefit**: Minimizes data breach risk. If the link leaks or is found later, it will be automatically dead, protecting private files.

3. **🎟️ Event Registration & Ticketing**
   - Conference organizers, webinar hosts, and event planners use expiring links for registration or ticket booking portals.
   - **Benefit**: Prevents late submissions and ensures access is only available during the registration window or before the event starts.

4. **💾 Download & File Sharing**
   - Software developers, content creators, and asset managers share large downloadable files (archives, PDFs, audio masters) with expiration windows.
   - **Benefit**: Protects server resources by ensuring old links don't continue consuming bandwidth indefinitely.

### 1.3 High-Level Architecture Decision

| Decision | Choice | Rationale |
|---|---|---|
| **Architecture Pattern** | Model-View-Service-Controller | Keeps backend models, service logic, and controllers separate and maintainable. |
| **Backend Framework** | Node.js + Express.js | Lightweight REST API server with fast setup. |
| **Database** | MongoDB + Mongoose | Flexible JSON-based schema for URLs and visit telemetry. |
| **Frontend Framework** | React + Vite | Fast SPA development with modern React tooling. |
| **Styling** | Tailwind CSS | Utility-first styling for responsive interface and premium visuals. |
| **Authentication** | JWT | Stateless auth for API protection and React session handling. |
| **Short Code Generation** | Custom 6-char alphanumeric code | Fast link generation and low collision risk. |

## 2. Feature Verification Checklist

### 2.1 Authentication
- [x] Register with username, email, and password.
- [x] Login with email and password.
- [x] JWT stored in localStorage.
- [x] Protected routes redirect unauthenticated users.
- [x] Users only see their own created URLs.
- [x] Form validation displays clear error messages.

### 2.2 URL Shortening & Management
- [x] Create a short URL from a long destination URL.
- [x] Bulk shorten URLs via CSV content and file upload.
- [x] Unique 6-character short codes are generated.
- [x] URL inputs are normalized and validated.
- [x] Password protection is available for short links.
- [x] Expiration date support is available.
- [x] Edit a URL destination after creation.
- [x] Delete shortened URLs.
- [x] Copy short links to clipboard.
- [x] Search and filter URLs in the dashboard.

### 2.3 Redirect and Security Flow
- [x] Public redirection via `/:shortCode`.
- [x] Password-protected links require verification.
- [x] Verified users are redirected to the original URL.
- [x] Expired links return an error instead of redirecting.
- [x] Click counts and visit timestamps are recorded.

### 2.4 Analytics
- [x] Track total clicks for each link.
- [x] Record each visit timestamp.
- [x] Show analytics for a single short URL.
- [x] Display recent visit logs.
- [x] Render a 7-day click trend chart.
- [x] Display a QR code on analytics page.

### 2.5 UI / UX
- [x] Responsive interface for desktop and mobile.
- [x] Dashboard list/table view for URLs.
- [x] Loading spinners and states during API calls.
- [x] Success and error toast notifications.
- [x] Inline and global error display.

## 3. Implemented Features in This Project

This document is built around the actual repository implementation. It is more accurate than a generic example because it only describes features that exist in this project.

- Authentication and JWT-based backend protection.
- URL creation with optional password locks and expiration.
- Bulk CSV URL import engine.
- Redirect gateway for password-protected links.
- Visit telemetry with clicks, last visited, and time history.
- Analytics page with click trend bars and QR code modal.
- Edit/delete management for user links.
- Search and filter in user link list.
- Modern responsive UI in React + Tailwind.

## 4. Data Models

### User
- `username`: String, required, unique.
- `email`: String, required, unique, lowercase.
- `password`: String, required, hashed.
- `createdAt`: Date, default now.

### Url
- `originalUrl`: String, required.
- `shortCode`: String, required, unique.
- `userId`: ObjectId reference to `User`.
- `createdAt`: Date, default now.
- `clicks`: Number, default 0.
- `lastVisited`: Date, default null.
- `visits`: Array of visit records.
- `password`: String, optional hashed password.
- `expiresAt`: Date, optional expiration.

## 5. API Endpoints

| Endpoint | Method | Auth | Description |
|---|---|---|---|
| `/api/auth/signup` | POST | No | Register a new user. |
| `/api/auth/login` | POST | No | Authenticate user and obtain JWT. |
| `/api/urls` | POST | Yes | Create a new short URL. |
| `/api/urls` | GET | Yes | Get all current user URLs. |
| `/api/urls/:id` | PUT | Yes | Update original URL. |
| `/api/urls/:id` | DELETE | Yes | Delete a shortened URL. |
| `/api/urls/bulk` | POST | Yes | Bulk shorten URLs from CSV. |
| `/api/urls/:shortCode/analytics` | GET | Yes | Get analytics for a link. |
| `/api/redirect/:shortCode/verify` | POST | No | Verify password before redirect. |
| `/:shortCode` | GET | No | Public redirect route. |

## 6. Folder Structure and Key Files

### Backend
- `backend/server.js`: Entry point, routes, redirect gateway.
- `backend/config/db.js`: MongoDB connection.
- `backend/routes/authRoutes.js`: Signup/login logic.
- `backend/routes/urlRoutes.js`: URL CRUD, bulk import, analytics.
- `backend/middleware/authMiddleware.js`: JWT authorization.
- `backend/models/User.js`: User schema.
- `backend/models/Url.js`: Url schema.

### Frontend
- `frontend/src/App.jsx`: React router and protected routes.
- `frontend/src/context/AuthContext.jsx`: Auth state provider.
- `frontend/src/context/ToastContext.jsx`: Toast notification provider.
- `frontend/src/components/CreateUrlForm.jsx`: URL creation and bulk import UI.
- `frontend/src/components/UrlList.jsx`: URL list with search/filter.
- `frontend/src/components/UrlItem.jsx`: Shortcut row/card controls.
- `frontend/src/components/EditUrlModal.jsx`: URL edit modal.
- `frontend/src/pages/LinksListPage.jsx`: Links list page.
- `frontend/src/pages/AnalyticsPage.jsx`: Analytics dashboard.
- `frontend/src/pages/RedirectGatewayPage.jsx`: Password gateway page.
- `frontend/src/services/api.js`: Axios API client.
- `frontend/src/utils/helpers.js`: URL helpers and clipboard utilities.

## 7. User Flow

1. User opens the app.
2. User signs up or logs in.
3. User creates a short link, optionally adding password or expiration.
4. User views created links in the dashboard.
5. User can edit or delete links.
6. Visitors who use a protected short link must verify the password.
7. Verified visitors are redirected to the original URL.
8. Each redirect updates clicks and visit logs.
9. User can review analytics and QR code for any short link.

## 8. Running the App

### Backend
1. `cd backend`
2. `npm install`
3. Create `.env` with:
   - `MONGODB_URI=<your connection string>`
   - `JWT_SECRET=<your secret>`
   - `FRONTEND_URL=http://localhost:5173`
4. `npm run dev`

### Frontend
1. `cd frontend`
2. `npm install`
3. Create `.env` with:
   - `VITE_API_URL=http://localhost:5000`
4. `npm run dev`

## 9. Postman / API Testing

- Good to add a Postman collection for backend testing.
- Test signup/login, protected URL routes, analytics, and redirect verification.
- Use `Authorization: Bearer <token>` for protected endpoints.
- This helps verify backend behavior before using the UI.

## 10. Assumptions Made

- Users need an authenticated, private dashboard.
- MongoDB is available and configured via environment variables.
- Link protection and expiry are optional enhancements.
- Bulk import uses CSV content with one URL per line.
- Password-protected links require gateway verification.

## 11. Conclusion

This document is tailored to the actual implemented features in this project. It is a better fit than a generic demo because it documents your repository’s real capabilities.
