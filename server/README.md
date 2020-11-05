# Shoutout Bot Server

## Pre-Installation Requirements:
If you do not have Homebrew and/or PostgreSQL installed on your machine
- Install Hombrew: `/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install.sh)"`
- Install Postgres: `brew install postgresql`
- Start Postgres: `brew services start postgresql`
- Add database in Postgres: 
  - `psql`
  - `CREATE DATABASE shoutoutapp;`
  - `q`
- If you would like a client for PostgreSQL, download: `https://eggerapps.at/postico/`
  - Create a new favorite
  - At the prompts, fill in (do not change Host, User or Port):
      - Nickname: `shoutoutapp`
      - Database: `shoutoutapp`
  - Click connect
---

## Installation Steps:
- Clone this repo: ```https://github.com/broxburyTechtonic/techtonic_slack_shoutout_bot.git```
- Install dependencies: ```npm install```
- Start Local Host 8081: ```npm start```
- Seed Database: ```npm run reseed```

---

## Developers
[Brian Roxbury](https://github.com/broxburyTechtonic)

[Elliot Mackinnon](https://github.com/emackinnonTechtonic)

[Travis Gee](https://github.com/tgeeTechtonic)

---

## Base URL

`http://localhost:8081/api`

---

## ***GET ENDPOINTS***

### Shoutouts

- `GET /api/recents`

  - > Gets the last 5 shoutouts added into the database 
  - > **Example Response**
    ```
    [
        {
            "date": "2020-12-31",
            "message": "Thank you for reviewing my PR.",
            "channel_name": "general",
            "shouter": "Heather",
            "shoutee": "Ash",
            "company_value": "Do The Right Thing",
            "shoutout_id": 8,
            "shouter_id": 4,
            "shoutee_id": 5
        },
      ...
    ]
    ```
- `GET /api/shoutouts`

  - > Gets ***all*** of the shoutouts in the database
  - > **Example Response**
    ```
      [
        {
        "date": "2020-12-31",
        "message": "Thank you for reviweing my PR.",
        "channel_name": "general",
        "shouter": "Ash",
        "shoutee": "Chris",
        "company_value": "Changing Lives",
        "shoutout_id": 3,
        "shouter_id": 9,
        "shoutee_id": 6
        },
        ...
      ]
    ```
- `GET /api/reports/monthly?type=shoutee&year=2020&month=12`

  - > Gets a list of users for a specific month, ranked by number of shoutouts given / received
  - > ***REQUIRED QUERY PARAMETERS***:
    - `type`: Will either be `shoutee` or `shouter`
    - `year`: Ex. `2020`
    - `month`: In numeric form, Ex. `1`, `12`, etc.
  - > **Example Response**
    ```
      [
        {
        "name": "Steve",
        "num_shoutouts": 7,
        "rank": 1
        },
        ...
      ]
    ```
- `GET /api/shouts/user/:userId?type=shoutee&days=30`

  - > Gets a list of a specific users shoutouts for a given period of time
  - > ***REQUIRED QUERY PARAMETERS***:
    - `userId`: The id of the user
    - `type`: Will either be `shoutee` or `shouter`
  - > ***OPTIONAL QUERY PARAMETERS***:
    - `By default, if no parameter is given, only the last 30 days will be returned`
    - `days`: The number of previous days to get data for, Ex. `30`, `60`, etc.
  - > **Example Response**
    ```
      [
        {
        "date": "2020-12-31",
        "message": "Thank you for reviweing my PR.",
        "channel_name": "general",
        "shouter": "Jonathan",
        "shoutee": "Heater",
        "company_value": "Has Heart",
        "shoutout_id": 11,
        "shouter_id": 2,
        "shoutee_id": 7
        },
        ...
      ]
    ```

---

### Users

- `GET /api/all-users`

  - > Gets a list of all users in the database, their slack handle, along with their total shoutouts given and received
  - > **Example Response**
    ```
      [
        {
        "id": 2,
        "first_name": "John",
        "last_name": "Doe",
        "num_shoutouts_given": 12,
        "num_shoutouts_received": 18,
        "slack_handle": "john_doe"
        },
        ...
      ]
    ```

---

## ***PUT ENDPOINTS***

### Values

- `GET /api/update-value`

  - > Updates a specific Company Value in the database with a new description
  - > **Example Request**
    ```
      {
        "value": "Be The Change",
        "description": "The status quo is meant to be challenged."
      }
    ```
  - > **Example Response**
    ```
      {
        "id": 1
      }
    ```

