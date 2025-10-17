## Solar System API

This project was originally built as part of a #DearJuniorDev Hackahon, in which each team had a week to build a web app that teaches about the solar system.

You can see & access this api here: <https://solar-system-api-fc8bdf204aa5.herokuapp.com>.

### Front End

You can find the front end repository here: 
- <https://github.com/tungolra/solar-system-hackathon>

## Project Team Members:

- Matthew Simpson (hey, that's me!)
- Ralph Tuñgol - <https://github.com/tungolra>
- Nikhil Koganti - <https://github.com/Nikhil-Koganti>

## Tech Stack

This project was created with:

- Node.js
- Express.js
- MySQL
- Knex.js
- JSON

## API Details

##### API Base URL

```
https://solar-system-hackathon-backend.herokuapp.com
```

##### Solar System Details Endpoint

```
GET /stellar
```

Returns an obect with star details and arrays of planet and moon details. Planets are sorted by their perihelion (closest distance to the sun), moons are sorted by their planet and perihelion.

```
{
    star: [{
        "star_id": string,
        "englishName": string,
        "meanRadius": int, mean radius distance in km,
      }],
    planets: [{
        "planet_id": string,
        "englishName": string,
        "meanRadius": float, mean radius in km,
        "bodyType": enum, "Planet" || "Dwarf Planet",
        "planetType": enum, "Terrestrial" || "Gas Giant" || "Ice Giant" || "Dwarf",
        "star_id": "sol" <- this will always be sol, as we only have the one star
      },],
    moons: [{
        "moon_id": string,
        "englishName": string,
        "meanRadius": float, mean radius in km
        "planet_id": string, the planet this moon orbits,
        "planetEnglishName": string, the name of the planet this moon orbits
    }]
}
```

---

**Alter Sorting**:

```
GET /stellar?sortColum=columnName
```

Sorting results can be altered for this endpoint. Moons will always be sorted first by their planet, then by the secondary column. Available columns are:

| columnName    | Description.                         |
| :------------ | :----------------------------------- |
| `englishName` | The `englishName` of the body        |
| `meanRadius`  | The `meanRadius` of the stellar body |

##### Star Endpoint:

```
GET /stellar/star
```

Returns an object with the following details.

```
 {
    "star_id": string,
    "englishName": string,
    "massValue": value in 10^n kg,
    "massExponent": n value for massValue,
    "meanRadius": int, mean radius distance in km,
}
```

##### Planets Endpoints

```
GET /stellar/planets
```

Returns an array of all twelve planets with the following details:

```
[{
    "planet_id": string, the id of the planet,
    "englishName": string, the name of the planet,
    "meanRadius": float, radius in km,
    "bodyType": enum, "Dwarf Planet" || "Planet",
    "planetType": enum, "Terrestrial" || "Gas Giant" || "Ice Giant" || "Dwarf",
    "star_id": "sol", <- this will always be 'Sol', as we only have one star
}]
```

---

```
GET /stellar/planets/dwarf
```

Returns an array of the four _dwarf planets_ with the same details as above.

---

```
GET /stellar/planets/planet
```

Returns an array of the eight _planets_ with the same details as above.

---

**Alter Sorting:**

Sorting options can be altered for these endpoints using a `req.query`.

```
GET /stellar/planets?sortColumn=columnName
GET /stellar/planets/dwarf?sortColumn=columnName
GET /stellar/planets/planet?sortColumn=columnName
```

| columnName    | Description.                         |
| :------------ | :----------------------------------- |
| `englishName` | The `englishName` of the body        |
| `meanRadius`  | The `meanRadius` of the stellar body |

---

```
GET /stellar/planet/:planet_id
```

| Parameter   | Type     | Description                         |
| :---------- | :------- | :---------------------------------- |
| `planet_id` | `string` | **Required**. Id of planet to fetch |

Returns an object with the following details about the specified `:planet_id`.

```
 {
    "planet_id": "eris",
    "englishName": "136199 Eris",
    "perihelion": furthest distance from the sun in km,
    "aphelion": neraest distance from the sun in km,
    "inclination": float, angle in degress of the orbit compared to earths,
    "massValue": value in 10^n kg,
    "massExponent": n value for massValue,
    "gravity": float, gravity measured in m/s^2
    "meanRadius": float, mean radius in km,
    "sideralRotation": float, time to rotate fully, in hours,
    "sideralOrbit": float, time to orbit the sun in days,
    "discoveredBy": string, the name(s) of this planets discoverers
    "discoveryDate": string, the date of this planets discovery
    "bodyType": enum (returns as string), "Planet" || "Dwarf Planet",
    "planetType": enum, "Terrestrial" || "Gas Giant" || "Ice Giant" || "Dwarf",
    "star_id": "sol" <- this will always be sol, as we only have the one star
}
```

##### Moons Endpoints

```
GET /stellar/moons
```

Returns a list of all the moons that orbit planets in the system, sorted by their perihelion (nearest extent to the planet they orbit) with the following details:

```
[{
    "moon_id": string,
    "englishName": string,
    "meanRadius": int, mean radius distance in km,
    "planet_id": string, the planet this moon orbits,
    "planetEnglishName": string, the name of the planet this moon orbits

 },]
```

**Alter Sorting:**

Sorting options can be altered for these endpoints using a `req.query`.

```
GET /stellar/moons?sortColumn=columnName
```

| columnName    | Description.                         |
| :------------ | :----------------------------------- |
| `englishName` | The `englishName` of the body        |
| `meanRadius`  | The `meanRadius` of the stellar body |

---

```
GET /stellar/moons/:planet_id
```

| Parameter   | Type     | Description                                       |
| :---------- | :------- | :------------------------------------------------ |
| `planet_id` | `string` | **Required**. Id of planet to filter the moons by |

Returns a list of all the moons orbiting the specified `:planet_id`, with the same details as above.

**Alter Sorting:**

Sorting options can be altered for these endpoints using a `req.query`.

```
GET /stellar/moons/:planet_id?sortColumn=columnName
```

| Parameter   | Type     | Description                                       |
| :---------- | :------- | :------------------------------------------------ |
| `planet_id` | `string` | **Required**. Id of planet to filter the moons by |

| columnName    | Description.                         |
| :------------ | :----------------------------------- |
| `englishName` | The `englishName` of the body        |
| `meanRadius`  | The `meanRadius` of the stellar body |

---

```
GET /stellar/moon/:moon_id
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `moon_id` | `string` | **Required**. Id of moon to fetch |

Returns an object with the following details about the specified `:moon_id`:

```
{
    "moon_id": string, the of the moon,
    "englishName": string, the name of the moon
    "nameDetail": string, the details about the name of the moon,
    "perihelion": furthest distance from the planet in km,
    "aphelion": nearest distance from the planet in km,
    "inclination": float, angle in degress of the orbit compared to planets equator,
    "massValue": value in 10^n kg,
    "massExponent": n value for massValue,
    "gravity": float, gravity measured in m/s^2
    "meanRadius": float, mean radius in km,
    "sideralRotation": float, time to rotate fully, in hours,
    "sideralOrbit": float, time to orbit the sun in days,
    "planet_id": string, the planet_id of the planet this moon orbits,
    "planetEnglishName": string, the english name of the planet this moon orbits,
    "discoveredBy": string, the name(s) of this moons discoverers,
    "discoveryDate": string, the date the moon was discovered,
    "bodyType": "Moon" <- will always be 'Moon'
}
```

## Instructions to run locally

1. Clone this project to your computer.

`$ git clone https://github.com/matthewcsimpson/Solar-System-Hackathon-Backend`

2. Install dependencies with NPM Install

`$ npm install`

3. Create a new MySQL database on your local machine.

4. Create a `.env` file with the following keys:

```
PORT=<your port of choice here>
DATABASE_HOST=localhost
DATABASE_USER=<database username here>
DATABASE_PASSWORD=<database password here>
DATABASE_NAME=<database password here>
```

5. Migrate the database tables using KnexJS

`$ knex migrate:latest`

6. Seed the database information using KnexJS

`$ knex seed:run`

7. Spin up the project in development mode!

`$ npm run dev`

8. The project should now be running at http://localhost:PORT
