# Getting Started with node BCARD-SERVER App

## Installation

Enter to the BCARD-SERVER folder

```bash
cd BCARD-SERVER
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

- isBusiness:
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
        -- required

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

- isBusiness:
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
        -- required

You will need to provide a token to get an answer from this api
You need to be the registered user

#### to change isBusiness status

```http
  PATCH /api/users/:id
```

- must provide token
  \*\* must be registered user

You will need to provide a token to get an answer from this api

#### to delete a user

```http
  DELETE /api/users/:id
```

- must provide token
  \*\* must be registered user or admin

You will need to provide a token to get an answer from this api

## Card Routes

#### To receive all business cards

```http
  GET /api/cards
```

#### To receive all business cards of the registered user

```http
  GET /api/cards/my-cards
```

- must provide token
- must be the registered user
  You will need to provide a token to get an answer from this api

#### To get a business card of a specific business

```http
  GET /api/cards/:id
```

#### To create a new business card

```http
  POST /api/cards
```

request:

- must provide token
  \*\* must registered as business user

* title:
  -- string
  -- required
  -- min 2
  -- max 256
* subTitle:
  -- string
  -- required
  -- min 2
  -- max 256
* description:
  -- string
  -- required
  -- min 2
  -- max 1024
* phone:
  -- string
  -- required
  -- min 9
  -- max 14
* email:
  -- string
  -- required
  -- must be email
  -- min 6
  -- max 256
* web:
  // link to website of the buissness
  -- string
  -- min 5
  -- max 255

* image:
  -- object :

  - url:
    -- string
  - alt:
    -- string
    -- min 2
    -- max 256
    -- required

* address:
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

  You will need to provide a token to get an answer from this api

#### To update a business card

```http
  PUT /api/cards/:id
```

request:

- must provide token
  \*\* must registered as business user who create the card

* title:
  -- string
  -- required
  -- min 2
  -- max 256
* subTitle:
  -- string
  -- required
  -- min 2
  -- max 256
* description:
  -- string
  -- required
  -- min 2
  -- max 1024
* phone:
  -- string
  -- required
  -- min 9
  -- max 14
* email:
  -- string
  -- required
  -- must be email
  -- min 6
  -- max 256
* web:
  // link to website of the buissness
  -- string
  -- min 5
  -- max 255

* image:
  -- object :

  - url:
    -- string
  - alt:
    -- string
    -- min 2
    -- max 256
    -- required

* address:
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

    You will need to provide a token to get an answer from this api

#### To update card like

```http
	PATCH /api/cards/:id
```

- must provide token
- must be registered user

#### To delete a business card

```http
  DELETE /api/cards/:id
```

- must provide token
  \*\* must registered as business user who created the card or admin
  You will need to provide a token to get an answer from this api

## Admin Routes

### To update a biznumber card

```http
  PUT /api/admin/:biznumber
```

- must be admin
