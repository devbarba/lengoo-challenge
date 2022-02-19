import {
    Entity,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    ObjectIdColumn,
    ObjectID,
} from 'typeorm';

@Entity('users')
class User {
    @ObjectIdColumn()
    _id: ObjectID;

    @Column()
    name: string;

    @Column({ unique: true })
    email: string;

    @Column()
    role: 'Client' | 'Admin' | string;

    @Column()
    active: boolean;

    @Column()
    password: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    toJSON() {
        // @ts-ignore
        delete this.password;
        return this;
    }
}

export default User;
