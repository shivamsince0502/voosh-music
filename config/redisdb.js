const { createClient } = require('redis');

const client = createClient({
    username: 'default',
    password: 'cw3AGaxDAPvl8RomRABLdueaojplYoYy',
    socket: {
        host: 'redis-16955.c9.us-east-1-2.ec2.redns.redis-cloud.com',
        port: 16955
    }
});

client.on('error', (err) => console.error('Redis Client Error:', err));

// Connect to Redis
(async () => {
    try {
        await client.connect();
        console.log('Connected to Redis');
    } catch (error) {
        console.error('Failed to connect to Redis:', error);
    }
})();

const addToBlacklist = async (token, expiryInSeconds) => {
    try {
        await client.set(`blacklist:${token}`, 'true', {
            EX: expiryInSeconds 
        });
        console.log(`Token blacklisted: ${token}`);
    } catch (error) {
        console.error('Error adding token to blacklist:', error);
        throw error;
    }
};

const isTokenBlacklisted = async (token) => {
    try {
        const result = await client.get(`blacklist:${token}`);
        return result === 'true'; 
    } catch (error) {
        console.error('Error checking token in blacklist:', error);
        throw error;
    }
};

module.exports = { addToBlacklist, isTokenBlacklisted };
