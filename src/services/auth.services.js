import { compararHash, gerarRefreshToken, validaEmail, gerarToken, gerarHash } from '../utils/authUtils.js';
import { authModels } from '../models/auth.models.js';

const authServices = {

    login: async (email, senha) => {
        if(!validaEmail(email)){
            throw new Error('Formato do email invalido!');
        }

        const objUser = await authModels.verificaEmail(email);

        if(!objUser){
            throw new Error('Verifique email e senha!');
        }

        const resultadoHash = await compararHash(senha, objUser.password_hash);

        if(!resultadoHash){
            throw new Error('Verifique email e senha!');
        }

        const token = gerarToken(objUser);
        const refreshToken = gerarRefreshToken({
            id: objUser.id,
            id_empresa: objUser.id_empresa
        })

        return {
            token,
            refreshToken
        }
    },

    register: async (id_empresa, nome, email, password, roles) => {
        if(!validaEmail(email)){
            throw new Error('Formato do email invalido!');
        }

        const passwordHash = await gerarHash(password);

        await authModels.register(id_empresa, nome, email, passwordHash, roles);
    }

}

export default authServices;