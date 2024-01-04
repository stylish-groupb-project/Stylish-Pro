const Redis = require("ioredis");
require("dotenv").config();
// const client = new Redis(6379, process.env.REDIS_HOST);
const client = new Redis({
  port: 6379,
  host: process.env.REDIS_HOST,
});

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
    },
    /**
     * Add an element to a Redis list (queue)
     * @param {string} listKey The key of the list
     * @param {any} value The value to add
     */
    addToList: async (listKey, value) => {
        try {
            await client.rpush(listKey,value);
        } catch (err) {
            console.log(err);
            throw err;
        }
    },
    /**
     * Check if a specific socket ID is in the list
     * @param {string} listKey The key of the list
     * @param {string} socketId The socket ID to check
     * @returns {boolean}
     */
    isSocketIdInList: async (listKey, socketId) => {
        try {
            const list = await client.lrange(listKey, 0, -1);
            return list.includes(socketId);
        } catch (err) {
            console.log(err);
            throw err;
        }
    },
    getAllElementsFromList: async (listKey) => {
        try {
            return await client.lrange(listKey, 0, -1);
        } catch (err) {
            console.log(err);
            throw err;
        }
    },
    deleteCacheByKey: async (key) => {
        try {
            await client.del(key);
        } catch (err) {
            console.log(err);
            throw err;
        }
    },
    removeFromList: async (listKey, value) => {
        try {
            await client.lrem(listKey, 0, value);
        } catch (err) {
            console.log(err);
            throw err;
        }
    },
   /**
    * Call Lua script
    * @param {string} script
    * @param {number} numKeys
    * @param {...string} args
    * @returns
    */
   evalScript: async (script, numKeys, ...args) => {
     try {
       const result = await client.eval(script, numKeys, ...args);
 
       return result;
     } catch (err) {
       console.log(err);
       throw err;
     }
   }
    
  
  
};
