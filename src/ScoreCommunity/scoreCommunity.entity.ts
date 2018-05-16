import {Entity, PrimaryGeneratedColumn, CreateDateColumn, Column} from "typeorm";

@Entity()
export class ScoreCommunityEntity {
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    communityId:number;

    @CreateDateColumn()
    createDate:any;

    @Column('jsonb')
    score:any;
}