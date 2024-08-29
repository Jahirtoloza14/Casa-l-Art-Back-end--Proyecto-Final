import { RoleSeeder } from "./RoleSeeder";


(async () => {
    console.log('starting seeding')
    await new RoleSeeder().start();
})()