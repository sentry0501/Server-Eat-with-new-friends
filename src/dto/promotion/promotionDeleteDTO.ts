import AbstractDTO from "../abstractDTO";

export default class PromotionDeleteDTO extends AbstractDTO {
  private ids: string[]
  constructor(ids: string[]) {
    super();
    this.ids = ids;
  }
}