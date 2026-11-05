
# 🌱 ImpactNest — Community Event Platform

**Connect People. Organize Initiatives. Create Positive Impact.**

**ImpactNest** is a full-stack community event platform designed to bring people together through meaningful social activities. It provides a centralized space where users can explore community events, create and manage their own initiatives, and participate in activities that contribute to positive social change.

From donation drives and community cleanups to tree plantation programs and winter relief campaigns, ImpactNest makes it easier for individuals to connect, collaborate, and turn good intentions into meaningful action.

### 🔗 Project Links

- **Live Website:** [https://impactnest-community.vercel.app](https://impactnest-community.vercel.app)
- **Frontend Repository:** [impactnest-community](https://github.com/badrulalambd/impactnest-community)
- **Backend Repository:** [impactnest-community-server](https://github.com/badrulalambd/impactnest-community-server)

## 📸 Application Preview

<img width="1000" height="700" alt="ImpactNest-SS" src="https://github.com/user-attachments/assets/276e21c3-aa95-4362-8e3b-f6f9721cda64" />


## 🛠️ Technology Stack

### Frontend Development

<p>
  <img src="https://skillicons.dev/icons?i=nextjs,react,ts,js,tailwind" alt="Frontend Technologies" />
</p>

- **Next.js (App Router)** – Frontend framework for routing and rendering.
- **React** – Component-based user interface development.
- **TypeScript & JavaScript** – Application development and type safety.
- **Tailwind CSS** – Utility-first styling and responsive layouts.
- **shadcn/ui** – UI component design libraries.
- **Base UI** – Accessible and reusable interface primitives.

### Authentication & Authorization

- **Better Auth** – Email/password authentication, registration, login, and session management.
- **Google OAuth** – Social login using Google accounts.
- **MongoDB Adapter** – Database integration for Better Auth.
- **JWT** – Token-based authentication and authorization for protected backend operations with middleware.

### Backend Development

<p>
  <img src="https://skillicons.dev/icons?i=nodejs,express,mongodb" alt="Backend Technologies" />
</p>

- **Node.js** – Server-side JavaScript runtime.
- **Express.js** – Backend framework for REST API development.
- **MongoDB** – Database for storing application data.
- **JavaScript** – Backend application logic and API development.

### Additional Tools & Libraries

- **Lucide React & React Icons** – Icon libraries.
- **React Hot Toast** – Interactive notifications and user feedback.
- **next-themes** – Light and dark theme management.
- **class-variance-authority** – Component style variant management.
- **dotenv** – Environment variable configuration.

## ✨ Key Features

ImpactNest provides essential tools for discovering, organizing, and participating in community-driven initiatives.

**🌍 Discover Community Events:** Guests and registered users can explore the Home, Events, and Event Details pages without signing in. Discover available activities and find opportunities to participate in meaningful social initiatives.

**🔐 Secure Authentication:** Register and log in using email and password through Better Auth. The platform also supports Google social login for convenient and secure authentication.

**➕ Create & Publish Events:** Authenticated users can create and publish community events with relevant information to encourage others to participate in their initiatives.

**📋 Manage Your Events:** Logged-in users can access the Manage Events page to view and manage the events they have created.

**🤝 Join Events & Track Participation:** Authenticated users can join events from the Event Details page and access the Joined Events page to view and manage their participation.

## 🔒 Page Access & Authentication

ImpactNest separates public pages from protected pages to provide an accessible browsing experience while securing user-specific features.

| Page | Access | Description |
|---|---|---|
| Home | Public | Explore the platform and discover community initiatives. |
| Events | Public | Browse available community events. |
| Event Details | Public | View detailed information about individual events. |
| Create Event | Private | Create and publish community events. |
| Manage Events | Private | Manage events created by the logged-in user. |
| Joined Events | Private | View and manage joined events. |
| Login | Public | Sign in using email/password or Google. |
| Register | Public | Create an account using email/password. |

### Authentication Rules

- Guests can explore Home, Events, and Event Details pages without logging in.
- Users must be authenticated to create and publish events.
- Only logged-in users can join community events.
- The Manage Events page is accessible to authenticated users for managing their own events.
- The Joined Events page is restricted to authenticated users.

## 📦 Dependencies

### Frontend Dependencies

`@base-ui/react`, `@better-auth/mongo-adapter`, `better-auth`, `class-variance-authority`, `cn`, `dotenv`, `lucide-react`, `mongodb`, `next`, `next-themes`, `react`, `react-dom`, `react-hot-toast`, `react-icons`, `shadcn`, `tw-animate-css`

### Frontend Dev Dependencies

`@tailwindcss/turbopack`, `@types/node`, `@types/react`, `@types/react-dom`, `babel-plugin-react-compiler`, `eslint`, `eslint-config-next`, `tailwindcss`, `typescript`

## 🚀 How to Run the Project Locally

Follow these instructions to set up and run both the frontend and backend applications on your local machine.

### Prerequisites

Make sure you have installed:

- [Node.js](https://nodejs.org/)
- npm
- [Git](https://git-scm.com/)
- [MongoDB](https://www.mongodb.com/) database or MongoDB Atlas account

### 1. Clone the Frontend Repository

```bash
git clone https://github.com/badrulalambd/impactnest-community.git
cd impactnest-community
npm install
```

### 2. Clone the Backend Repository

Open another terminal and run:

```bash
git clone https://github.com/badrulalambd/impactnest-community-server.git
cd impactnest-community-server
npm install
```

### 3. Configure Frontend Environment Variables

Create a `.env` file in the root directory of the frontend project and add the following variables:

```env
BETTER_AUTH_SECRET=your_better_auth_secret
BETTER_AUTH_URL=http://localhost:3000
NEXT_PUBLIC_DESTINATIONS_API_BASE_URL=http://localhost:5000
MONGODB_URL=your_mongodb_connection_url
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```

**Environment Variable Details:**

| Variable | Description |
|---|---|
| `BETTER_AUTH_SECRET` | Secret key used by Better Auth. |
| `BETTER_AUTH_URL` | Base URL of the frontend application. |
| `NEXT_PUBLIC_DESTINATIONS_API_BASE_URL` | Base URL of the backend API. |
| `MONGODB_URL` | MongoDB connection URL. |
| `GOOGLE_CLIENT_ID` | Google OAuth client ID. |
| `GOOGLE_CLIENT_SECRET` | Google OAuth client secret. |

Replace the placeholder values with your actual credentials and configuration.

### 4. Configure Backend Environment Variables

Create a `.env` file in the root directory of the backend project:

```env
CLIENT_URL=http://localhost:3000
MONGODB_USER=your_mongodb_user
MONGODB_PASSWORD=your_mongodb_password
```

**Environment Variable Details:**

| Variable | Description |
|---|---|
| `CLIENT_URL` | Frontend application URL used for client/server communication and CORS configuration. |
| `MONGODB_USER` | MongoDB database username. |
| `MONGODB_PASSWORD` | MongoDB database password. |

**Important:** Never commit `.env` files containing secrets, OAuth credentials, or database passwords to GitHub.

### 5. Start the Backend Server

Navigate to the backend project directory and start the Express server using Node.js.

```bash
node index.js
```

Ensure the backend server is running at:

```text
http://localhost:5000
```

### 6. Start the Frontend Application

Open another terminal, navigate to the frontend project directory, and run:

```bash
npm run dev
```

The Next.js development server will start at:

```text
http://localhost:3000
```

### 7. Open the Application

Visit the following URL in your browser:

**http://localhost:3000**

You can now explore ImpactNest, browse community events, register or log in, and access the authenticated features.

## 👨‍💻 Author

**Badrul Alam**  
Full-Stack Web Developer

- **Portfolio:** [badrulalam.me](https://badrulalam.me)
- **GitHub:** [badrulalambd](https://github.com/badrulalambd)

---

<p align="center">
  <strong>Built to connect communities, inspire collaboration, and create meaningful social impact. 🌍</strong>
</p>
