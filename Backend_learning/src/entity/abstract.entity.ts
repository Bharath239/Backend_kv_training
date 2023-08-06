import { CreateDateColumn, DeleteDateColumn,  PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { UUID } from "typeorm/driver/mongodb/bson.typings";

class AbstractEntity{
    @PrimaryGeneratedColumn()
    id: UUID;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
    
    @DeleteDateColumn()
    deletedAt: Date;
}

export default AbstractEntity;