# Get started (this for development only)
Inside `laravel` directory, copy the `.env.example` to create a new `.env` file.
Or simply do this `cp laravel/.env.example laravel/.env`

- Build the docker images: `make setup`, this will build all images for the project. This process may also take a while, go make a cup of coffe while waiting.

- After running the initial setup, do a `make start` to start the project. Please note that laravel will run on port 80, so make sure that you dont currently have anything running on that port when you start this project.

- to stop the project containers: `make clean`

- to run it again: `make start`


# Accessing The Project
### You should see a `NOTICE: ready to handle connections` from your terminal, this means your ready to try the app
- The Laravel can be accessed on localhost port 80 [http://localhost](http://localhost)
- The Vue instance can be accessed on localhost port 3000 [http://localhost:3000](http://localhost:3000)


# Accessing The Database
- as defined on `docker-compose.yml` file, you can access the database on port `3306`. The credentials will be the ones defined on your `.env` file for `DB_PASSWORD`, `DB_DATABASE` and `DB_USERNAME`
