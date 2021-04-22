import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { v4 as uuidV4 } from 'uuid';
import { User } from "./User";

@Entity("messages")
class Message {
    @PrimaryColumn()
    id: string;

    @Column()
    admin_id: string;

    @Column()
    user_id: string

    @JoinColumn({ name: "user_id"})
    @ManyToOne(() => User) //muitas menssagens para um usuario
    user: User;

    @Column()
    text: string;

    @CreateDateColumn()
    created_at: Date;

    constructor() {
        if (!this.id) this.id = uuidV4();
    }

}

export {Message}
