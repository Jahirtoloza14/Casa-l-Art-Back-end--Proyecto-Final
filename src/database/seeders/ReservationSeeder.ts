import { SeederConfig } from "../../config/seeders";
import { ReservationFactory } from "../factories/ReservationsFactory";
import { Seeder } from "./Seeder";
import { getRandomValueFromArray } from "../../helpers/commons";
import { Reservation } from "../../models/Reservation";
import { User } from "../../models/User";



export class AppointmentSeeder extends Seeder {
    protected async generate(): Promise<void> {
      
        const { APPOINTMENTS } = SeederConfig;



        const users = await User.find();
        const jobdates = new ReservationFactory().createMany(APPOINTMENTS);
        jobdates.forEach(appointment => {
            appointment.users = getRandomValueFromArray(users);
        })
        await Reservation.save(jobdates);
    }
}