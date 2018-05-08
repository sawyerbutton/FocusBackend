import { Entity, Column, PrimaryGeneratedColumn,OneToMany } from 'typeorm';
import {SubDomainEntity} from "../SubDomain/subDomain.entity";
import {QuestionnaireEntity} from "../../Questionnaire/questionnaire.entity";

@Entity()
export class DomainEntity {
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    domain:string;

    @OneToMany(type => SubDomainEntity,subDomain=>subDomain.domain)
    subdomain:SubDomainEntity[];

    @OneToMany(type => QuestionnaireEntity,questionnaire=>questionnaire.domain)
    questionnaire:QuestionnaireEntity[];

    @Column()
    maxScore:number;

    @Column()
    minScore:number;
}