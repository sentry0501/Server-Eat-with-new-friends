export default interface IRestaurant {
  id: string
  name: string
  description: string
  address: string
  roleCode: number
  avatarUri: string
  coverUri: string
  isActive: boolean
  account: string
  hashPassword: string
}