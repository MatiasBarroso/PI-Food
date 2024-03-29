const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const recipes = require("./recipes");
const recipe = require("./recipe");
const diets = require("./diets");

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use("/recipes", recipes);
router.use("/recipe", recipe);
router.use("/diets", diets);

module.exports = router;
