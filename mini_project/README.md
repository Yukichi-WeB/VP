Setting up Wireguard:

# On The Server Side

1. Intsall wireguard using kernal: `sudo pacman install wireguard`

2. Generate public and private keys: `wg genkey | tee privatekey | wg pubkey > publickey`

3. Check for the files using `ls`

4. If you want to generate the private key use the command `cat privatekey` and copy the key

5. Now to configure server interface: 

	i) Create a new file with your favourite editor in the directory `/etc/wireguard/wg0.conf`

	ii) In the editor type:
		[Interface]
		{your private key}
		Address=10.0.0.1/8
		SaveConfig=true
		
		PostUp=iptables -A FORWARD -i wg0 -j ACCEPT; iptables -t nat -A POSTROUTING -o eth0 -j MASQUERADE;
		PostDown=iptables -D FORWARD -i wg0 -j ACCEPT; iptables -t nat -D POSTROUTING -o eth0 -j MASQUERADE;
		ListenPort=51820
		
6. Now to start the network interface:
	i) Type `wg-quick up wg0` and press enter

	ii) To check if everything was succesful type `sudo wg`....the private public keys and the listeningport should appear
	
# On The Client Side

7. Generate public and private keys: wg genkey | tee privatekey | wg pubkey > publickey

8. Check for the files using ls

9. Generate the privatekeys using cat and save it

10. Again configuring the server interface:
	i) Create a new file with your favourite editor in the directory `/etc/wireguard/wg0.conf`
	ii) In the editor type:
		[Interface]
		{your private key}
		Address=10.0.0.2/8
		SaveConfig=true
		
		[Peer]
		PublicKey={public key of the server}
		Endpoint={ip address of the server}:51820
		AllowedIPs=0.0.0.0/0 (routes all the trafic from the client to the server)
		PersistantKeepalive=30
		
11. To start the network interface:
	i) Type `wg-quick up wg0` and press enter
	ii) sudo wg to see all the files needed
	
12. Now to add the client to the server
	i) Copy the clients public key
	ii) On the server type: `sudo wg set wg0 peer {public key of the client} allowed-ips {ip of the clients tunnel interface}`