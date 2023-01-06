// métodos: index, show, update, store, destroy
/*
 index: Listagem de sessões
 store: Criar uma nova sessão
 show: Listar uma única sessão
 update: Atualizar uma sessão
 destroy: Deletar uma sessão 
 */

import User from '../models/User';
import * as Yup from 'yup';

class SessionController {

    async index(req, res) {

        return res.json(await User.find());

    }

    async store(req, res) {
        const schema = Yup.object().shape({
            email: Yup.string().email().required(),
        });

        const { email } = req.body;

        if(!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: 'Falha na validação.' })
        }

        let user = await User.findOne({ email });

        if (!user) {
            user = await User.create({ email });
        }

        return res.json(user);
    }

}

export default new SessionController();