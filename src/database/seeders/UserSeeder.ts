import { SeederConfig } from "../../config/seeders";
import { UserRoles } from "../../constants/Roles";
import { User } from "../../models/User";
import { userFactory } from "../factories/UserFactory";
import { Seeder } from "./Seeder";



export class UserSeeder extends Seeder {
   protected async generate(): Promise<void> {
      const { ADMINS, CLIENTS } = SeederConfig;

      const usersFactory = new userFactory();

      // admins
      const adminUsers = usersFactory.createMany(ADMINS);
      adminUsers.forEach((user) => {
         user.role = UserRoles.ADMIN;
      });

      // clients
      
      // save to database
      const allUsers = [...adminUsers];
      await User.save(allUsers);
   }
}