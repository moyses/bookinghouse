import Booking from '../models/Booking';
import User from '../models/User';
import House from '../models/House';

class BookingController {
  async index(req, res) {
    const { user_id } = req.headers;

    const bookings = await Booking.find({ user: user_id }).populate('house');

    return res.json(bookings);
  }

  async store(req, res) {
    const { user_id } = req.headers;
    const { house_id } = req.params;
    const { date } = req.body;

    const house = await House.findById(house_id);

    if(!house) {
      return res.status(400).json({ error: 'Essa casa não existe' });
    }

    if(house.status !== true) {
      return res.status(400).json({ error: 'Solicitação indisponível.' })
    }

    const user = await User.findById(user_id);
    
    if(String(user._id) === String(house.user)) {
      return res.status(401).json({ error: 'Não é possível fazer essa reserva.' })
    }

    const booking = await Booking.create({
      user: user_id,
      house: house_id,
      date,
    });

    await booking.populate('house').populate('user').execPopulate();

    return res.jdon(booking);
  }

  async destroy(req, res) {
    const { booking_id } = req.body;

    await Booking.findByIdAndDelete({ _id: booking_id });

    return res.send();
  }
}

export default new BookingController();