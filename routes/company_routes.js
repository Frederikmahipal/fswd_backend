import express from 'express';
const router = express.Router();
import company from '../models/company_models.js';
import roleCheck from '../middleware/role_middleware.js';
import authJwt from '../middleware/auth.js';


router.get('/all', authJwt, roleCheck(['admin']), async (req, res) => {
    try {
        const companies = await company.find({});
        res.status(200).json(companies);
    } catch (error) {
        console.error('Error getting companies:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

router.post('/create', authJwt, roleCheck(['admin']), async (req, res) => {
    try {
        const { company_name, company_address, company_city, company_country, company_email } = req.body;

        const existingCompany = await company.findOne({ company_name });
        if (existingCompany) {
            return res.status(400).json({ message: 'Company already exists' });
        }

        const newCompany = new company({ company_name, company_address, company_city, company_country, company_email });
        await newCompany.save();

        if (!company_name || !company_address || !company_city || !company_country || !company_email) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        res.status(201).json({ message: 'Company created successfully' });
    } catch (error) {
        console.error('Error creating company:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }

});



export default router;
