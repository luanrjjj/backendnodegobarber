import {Entity, Column, PrimaryGeneratedColumn,CreateDateColumn,UpdateDateColumn,ManyToOne,JoinColumn} from 'typeorm';
import User from '../../../../users/infra/typeorm/entities/User';

// Criação do Appointment model

/**
 * 
 * Um par Um (OneToOne) Um usuário tem um agendamento
 * Um para Muitos (OneToMany) Um usuário tem mais de um Agendamento
 * Muitos para Muitos (ManyToMany) Se mais um prestdor de serviço pudesse participar do Serviço
 */
@Entity('appointments')
class Appointment {
    @PrimaryGeneratedColumn('uuid')
    id : string;

    @Column()
    provider_id: string;

    @ManyToOne(() => User)
    @JoinColumn({name:'provider_id'})
    provider : string;

    @Column()
    user_id: string;


    @ManyToOne(() => User)
    @JoinColumn({name:'user_id'})
    user : string;

   
  
    @Column('timestamp with time zone')
    date : Date;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at:Date;
   
   
}
export default Appointment;