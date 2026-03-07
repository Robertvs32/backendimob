import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

//VERIFICA SE O FORMATO DO EMAIL ESTA CORRETO - RETORNA TRUE OU FALSE
export const validaEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return regex.test(email);
}

export const gerarHash = async (senha) => {
    return await bcrypt.hash(senha, 10);
}

export const compararHash = async (senha, hashSenha) => {
    return await bcrypt.compare(senha, hashSenha);
}

export const gerarToken = (objUser) => {
    return jwt.sign(objUser, process.env.SECRET_KEY_TOKEN, { expiresIn: '15m'});
}

export const gerarRefreshToken = (objUser) => {
    return jwt.sign(objUser, process.env.SECRET_KEY_REFRESHTOKEN, { expiresIn: '1d'});
}