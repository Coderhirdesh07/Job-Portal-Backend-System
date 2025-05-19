const express = require('express');
const app = express();
const cookie = require('cookie-parser');
const cors = require('cors');
const candidateRoutes  = require('./routes/candidate.routes.js');

app.use(express.json);
app.use(cors);
app.use(cookie);

app.use('/api/v1/canidate',candidateRoutes);
app.use('/api/v1/recruiter',recruiterRoutes);


module.exports = app;