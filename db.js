const mongoose = require('mongoose')
const dotenv = require('dotenv')

dotenv.config()

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true 
}, (error) => {
    if (error) {
        throw error
    }
    console.log('connected')
});
