const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());

const APP_PORT = 4003;

app.post('/events', async (req, res) => {
    const { type, data } = req.body;
    if (type === 'CommentCreated') {
        const contentToCompare = data.content.toLowerCase();
        const status = contentToCompare.includes('orange') ? 'rejected' : 'approved';
        await axios.post('http://localhost:4005/events', { // event bus at 4005
            type: 'CommentModerated',
            data: {
                id: data.id,
                postId: data.postId,
                status,
                content: data.content,
            },
        });
    }
    res.send({});
});

app.listen(APP_PORT, () => {
    console.log(`Listening on port ${APP_PORT}`);
});
