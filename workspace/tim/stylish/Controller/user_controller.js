

module.exports = {
    signUp: async(req,res)=>{
        try {
            const { name , email , password} = req.body;
            
        } catch (error) {
            console.log(error)
        }
    }

}