module.exports = {
    inputEmpty: (res) => {
        res.status(400).json({ error: 'Client error - Input feild (images?) should not be empty' });
    },
    query: (res) => {
        res.status(500).json({ error: 'Server error - query failed' });
    },
    noToken: (res)=>{
        res.status(401).json({ error: 'Client error - No token provided' });
    },
    wrongToken: (res) => {
        res.status(403).json({ error: 'Client error - Invalid token' });
    }
}