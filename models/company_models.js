import mongoose from "mongoose";

const companySchema = new mongoose.Schema({
    company_name: {
        type: String,
        required: true,
        trim: true,
    },
    company_address: {
        type: String,
        required: true,
        trim: true,
    },
    company_city: {
        type: String,
        required: true,
        trim: true,
    },
    company_country: {
        type: String,
        required: true,
        trim: true,
    },
    company_email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    }, 
    employees: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }]
});

const Company = mongoose.model('Company', companySchema);

export default Company;