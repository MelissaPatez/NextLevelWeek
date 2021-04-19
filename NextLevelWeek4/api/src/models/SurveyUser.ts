import { Column, CreateDateColumn, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryColumn } from "typeorm";
import { v4 as uuid } from "uuid";
import { Suvery } from "./Survey";
import { User } from "./User";

@Entity("surveys_users")
class SuveryUser {
    @PrimaryColumn()
    readonly id: string;

    @Column()
    user_id: string

    @ManyToOne(() => User)
    @JoinColumn({name:"user_id"})
    user: User

    @Column()
    survey_id: string

    @ManyToOne(() => Suvery)
    @JoinColumn({name:"survey_id"})
    survey: Suvery
   

    @Column()
    value: number

    @CreateDateColumn()
    created_at: Date

    constructor () {
        if(!this.id) {
            this.id = uuid();
        }
    }

}
export { SuveryUser }