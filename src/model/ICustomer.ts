export default interface ICustomer {
  id: string
  name: string
  birthday: Date
  address: string
  roleCode: number
  avatarUri: string
  isActive: boolean
  account: string
  hashPassword: string
}