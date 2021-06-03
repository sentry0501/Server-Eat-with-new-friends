
import { GroupEntity } from "../../entity/groupEntity";
import CustomerItemFindDTO from "../customer/customerItemFindDTO";
// import GroupCustomerItemFindDTO from "../groupcustomer/groupCustomerItemFindDTO";
import AbstractDTO from "../abstractDTO";
import RestaurantItemFindDTO from "../restaurant/restaurantItemFindDTO";

export default class GroupJoinDTO extends AbstractDTO{
  
  public id: string
  public name: string
  public members: number
  public leader: CustomerItemFindDTO
  public restaurant: RestaurantItemFindDTO
  // public groupCustomers: GroupCustomerItemFindDTO[]

  constructor(e: GroupEntity) {
    super();
    this.id = e.id;
    this.name = e.name;
    this.restaurant = new RestaurantItemFindDTO(e.restaurant);
    this.members = e.members;
    this.leader = new CustomerItemFindDTO(e.leader);
    // this.groupCustomers = e.groupCustomers.map((e: any ) => new GroupCustomerItemFindDTO(e))
  }
}