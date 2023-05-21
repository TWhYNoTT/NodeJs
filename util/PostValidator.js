const Ajv = require("ajv");
const ajv = new Ajv();

const schema = {
    "type": "object",
    "properties": {
        "header": {
            "type": "string",
            "minLength": 1
        },
        "body": {
            "type": "string",
            "minLength": 1
        },
        "image": {
            "type": "string",

        }

    },
    "required": ["body", "header"]
}





module.exports = ajv.compile(schema)