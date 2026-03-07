import authServices from "../services/auth.services.js";

const authController = {

    login: async (req, res) => {
        try{
            const { email, senha } = req.body;
            const { token, refreshToken } = await authServices.login(email, senha);

            res.cookie('refreshToken', refreshToken, {
                httpOnly: true,
                secure: false, //TRUE HTTPS - FALSE HTTP
                sameSite: 'lax', //ATAQUE CSRF
                maxAge: 60 * 60 * 24 * 1000 //UM DIA
            })

            res.status(200).json({ token });

        }catch(error){
            res.status(400).json({mensagem: error.message})
        }
    },

    register: async (req, res) => {
        try{
            const { id_empresa, nome, email, password, roles } = req.body;
            await authServices.register(id_empresa, nome, email, password, roles);

            res.status(200).json({ mensagem: 'usuario cadastrado com sucesso!' });

        }catch(error){
            res.status(400).json({ mensagem: error?.message ?? 'Erro ao cadastrar usuario!' });
        }
    },

    logout: async (req, res) => {
        try{
            res.clearCookie('refreshToken', {
                httpOnly: true,
                secure: false,
                sameSite: 'lax'
            })

            res.status(200).json({ mensagem: 'usuario deslogado!' });

        }catch(error){
            res.status(400).json({ mensagem: error?.message ?? 'Erro ao deslogar usuario!' });
        }
    }

}

export default authController;