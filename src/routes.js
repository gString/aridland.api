import express from 'express';
import countryRoutes from "./countries/country.route";
import projectRoutes from "./projects/project.route";

const router = express.Router();

router.use('/country', countryRoutes);
router.use('/project', projectRoutes);

export default router;