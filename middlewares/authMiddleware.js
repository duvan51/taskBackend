import jwt from 'jsonwebtoken';


const verifyToken = (req, res, next)=>{
  // 1. Obtener el encabezado de autorización
  const authHeader = req.headers['authorization']; // Corrección aquí (headers con 's')
  
  console.log('Authorization Header:', authHeader); // Para depurar

  // 2. Verificar si el encabezado existe y está en el formato correcto
  if (!authHeader) {
    return res.status(403).json({ message: 'Token no proporcionado' });
  }

  // 3. Extraer el token del encabezado (después de 'Bearer ')
  const tokenParts = authHeader.split(' '); // Separar por espacio

  // 4. Verificar que el token esté en el formato correcto ('Bearer <token>')
  if (tokenParts[0] !== 'Bearer' || !tokenParts[1]) {
    return res.status(403).json({ message: 'Formato de token incorrecto' });
  }

  const token = tokenParts[1]; // El verdadero token después de 'Bearer'
  console.log('Token:', token); // Para depurar

  // 5. Verificar y decodificar el token
  jwt.verify(token, 's5h9$Lk29jP2!7Dszm2?GdL8wT4N&XJ@', (err, decoded) => {
    if (err) {
      // Si el token no es válido o ha expirado, devolver un error 401
      return res.status(401).json({ message: 'Token inválido o ha expirado' });
    }

    // 6. Si el token es válido, añadir la información del usuario decodificado a la solicitud
    req.user = decoded;

    // 7. Continuar con el siguiente middleware o controlador
    next();
  });
};
export default verifyToken;