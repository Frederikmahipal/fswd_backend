import express from 'express';
const router = express.Router();
import project from '../models/project_models.js';
import roleCheck from '../middleware/role_middleware.js';
import authJwt from '../middleware/auth.js';


router.post('/create', authJwt, roleCheck(['admin', 'manager']), async (req, res) => {
    try {
        const { project_name, project_description, project_start_date, project_end_date, project_manager } = req.body;

        const existingProject = await project.findOne({ project_name });
        if (existingProject) {
            return res.status(400).json({ message: 'Project already exists' });
        }

        const newProject = new project({ project_name, project_description, project_start_date, project_end_date, project_manager });
        await newProject.save();

        if (!project_name || !project_description || !project_start_date || !project_end_date || !project_manager) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        res.status(201).json({ message: 'Project created successfully' });
    } catch (error) {
        console.error('Error creating project:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});


// TODO: make so user adds selects who is added to project
router.post('/join', authJwt, roleCheck(['admin', 'manager']), async (req, res) => {
    try {
        const { project_id, user_id } = req.body;

        const existingProject = await project.findById(project_id);
        if (!existingProject) {
            return res.status(400).json({ message: 'Project not found' });
        }

        existingProject.project_team.push(user_id);
        await existingProject.save();

        res.status(200).json({ message: 'User joined project successfully' });
    } catch (error) {
        console.error('Error joining project:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

router.delete('/delete/:id', authJwt, roleCheck(['admin', 'manager']), async (req, res) => {
    try {
        const projectToDelete = await project.findById(req.params.id);
        if (!projectToDelete) {
            return res.status(400).json({ message: 'Project not found' });
        }
        await projectToDelete.remove();
        res.status(200).json({ message: 'Project deleted successfully' });
    } catch (error) {
        console.log('error deleting project:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }});

    export default router;