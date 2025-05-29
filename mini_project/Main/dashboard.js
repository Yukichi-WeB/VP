connect.addEventListener("click", async function () {
    try {
        const res = await fetch("http://localhost:3000/api/connect", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            }
        });

        const data = await res.json();

        document.getElementById("clientInfo").value = 
            `Public Key: ${data.publicKey}\nIP Address: ${data.ip}`;

        document.getElementById("serverInfo").value = 
            `Public Key: ${data.serverPublicKey}\nIP Address: ${data.serverIP}`;

        const config = `[Interface]
        PrivateKey = ${data.privateKey}
        Address = ${data.ip}
        DNS = 1.1.1.1

        [Peer]
        PublicKey = ${data.serverPublicKey}
        Endpoint = ${data.endpoint}
        AllowedIPs = 0.0.0.0/0
        PersistentKeepalive = 25`;

        document.getElementById("wgConfig").value = config;

        alert(`Connected to ${data.endpoint}!\nYour Public Key: ${data.publicKey}`);
    } catch (error) {
        console.error("Connection failed:", error);
        alert("Failed to connect.");
    }
});
