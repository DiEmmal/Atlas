# ATLAS

ATLAS is a social media API built with Node.js, Express, and MongoDB. It provides endpoints for user registration, authentication, post creation, liking posts, commenting on posts, and retrieving user information.

## Getting Started

To run the application, you need to have Node.js, npm, and docker installed. Then follow these steps:

1. Clone the repository

```bash
git clone https://github.com/DiEmmal/Atlas.git
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

To load fake development data, with MongoDB running, use:

```bash
npm run seed
```

The seed replaces the users, posts and comments in the configured database. All seeded users use the password `Password123!`.

For production, use:

```bash
npm run build && npm run start
```

## API Endpoints

All protected endpoints require a valid JWT. Post creation accepts `multipart/form-data` with an optional `image` file field. The current upload limit is 5 MB.

| Endpoint                        | Method |                                                                      Description |
| :------------------------------ | :----: | -------------------------------------------------------------------------------: |
| /api/auth/register              |  POST  |                                Register a new user with email, name and password |
| /api/auth/login                 |  POST  |                                  Log in an existing user with email and password |
| /api/auth/validate-email/:token |  GET   |                                                  Validate a user's email address |
| /api/posts                      |  POST  | Create a post with title, content and an optional image, authentication required |
| /api/posts                      |  GET   |                 Get all posts, you can see the posts without being authenticated |
| /api/posts/:postID/likes        |  POST  |                                      Toggle a post like, authentication required |
| /api/posts/:postID/comments     |  POST  |                                 Add a comment to a post, authentication required |
| /api/posts/image/:fileName      |  GET   |                                                  Retrieve an uploaded post image |
| /api/users/:userID              |  GET   |                                                                 Get a user by ID |
| /api/users/:userID/image        |  GET   |                                                  Retrieve an uploaded user image |
| /api/users                      |  GET   |                                                           Get all existing users |
| /api/users/:userID              |  PUT   |                                           Update a user, authentication required |

### Create a post with an image

Send the request as `multipart/form-data`:

- `title`: post title
- `content`: post content
- `image`: optional image file (`jpg`, `jpeg`, `png` or `gif`)

The created post stores the generated image filename in `img`. The response also includes `imgURL` for retrieving the image.

Post images are stored in the `uploads/posts/` subdirectory. Other image types can use their own subdirectory through the image service.

User images are uploaded only through `PUT /api/users/:userID` using the optional `image` field in `multipart/form-data`. They are stored in `uploads/users/`.
