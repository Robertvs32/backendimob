import pool from "../database/connection.js"

export const authModels = {

    verificaEmail: async (email) => {
        const sql = "SELECT id, nome, password_hash, id_empresa, roles FROM usuarios WHERE email = ?";
        const [rows] = await pool.execute(sql, [email]);

        if(rows.length != 0){
            return rows[0];
        }

        return null;
    },

    register: async (id_empresa, nome, email, passwordHash, roles) => {
        const sql = "INSERT INTO usuarios(id_empresa, nome, email, password_hash, roles) VALUES(?, ?, ?, ?, ?)"
        await pool.execute(sql, [id_empresa, nome, email, passwordHash, roles]);
    }

}