import { Request, Response } from "express";
import { Reservation } from "../models/Reservation";



// show all reservations
export const getAllReservations = async (req: Request, res: Response) => {
  try {
    const [reservations] = await Reservation.findAndCount(
      {
        select: {
          id: true,
          Name: true,
          last_name: true,
          Menu: true,
          user_id: true,
          Comensales: true,
          date: true,
          table: true,

        }
      }
    );
    res.json(reservations);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};
// update reservation
export const updateReservation = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const { Name, last_name, user_id, Menu, Comensales, table, date } = req.body;
    const reservationDate = await Reservation.findOne({ where: { id: id } });
    if (!reservationDate) {
      res.status(404).json({ message: "Reservation not found" });
      return;
    }
    reservationDate.id = id;
    reservationDate.Name = Name;
    reservationDate.last_name = last_name;
    reservationDate.Menu = Menu;
    reservationDate.Comensales = Comensales;
    reservationDate.user_id = user_id;
    reservationDate.table = table;
    reservationDate.date = date;
    await reservationDate.save();
    res.json(reservationDate);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};
// delete reservation
export const deleteReservation = async (req: Request, res: Response) => {
  try {
  
    const ReservationId= Number(req.params.id);
    const reservationDate = await Reservation.findOne({ where: { id: ReservationId} });
    if (!reservationDate) {
      res.status(404).json({ message: "reservation not found" });
      return;
    }
    await reservationDate.remove();
    res.json({ message: "reservation deleted" });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
}


// create reservation
export const ReservationController = {
  async createReservation(req: Request, res: Response): Promise<void> {
    try {
      const { id, Comensales, last_name, Name, Menu, user_id, date, table } = req.body;
      const newReservation = Reservation.create({
        id,
        Name,
        last_name,
        Menu,
        Comensales,
        user_id,
        date: new Date(date),
        table,

      });
      await Reservation.save(newReservation);
      res.status(201).json({
        message: "Reservation created successfully",
        Reservation: newReservation
      });
    } catch (error) {
      console.error('Error creating reservation:', error);
      res.status(500).json({
        message: "Error creating reservation",

      });
    }
  }
};
//Show reservation by client
export const getByLogedClient = async (req: Request, res: Response) => {
  const client = Number(req.tokenData.id);
  const Reservations = await Reservation.find({

    relations: {
      users: true,
    },
    select: {
      id: true,
      Name: true,
      last_name: true,
      Comensales: true,
      Menu: true,
      date: true,
      table: true,
    },
    where: {
      user_id: client,
    }
  });
  res.json(Reservations).status(200);

}