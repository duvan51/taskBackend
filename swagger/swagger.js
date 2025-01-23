import swaggerJsdoc from "swagger-jsdoc";


const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API Task Master",
      version: "1.0.0",
      description: "API for Tasks",
    },
    servers: [
      {
        url: "http://localhost:4000/",
        description: "Local server",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
      shemas: {
        User: {
          type: "object",
          properties: {
            id: {
              type: "integer",
              format: "int32",
              description: "ID único del usuario",
            },
            Name: {
              type: "string",
              description: "Nombre completo del usuario",
              example: "Juan Pérez",
            },
            userName: {
              type: "string",
              description: "Nombre de usuario",
              example: "juanperez",
            },
            dateBirth: {
              type: "string",
              format: "date",
              description: "Fecha de nacimiento",
              example: "1990-01-01",
            },
            whattsap: {
              type: "string",
              description: "Número de WhatsApp",
              example: "+573001234567",
            },
            identificacion: {
              type: "string",
              description: "Número de identificación del usuario",
              example: "1234567890",
            },
            email: {
              type: "string",
              format: "email",
              description: "Correo electrónico único",
              example: "juan.perez@example.com",
            },
            photo: {
              type: "string",
              description: "URL de la foto de perfil del usuario",
              example: "https://example.com/images/user.jpg",
            },
            password: {
              type: "string",
              description: "Contraseña del usuario (encriptada)",
              example: "hashed_password",
            },
          },
          required: ["Name", "whattsap", "identificacion", "email", "password"],
        },
      },
    },
  },
  apis: ["./routes/*.js"], // Rutas de archivos con anotaciones Swagger
};

const SpecificationSwagger = swaggerJsdoc(options);
// console.log(JSON.stringify(SpecificationSwagger, null, 2));
export default SpecificationSwagger;
