# Backend API Service

## API Endpoints

### `POST /business-data`
- **Request Body**:
  ```json
  {
    "name": "Business Name",
    "location": "City, Country"
  }
  ```
- **Response**:
  ```json
  {
    "rating": 4.5,
    "reviews": 128,
    "headline": "Best Business Name in City"
  }
  ```

### `GET /regenerate-headline`
- **Query Parameters**:
  - `name`: Business name
  - `location`: Business location
- **Response**:
  ```json
  {
    "headline": "New generated headline"
  }
  ```

## Development
```bash
npm run dev  # Starts with nodemon for hot-reloading
```


## Set up backend:
   ```bash
   npm init -y  ,
   npm install express cors
   node server.js 
   ```