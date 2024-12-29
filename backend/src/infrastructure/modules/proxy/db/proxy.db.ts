
import { ProxyEntity } from 'core/entities/proxy/proxy.entity'
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity('proxy')
export class ProxyDB implements ProxyEntity {
    @PrimaryGeneratedColumn('uuid')
    id!: string


    @Column({
        type: 'varchar',
        length: 255,
        unique: true,
        nullable: false
    })
    login!: string

    @Column({
        type: 'varchar',
        length: 255,
        nullable: false
    })
    password!: string

    @Column({
        type: 'timestamp',
        nullable: false,
    })
    createdAt!: Date

    @Column({
        type: 'boolean',
        nullable: false,
        default: true
    })
    avail!: boolean
}