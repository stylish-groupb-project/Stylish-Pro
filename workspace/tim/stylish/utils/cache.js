const Redis = require('ioredis');
const client = new Redis();

module.exports = {
    /**
     * Get cache from redis
     * @param {string} key 
     * @returns {string || null}
     */
    getCacheByKey: async (key) => {
        try {
            const value = await client.get(key);
            if (value) return JSON.parse(value);
            return null;
        } catch (err) {
            console.log(err);
            throw (err);
        };
    },
    /**
     * Update/Add cache in redis
     * @param {string} key 
     * @param {string} value 
     * @returns 
     */
    updateCache: async(key, value)=>{
        try{
            const transaction = await client.multi();
            transaction.set(key, JSON.stringify(value));
            transaction.expire(key, 60 * 60 * 24);
            await transaction.exec();
            return null;
        }catch(err){
            console.log(err);
            throw (err);
        };
    }


}
