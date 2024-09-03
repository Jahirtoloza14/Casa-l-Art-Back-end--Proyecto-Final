import { faker } from "@faker-js/faker";
import { Reservation } from "../../models/Reservation";
import { Factory } from "./Factory";

export class ReservationFactory extends Factory<Reservation> {
    protected generate(): Reservation {
        return {
            Name: faker.person.firstName(),
            last_name: faker.person.lastName(),
            Menu: faker.helpers.arrayElement([
                "Menu 1",
                "Menu Arroces",

            ]),
            date: faker.date.future(),
            table: faker.number.int({min:1, max: 30}),
            user_id: faker.number.int({min:1, max:100}),
            Comensales: faker.number.int({min:1, max:100}),
            Carta: faker.helpers.arrayElement([
                "producto 1",
                "producto 2",
                "producto 3"


            ])
        } as Reservation

    }
}