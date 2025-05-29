// MINI_PROJECT/server/api/wireguard.js
const express = require('express');
const { execSync } = require('child_process');
const router = express.Router();

router.post('/connect', (req, res) => {
    try {
        // Generate private key
        const privateKey = execSync('wg genkey').toString().trim();

        // Generate public key from private key
        const publicKey = execSync(`echo "${privateKey}" | wg pubkey`).toString().trim();

        const ip = `10.66.66.${Math.floor(Math.random() * 200 + 2)}`;

        // Simulate server IP (you'll use actual public IP in deployment)
        const serverIP = '123.45.67.89';
        const endpoint = `${serverIP}:51820`;

        res.json({
            ip,
            serverIP,
            endpoint,
            publicKey,
            privateKey // In production, NEVER send this!
        });
    } catch (err) {
        console.error('Key generation error:', err);
        res.status(500).json({ error: 'Key generation failed' });
    }
});

module.exports = router;
