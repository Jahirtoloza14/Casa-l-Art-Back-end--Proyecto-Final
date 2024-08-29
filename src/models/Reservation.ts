import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, BaseEntity } from 'typeorm';
import { User } from './User';


@Entity("reservation")
export class Reservation extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    Name!: string;

    @Column()
    last_name!: string;

    @Column()
    Comensales!: string;

    @Column()
    Menu!: number;

    @Column({name: "user_id"})
    user_id!: number;

    @Column({ type: 'datetime' })
    date!: Date;

    @Column()
    table!: number;
    

    @ManyToOne(() => User, (users) => users.id)
    @JoinColumn({ name: "user_id" })
    users!: User;

    
}
