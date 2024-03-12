import { fakerDA as faker } from '@faker-js/faker';
import User from '../../models/user_models.js';
import Company from '../../models/company_models.js'; 
import bcryptjs from 'bcryptjs';

export async function seedUsers() {
    const users = [];
    for (let i = 0; i < 10; i++) {
        const email = faker.internet.email();
        const domain = email.split('@')[1].trim();
        const company = await Company.findOne({ company_email: { $regex: new RegExp(domain, 'i') } }); 

        const password = faker.internet.password();
        const hashedPassword = await bcryptjs.hash(password, 10);

        const user = new User({
            email,
            password: hashedPassword, 
            firstName: faker.person.firstName(),
            lastName: faker.person.lastName(),
            role: 'employee',
        });
        await user.save();

        if (company) {
            company.employees.push(user._id); 
            await company.save(); 
        }

        users.push(user);
    }
    const admin = new User({
        email: 'admin@admin.com',
        password: await bcryptjs.hash('123', 10),
        firstName: 'Admin',
        lastName: 'Admin',
        role: 'admin',
    });
    await admin.save();
    console.log(users);
    return users;
}

