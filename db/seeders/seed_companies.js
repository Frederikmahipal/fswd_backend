import { fakerDA as faker } from '@faker-js/faker';
import Company from '../../models/company_models.js';

//fix emails

export async function seedCompanies(userIds) {
    const companies = [];
    for (let i = 0; i < 10; i++) {
        const company = new Company({
            company_name: faker.company.name(),
            company_address: faker.location.streetAddress(),
            company_city: faker.location.city(),
            company_country: 'Danmark',
            company_email: faker.internet.email(),
            employees: userIds // Use the passed user IDs
        });
        await company.save(); 
        companies.push(company);
    }
    console.log(companies);
    return companies;
}
