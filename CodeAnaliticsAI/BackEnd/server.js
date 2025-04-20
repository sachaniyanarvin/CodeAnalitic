const app = require('./src/App');
require('dotenv').config(); //! This are load Environmental Varible using a .env File.

const PORT = process.env.PORT;

//! Start The Server.
app.listen(PORT, () => {
    console.log(`Server is Running on http://localhost:${PORT}`);
});
