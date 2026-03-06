const authController = {
    login: async (req, res) => {
        try{    
            const { email, senha } = req.body;
            const { token, refreshToken } = await authServices.login(email, senha);
            res.cookie('refreshToken', refreshToken, {
                httpOnly: true,
                expires: 60 * 60 * 24 * 7 * 1000,
                secure: true,

            })  
            res.status(200).json({token: token});
        
        }catch(error){
            res.status(400).body({
                mensagem: error.message
            })
        }
    }
}

export default authController