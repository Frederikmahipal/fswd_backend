import jwt from 'jsonwebtoken';

const authJwt = (req, res, next) => {
   const token = req.cookies.token;
 
   if (!token) {
     next();
   } else {
     try {
       const decoded = jwt.verify(token, process.env.JWT_SECRET);
       req.user = decoded;
       next();
     } catch (err) {
       console.error('Verification Error:', err); 
       res.clearCookie('token');
       next();
     }
   }
 };

export default authJwt;