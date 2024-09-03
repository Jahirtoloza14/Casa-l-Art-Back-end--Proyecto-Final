import { SeederConfig } from "../../config/seeders";
import { ReservationFactory } from "../factories/ReservationsFactory";
import { Seeder } from "./Seeder";
import { getRandomValueFromArray } from "../../helpers/commons";
import { Reservation } from "../../models/Reservation";
import { User } from "../../models/User";



export class ReservationsSeeder extends Seeder {
    protected async generate(): Promise<void> {
      
        const { RESERVATIONS } = SeederConfig;



        const users = await User.find();
        const jobdates = new ReservationFactory().createMany(RESERVATIONS);
        jobdates.forEach(appointment => {
            appointment.users = getRandomValueFromArray(users);
        })
        await Reservation.save(jobdates);
    }
}