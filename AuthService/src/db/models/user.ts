import {
  Model, Column, Table
} from 'sequelize-typescript'

@Table({
  tableName: 'Users'
})
export class User extends Model {
  @Column
    username: string

  @Column
    password: string
}
