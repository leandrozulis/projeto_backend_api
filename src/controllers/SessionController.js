// métodos: index, show, update, store, destroy
/*
 index: Listagem de sessões
 store: Criar uma nova sessão
 show: Listar uma única sessão
 update: Atualizar uma sessão
 destroy: Deletar uma sessão 
 */

import User from '../models/User';

class SessionController {

    async store(req, res) {
        const { email } = req.body;

        let user = await User.findOne({ email });

        if(!user) {
            user = await User.create({ email }); 
        }

        return res.json(user);
    }

}

export default new SessionController();