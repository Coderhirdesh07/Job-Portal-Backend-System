
async function requiredRole(role){
    return async (request,response,next) =>{
            try{
                if(!request.user){
                    return response.status(401).json({ message: "Not authenticated" });
                }
                if(request.user.role !== role){
                    return response.status(403).json({ message: `Access denied for role: ${req.user.role}` });
                }
                next();
            }
            catch(error){
                console.log(error);
                return response.status(500).json({ message: "Internal server error" });
            }
    }
}

module.exports = requiredRole;