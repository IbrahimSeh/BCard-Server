# Getting Started with node The-Automobile-Alliance App

## Installation

Enter to the The-Automobile-Alliance folder

```bash
cd The-Automobile-Alliance/server
```

Install the node_modules

```bash
npm i
```

## Available Scripts

you can run:

### `npm start`

- It will run the app with node
- The page will not reload if you make edits.

### `npm run dev`

- Runs the app with nodemon
- The page will reload if you make edits
- The print at the terminal will be blue with the message:

`server running on: http://localhost:8181/`

And if there are no login errors you should see the message painted in blue:

`connected to Mongo`

### Available Routes

## User Routes

#### Register a new user

```http
  POST /api/users
```

request:

-name:
-- object :

    - first:
      -- string
      -- required
      -- min 2
      -- max 256
    - middle:
      -- string
      -- min 2
      -- max 256
      - last:
        -- string
        -- required
        -- min 2
        -- max 256

- isSubscription:
  -- boolean
  -- true/false
- phone:
  -- string
  -- required
  -- min 9
  -- max 14
- email:
  -- string
  -- required
  -- must be email
  -- min 6
  -- max 256
- password:
  -- string
  -- required
  -- min 8
  -- max 1024
  -address:
  -- object :

        - state:
          -- string
          -- min 2
          -- max 256
        - country:
          -- string
          -- required
          -- min 2
          -- max 256
        - city:
          -- string
          -- required
          -- min 2
          -- max 256
        - street:
          -- string
          -- required
          -- min 2
          -- max 256
        - houseNumber:
          -- string
          -- required
          -- min 1
          -- max 256
        - zip:
          -- number
          -- min 0
          -- max 9999999999

  -image:
  -- object :

      - url:
        -- string
      - alt:
        -- string
        -- min 2
        -- max 256

#### Login a user

```http
  POST /api/users/login
```

request:

- email:
  -- string
  -- required
  -- must be email
  -- min 6
  -- max 256
- password:
  -- string
  -- required
  -- min 6
  -- max 1024

#### For Information about all users

```http
  GET /api/users/
```

request:

- must provide token
- must be admin

You will need to provide a token to get an answer from this api

#### For User information about specific user

```http
  GET /api/users/:id
```

request:

- must provide token
- must be registered user or admin

You will need to provide a token to get an answer from this api
You need to be admin or registered user

#### For User information update

```http
  PUT /api/users/:id
```

request:

- must provide token
  \*\* must be the registered user

-name:
-- object :

    - first:
      -- string
      -- required
      -- min 2
      -- max 256
    - middle:
      -- string
      -- min 2
      -- max 256
      - last:
        -- string
        -- required
        -- min 2
        -- max 256

- isSubscription:
  -- boolean
  -- true/false
- phone:
  -- string
  -- required
  -- min 9
  -- max 14
- email:
  -- string
  -- required
  -- must be email
  -- min 6
  -- max 256
- password:
  -- string
  -- required
  -- min 6
  -- max 1024
  -address:
  -- object :

        - state:
          -- string
          -- min 2
          -- max 256
        - country:
          -- string
          -- required
          -- min 2
          -- max 256
        - city:
          -- string
          -- required
          -- min 2
          -- max 256
        - street:
          -- string
          -- required
          -- min 2
          -- max 256
        - houseNumber:
          -- string
          -- required
          -- min 1
          -- max 256
        - zip:
          -- number

  -image:
  -- object :

      - url:
        -- string
      - alt:
        -- string
        -- min 2
        -- max 256

You will need to provide a token to get an answer from this api
You need to be the registered user

#### For User password update

```http
  PUT /api/users/setpassword/:id
```

request:

- must provide token
  \*\* must be the registered user

- password:
  -- string
  -- required
  -- min 6
  -- max 1024

You will need to provide a token to get an answer from this api

## Car Routes

#### To receive all cars that admin create

```http
  GET /api/cars
```

#### To get fav cars of a specific user

```http
  GET /api/cars/get-my-fav-cars
```

request:

- must provide token

#### To get search car of a specific information

```http
  GET /api/cars/search
```

-manufacturerArr:
-- string
-- array
-- required

-typeArr:
-- string
-- array
-- required

-fromYear:
-- number
-- required
-- min 1900
-- max 2999

-toYear:
-- number
-- required
-- min 1900
-- max 2999

-FromKm:
-- number
-- required
-- min 0
-- max 2000000

-toKm:
-- number
-- required
-- min 0
-- max 2000000

-fromPrvOwn:
-- number
-- required
-- min 1900
-- max 2999

-toPrvOwn:
-- number
-- required
-- min 1900
-- max 2999

#### To create a new car

```http
  POST /api/cars
```

request:

- must provide token
  \*\* must registered as admin user

-manufacturerData:
-- object :

- manufacturer :
  -- string
  -- required
  -- min 2
  -- max 256
- type :
  -- string
  -- required
  -- min 2
  -- max 256
- subType :
  -- string
  -- min 2
  -- max 256

-communications:
-- object :

- phone:
  -- string
  -- required
  -- min 9
  -- max 14
