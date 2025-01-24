import dotenv from 'dotenv';

// Obtener el entorno actual (development o production)
const env = process.env.NODE_ENV || 'production';

// Cargar el archivo `.env` correspondiente al entorno
if (env === 'production') {
  dotenv.config({ path: '.env.production' });
  console.log('estamos en produccion')
} else {
  dotenv.config({ path: '.env.development' });
  console.log('estamos en desarrollo')
}


const config = {
  development: {
    username: process.env.DEV_DB_USERNAME,
    password: process.env.DEV_DB_PASSWORD,
    database: process.env.DEV_DB_NAME,
    host: process.env.DEV_DB_HOST,
    port: process.env.DEV_DB_PORT || 3306,
    dialect: 'mysql',
    dialectOptions: {
      connectTimeout: 60000,
    },
  },
  production: {
    username: process.env.PROD_DB_USERNAME,
    password: process.env.PROD_DB_PASSWORD,
    database: process.env.PROD_DB_NAME,
    host: process.env.PROD_DB_HOST,
    port: process.env.PROD_DB_PORT,
    dialect: 'mysql',
    dialectOptions: {
      connectTimeout: 60000,
    },
  },
};

//console.log(config)

export default config;






/**
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
   
 * 
 * 
 * 
 * 
 */