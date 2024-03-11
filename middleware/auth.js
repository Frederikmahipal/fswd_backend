import jwt from 'jsonwebtoken';

const authJwt = (req, res, next) => {
   try {
      const token = req.headers.authorization.replace("Bearer ", "");
      console.log('Received token:', token); 
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
      next();
   } catch (err) {
      console.error('Verification Error:', err); 
      return res.status(401).json({
        message: "Authentication Failed"
      });
   }
  };
  
export default authJwt;
