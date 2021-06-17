import { getRepository } from "typeorm";
import { CustomerEntity } from "../entity/customerEntity";
import { RestaurantEntity } from "../entity/restaurantEntity";



async function getCustomerByAccount(account: string) {
  try {
    const repository = getRepository(CustomerEntity);
    const customers = await repository.find({where: {account: account, isActive:true}});
    if (customers.length <= 0) {
      return null;
    }
    else {
      return customers[0];
    }
  }
  catch(e) {
    throw e;
  }
}

async function getRestaurantByAccount(account: string) {
  try {
    const repository = getRepository(RestaurantEntity);
    const restaurants = await repository.find({where: {account: account,isActive:true}});
    if (restaurants.length <= 0) {
      return null;
    }
    else {
      return restaurants[0];
    }
  }
  catch(e) {
    throw e;
  }
}

const accountDAO = {
  getCustomerByAccount,
  getRestaurantByAccount,
}

export default accountDAO;