- email:
  -- string
  -- must be email
  -- min 6
  -- max 256

-engine:
-- object :

- engineType:
  -- string
  -- required
  -- min 1
  -- max 256
- fuelType:
  -- string
  -- min 1
  -- max 256

-image:
-- object :

- url:
  -- string
  -- array
- alt:
  -- string
  -- array

- address:
  -- object :

  - state:
    -- string
    -- min 2
    -- max 256
  - country:
    -- string
    -- required
    -- min 2
    -- max 256
  - city:
    -- string
    -- required
    -- min 2
    -- max 256
  - street:
    -- string
    -- required
    -- min 2
    -- max 256

  - yearOfProduction :
    -- number
    -- required
    -- min 1900
    -- max 2999

    - previousOwners :
      -- number
      -- required
      -- min 0
      -- max 300

    - kilometers :
      -- number
      -- required
      -- min 0
      -- max 2000000

  You will need to provide a token to get an answer from this api

#### To update a car

```http
  PUT /api/cars/:id
```

request:

- must provide token
  \*\* must registered as business user who create the card

\*-manufacturerData:
-- object :

- manufacturer :
  -- string
  -- required
  -- min 2
  -- max 256
- type :
  -- string
  -- required
  -- min 2
  -- max 256
- subType :
  -- string
  -- min 2
  -- max 256

-communications:
-- object :

- phone:
  -- string
  -- required
  -- min 9
  -- max 14
- email:
  -- string
  -- must be email
  -- min 6
  -- max 256

-engine:
-- object :

- engineType:
  -- string
  -- required
  -- min 1
  -- max 256
- fuelType:
  -- string
  -- min 1
  -- max 256

-image:
-- object :

- url:
  -- string
  -- array
- alt:
  -- string
  -- array

- address:
  -- object :

  - state:
    -- string
    -- min 2
    -- max 256
  - country:
    -- string
    -- required
    -- min 2
    -- max 256
  - city:
    -- string
    -- required
    -- min 2
    -- max 256
  - street:
    -- string
    -- required
    -- min 2
    -- max 256

  - yearOfProduction :
    -- number
    -- required
    -- min 1900
    -- max 2999

    - previousOwners :
      -- number
      -- required
      -- min 0
      -- max 300

    - kilometers :
      -- number
      -- required
      -- min 0
      -- max 2000000

    You will need to provide a token to get an answer from this api

#### To update car like

```http
	PATCH /api/cars/car-like/:id
```

- must provide token
- must be registered user

#### To delete a car

```http
  DELETE /api/cars/:id
```

- must provide token
  \*\* must be admin
  You will need to provide a token to get an answer from this api

## VARs Routes

// VAR = Vehicle Advertising Requests

#### To receive all VAR

```http
  GET /api/VAR
```

#### To receive all cars of the registered user from Vehicle Advertising Requests

```http
  GET /api/VAR/get-my-fav-vars
```

- must provide token
- must be the registered user
  You will need to provide a token to get an answer from this api

  #### To receive all cars of the registered user from Vehicle Advertising Requests with flag false or true

with flag false - return all request that wait for answer from admin
with flag true - return all cars that has been accepted fromm admin to publish

```http
  GET /api/VAR/From-Outside/:flag
```

#### To get a specific VAR

```http
  GET /api/VAR/:id
```

#### To create a new VAR

```http
  POST /api/VAR
```

request:

- must provide token
  \*\* must registered as isSubscription user

-manufacturerData:
-- object :

- manufacturer :
  -- string
  -- required
  -- min 2
  -- max 256
- type :
  -- string
  -- required
  -- min 2
  -- max 256
- subType :
  -- string
  -- min 2
  -- max 256

-communications:
-- object :

- phone:
  -- string
  -- required
  -- min 9
  -- max 14
- email:
  -- string
  -- must be email
  -- min 6
  -- max 256

-engine:
-- object :

- engineType:
  -- string
  -- required
  -- min 1
  -- max 256
- fuelType:
  -- string
  -- min 1
  -- max 256

-image:
-- object :

- url:
  -- string
  -- array
- alt:
  -- string
  -- array

- address:
  -- object :

  - state:
    -- string
    -- min 2
    -- max 256
  - country:
    -- string
    -- required
    -- min 2
    -- max 256
  - city:
    -- string
    -- required
    -- min 2
    -- max 256
  - street:
    -- string
    -- required
    -- min 2
    -- max 256

  - yearOfProduction :
    -- number
    -- required
    -- min 1900
    -- max 2999

    - previousOwners :
      -- number
      -- required
      -- min 0
      -- max 300

    - kilometers :
      -- number
      -- required
      -- min 0
      -- max 2000000

  You will need to provide a token to get an answer from this api

#### To update VAR publish

```http
	PATCH /api/VAR/:id
```

- must provide token
- must be admin

#### To delete a VAR

```http
  DELETE /api/VAR/:id
```

- must provide token
- must be admin

#### To PATCH like of VAR

```http
	PATCH /api/VAR/VAR-like/:id
```

- must provide token

## Admin Routes

### To update a biznumber card

```http
  PUT /api/admin/:biznumber
```

- must be admin
