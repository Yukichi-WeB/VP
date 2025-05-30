const express = require('express');
const { execSync } = require('child_process');
const router = express.Router();

router.post('/connect', (req, res) => {
    try {
        const privateKey = execSync('wg genkey').toString().trim();

        const publicKey = execSync(`echo "${privateKey}" | wg pubkey`).toString().trim();

        const ip = `10.66.66.${Math.floor(Math.random() * 200 + 2)}`;

        const serverIP = '123.45.67.89';
        const endpoint = `${serverIP}:51820`;

        res.json({
            ip,
            serverIP,
            endpoint,
            publicKey,
            privateKey
        });
    } catch (err) {
        console.error('Key generation error:', err);
        res.status(500).json({ error: 'Key generation failed' });
    }
});

module.exports = router;
