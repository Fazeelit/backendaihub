## SmartAIHub Backend

Express + MongoDB backend for SmartAIHub.

## Local Development

Install dependencies and start the API:

```bash
yarn dev
```

The server runs on `http://localhost:3000` by default.

## Environment Variables

Create a root `.env` file and set:

```env
MONGO_URI=your-mongodb-connection-string
JWT_SECRET=replace-this
WEBAPP_URL=http://localhost:3000
```

Supported MongoDB variable names:

- `MONGO_URI`
- `MONGO_URI_DIRECT`
- `MONGODB_URI`
- `DATABASE_URL`

## Render Deployment

Set these in your Render service environment variables:

- `MONGO_URI` or `MONGODB_URI`
- `JWT_SECRET`
- `WEBAPP_URL` if your frontend calls this API
- Any optional Cloudinary or email variables your features need

Start command:

```bash
yarn start
```

If MongoDB is not configured in Render, startup will fail intentionally so the service does not boot in a broken state.
