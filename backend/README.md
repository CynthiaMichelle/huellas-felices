## Deploy

### Install dependencies  
    
    npm install

### Copy .env.example to .env and customize your variables.  

    cp .env.example .env

### Init database

    npm run installDB

## Start

To start a single instance:
    
    npm start

To start in development mode:

    npm run dev (including nodemon & debug log)
## Api
### Models
#### User
```
- name: String
- email: String
- password: String
```

#### Anuncios
```
- nombre: String
- disponible: Bolean
- edad: Date "yyyy-mm-dd"
- raza: String
- size: {Pequeño, Mediano, Grande}
- foto: String
- sexo: Bolean True-Macho Falso-Hembra
- perro: Bolean True-Perro Falso-Gato
- description: String
```

### Base Path

The API can be used with the path: 
[API](/api/anuncios)

### Error example

    {
      "ok": false,
      "error": {
        "code": 401,
        "message": "Authentication failed. Wrong password."
      }
    }

### GET /anuncios
**Result:** 

        "rows": [
            {
                "size": [
                    "Mediano"
                ],
                "_id": "64c3d10376561947887526b6",
                "nombre": "Rocky",
                "disponible": true,
                "edad": "1",
                "raza": "West Highland White Terrier",
                "foto": "\\images\\anuncios\\Westy.jpeg",
                "sexo": true,
                "perro": true,
                "descripcion": "cariñoso y con mucha energía",
                "__v": 0
            },]


