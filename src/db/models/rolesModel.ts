import { Model, ModelObject } from 'objection'
import { UsersModel } from './usersModel'

export class RolesModel extends Model {
  id!: string
  userRole!: string

  static get tableName(): string {
    return 'roles'
  }

  static get relationMappings(): any {
    return {
      users: {
        relation: Model.HasManyRelation,
        modelClass: UsersModel,
        join: {
          from: 'roles.id',
          to: 'users.role_id'
        }
      }
    }
  }
}

export type Roles = ModelObject<RolesModel>
