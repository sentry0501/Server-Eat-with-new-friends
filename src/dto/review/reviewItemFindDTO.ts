import serverConfig from "../../config/serverConfig";
import { ReviewEntity } from "../../entity/reviewEntity";
import CustomerItemFindDTO from "../customer/customerItemFindDTO";

export default class ReviewItemFindDTO{

  public id: string
  public date: Date
  public content: string
  public star: number
  public customer: CustomerItemFindDTO

  constructor(e: ReviewEntity) {
    this.id = e.id;
    this.date = e.date;
    this.content = e.content;
    this.star = e.star;
    this.customer = new CustomerItemFindDTO(e.customer);
  }
}