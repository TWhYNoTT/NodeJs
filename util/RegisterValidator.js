const Ajv = require("ajv");
const ajv = new Ajv();

const schema = {
    "type": "object",
    "properties": {
        "firstName": {
            "type": "string",

            "minLength": 3
        },
        "lastName": {
            "type": "string",

            "minLength": 3
        },
        "email": {
            "type": "string",
            "pattern": ".+\@.+\..+",
        },
        "password": {
            "type": "string",
            "pattern": "^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+-=[\\]{}|;':\",./<>?]).{8,}$"
        }
    },
    "required": ["firstName", "lastName", "email", "password"]
}





module.exports = ajv.compile(schema)