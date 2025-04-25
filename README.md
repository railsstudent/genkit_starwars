## Add environment file
- Copy .env-example to .env
- Copy the API Key from genimi ai studio and assign to 

```
GOOGLE_GENAI_API_KEY=<api key from gemini ai studio>
MOCK_IMAGE=false
PORT=3333
```

## Run in development mode
```bash
npm run genkit:dev
```

### Endpoints
```
POST http://localhost:3333/fictionFlow
POST http://localhost:3333/filmCharactersFlow
POST http://localhost:3333/posterFlow
```

### header
```
x-name: Rebellion
```

## Deploy to Cloud Run 

```
- Choose the correct project
- Enable Security Manager API
- Create a secret key in the Security Manager.  Use the name, secret.
- Grant permission (Secret Manager Secret Accessor role) to the secret key.  Grant to the computer service account 
- Execute the gcloud command for deployment
   - Command:  gcloud run deploy --update-secrets=GOOGLE_GENAI_API_KEY=secret:latest --set-env-vars MOCK_IMAGE=false --port 3333
   - region: us-west1
```