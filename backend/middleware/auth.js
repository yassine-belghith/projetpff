const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return res.status(401).json({ message: 'Non autorisé - Token manquant' });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Get user from token
    const user = await User.findById(decoded.id).select('-password');
    if (!user) {
      return res.status(401).json({ message: 'Non autorisé - Utilisateur non trouvé' });
    }
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Non autorisé - Token invalide' });
  }
};

// Middleware to check if user is admin
exports.admin = async (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    return res.status(403).json({ message: 'Non autorisé - Accès réservé à l\'administrateur' });
  }
};

// Middleware to check if user is travailleur
exports.travailleur = async (req, res, next) => {
  if (req.user && req.user.role === 'travailleur') {
    next();
  } else {
    return res.status(403).json({ message: 'Non autorisé - Accès réservé aux travailleurs' });
  }
};

// Middleware to check if user is client
exports.client = async (req, res, next) => {
  if (req.user && req.user.role === 'client') {
    next();
  } else {
    return res.status(403).json({ message: 'Non autorisé - Accès réservé aux clients' });
  }
};
