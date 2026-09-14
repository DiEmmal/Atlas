# Social Media API

A social media API for user authentication, profile management, and future social features.

## Getting Started

To run the application, you need to have Node.js, npm, and docker installed. Then follow these steps:

1. Clone the repository

```bash
git clone https://github.com/DiEmmal/social_media_api.git
```

2. Install dependencies

```bash
npm install
```

3. Configure environment variables, get the `.env.template` file and rename it to `.env`, then fill in the values

```bash
PORT=3000                               # Port to run the application on
NODE_ENV=development                    # Application environment (development | production)
PUBLIC_PATH=public                      # Public path for static files and root endpoint
MONGO_URL=mongodb://...                 # MongoDB connection string
MONGO_USER=root                         # MongoDB username for docker-compose.yml
MONGO_PASS=secret                       # MongoDB password for docker-compose.yml
MONGO_DB_NAME=mydatabase                # MongoDB database name
MAILER_SERVICE=gmail                    # Mail service (e.g., gmail)
MAILER_EMAIL=example@gmail.com          # Email address used for sending emails
MAILER_SECRET_KEY=xxxx                  # App password (requires 2-step verification)
WEBSERVICE_URL=http://localhost:3000    # Application root URL
JWT_SECRET=your_jwt_secret              # Secret key for signing JWT tokens
```

4. Configure the database with docker-compose

```bash
docker compose up -d
```

5. Run the application
   For development, use:

```bash
npm run dev
```

For production, use:

```bash
npm run build && npm run start
```

## Authentication

### Endpoints

| Endpoint                | Method |                                                          Description |
| :---------------------- | :----: | -------------------------------------------------------------------: |
| /api/auth/register      |  POST  |                    Register a new user with email, name and password |
| /api/auth/login         |  POST  |                      Log in an existing user with email and password |
| /api/posts              |  POST  | Make a new post with title and content, you need to be authenticated |
| /api/posts              |  GET   |     Get all posts, you can see the posts without being authenticated |
| /api/posts/:postID/like |  POST  |                            Like a post, you need to be authenticated |
| /api/users/:userID      |  GET   |                       Get a user by ID, you need to be authenticated |
| /api/users              |  GET   |                                               Get all existing users |
| /api/users/:userID      |  PUT   |                          Update a user, you need to be authenticated |