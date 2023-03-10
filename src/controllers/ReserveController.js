import Reserve from '../models/Reserve';
import User from '../models/User';
import House from '../models/House';

class ReserveController {

    async index(req, res) {

        const { user_id } = req.headers;

        const reserve = await Reserve.find({ user: user_id }).populate('house');

        return res.json(reserve);

    }

    async store(req, res) {

        const { user_id } = req.headers;
        const { house_id } = req.params;
        const { date } = req.body;

        const house = await House.findById(house_id);
        if (!house) {
            return res.status(400).json({ Error: "Essa casa não existe!" });
        }

        if (house.status !== true) {
            return res.status(400).json({ Error: "Solicitação indisponível!" });
        }

        const user = await User.findById(user_id);
        if (String(user._id) === String(house.user)) {
            return res.status(401).json({ Error: "Não autorizado!" });
        }

        const reserve = await Reserve.create({
            user: user_id,
            house: house_id,
            date
        });

        await reserve.populate('user');
        await reserve.populate('house');

        return res.json(reserve);
    }

    async destroy(req, res) {

        const { reserve_id } = req.body;
        const { user_id } = req.headers;

        const user = await User.findById(user_id);
        const reserve = await Reserve.findById(reserve_id);

        if (String(user._id) !== String(reserve.user._id)) {
            return res.status(401).json({ Error: "Não autorizado!" });
        }

        await Reserve.findByIdAndDelete({ _id: reserve_id });

        return res.send('Reserva deletada!');

    }


}

export default new ReserveController();