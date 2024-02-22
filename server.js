const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const dotenv = require('dotenv');

const path = require('path');

// Private ENV
dotenv.config({ path: './config/config.env' });


// Connect to DB
connectDB();

const app = express();



// Middleware
app.use(express.json({ extended: true }));

//CORS
app.use(cors());


// Router
app.use('/register', require('./routes/register'));
app.use('/auth', require('./routes/auth'));
app.use('/guests', require('./routes/guests'));

// Serve static assests if in production
if(process.env.NODE_ENV === 'production') {
	// Set static folder
	app.use(express.static('client/build'));
	app.get('/*', (req, res) => {
		res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
	});
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started at port ${PORT}`));