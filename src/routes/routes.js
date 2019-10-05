import express from 'express';
import countryRoutes from "./country.route";
import projectRoutes from "./project.route";

const router = express.Router();

router.use('/country', countryRoutes);
router.use('/project', projectRoutes);

export default router;