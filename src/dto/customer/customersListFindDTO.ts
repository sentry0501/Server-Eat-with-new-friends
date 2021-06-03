import ERR_CODE from "../../const/error";
import { CustomerEntity } from "../../entity/customerEntity";
import AbstractDTO from "../abstractDTO";
import CustomerItemFindDTO from "./customerItemFindDTO";

export default class CustomersListFindDTO extends AbstractDTO{
  private customers: CustomerItemFindDTO[]
  constructor(customers: CustomerEntity[]) {
    super();
    this.customers = customers.map((e) => new CustomerItemFindDTO(e));
  }
}