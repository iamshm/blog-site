```
npm install
npm run dev
```

```
npm run deploy
```

#### config

Paste DATABASE_URL and JWT_SECRET in `wrangler.toml` in the same format as present `wrangler.toml.example`
Your actual database url should be in .env file with a key named `DATABASE_URL` and DATABASE_URL in your `wrangler.toml` file should have link of prisma accelerate
