import { fakerDA as faker } from '@faker-js/faker';
import User from '../../models/user_models.js';
import Company from '../../models/company_models.js'; 

export async function seedUsers() {
    const users = [];
    for (let i = 0; i < 10; i++) {
        const email = faker.internet.email();
        const domain = email.split('@')[1].trim();
        const company = await Company.findOne({ company_email: { $regex: new RegExp(domain, 'i') } }); 

        const user = new User({
            email,
            password: faker.internet.password(),
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
    console.log(users);
    return users;
}
