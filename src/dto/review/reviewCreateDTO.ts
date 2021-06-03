import serverConfig from "../../config/serverConfig";
import ERR_CODE from "../../const/error";
import { RestaurantEntity } from "../../entity/restaurantEntity";
import { ReviewEntity } from "../../entity/reviewEntity";
import AbstractDTO from "../abstractDTO";
import CustomerItemFindDTO from "../customer/customerItemFindDTO";
import GroupJoinDTO from "../group/groupJoinDTO";
import RestaurantItemFindDTO from "../restaurant/restaurantItemFindDTO";

export default class ReviewCreateDTO extends AbstractDTO{
  
  public id: string
  public date: Date
  public customer: CustomerItemFindDTO
  public content: string
  public star: number
  public restaurant: RestaurantItemFindDTO

  constructor(e: ReviewEntity) {
    super();
    this.id = e.id;
    this.date = e.date;
    this.customer = new CustomerItemFindDTO(e.customer);
    this.content = e.content;
    this.star = e.star;
    this.restaurant = new RestaurantItemFindDTO(e.restaurant);
  }
}