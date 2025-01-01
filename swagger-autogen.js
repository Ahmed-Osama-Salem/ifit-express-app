const swaggerAutogen = require("swagger-autogen")();

const outputFile = "./swagger.json";
const endpointsFiles = ["./src/routes/*.ts"];

const config = {
  info: {
    title: "Blog API Documentation",
    description: "",
  },
  tags: [],
  host: "localhost:8000/api",
  schemes: ["http", "https"],
};

swaggerAutogen(outputFile, endpointsFiles, config);
