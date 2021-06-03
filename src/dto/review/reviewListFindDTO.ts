import ERR_CODE from "../../const/error";
import { ReviewEntity } from "../../entity/reviewEntity";
import AbstractDTO from "../abstractDTO";
import ReviewItemFindDTO from "./reviewItemFindDTO";

export default class ReviewListFindDTO extends AbstractDTO{

  private reviews: ReviewItemFindDTO[]
  constructor(reviews: ReviewEntity[]) {
    super();
    this.reviews = reviews.map((e) => new ReviewItemFindDTO(e));
  }
}