# USKUDAR-ESKS

This project aims to digitise the operations carried out in the SKS department of universities.

- **Progression:**
    - Frontend %1
    - Backend %95## Tech Stack

**Client:** React, Redux, TailwindCSS

**Server:** Node, Express, MongoDB
## API Reference

#### Register

```http
  POST /api/users
```

| Parameter   | Type     | Description                       |
| :--------   | :------- | :-------------------------------- |
| `firstName` | `string` | **Required**                      |
| `lastName`  | `string` | **Required**                      |
| `email`     | `string` | **Required**                      |
| `password`  | `string` | **Required**                      |

#### Authenticate

```http
  POST /auth
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `email`   | `string` | **Required**               |
| `password`| `string` | **Required**               |

#### For more information, please see the [postman collection](https://github.com/sequester0/uskudar-esks/blob/master/uskudar-esks.postman_collection.json).
