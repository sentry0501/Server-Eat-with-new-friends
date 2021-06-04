import { getManager, getRepository, In, Like, Repository } from 'typeorm';
import { CustomerEntity } from '../entity/customerEntity';
import ICustomer from '../model/ICustomer';
import logger from '../_base/log/logger4js';

async function getMaxCustomerId() {
  try {
    const repository = getRepository(CustomerEntity);
    const maxId = await repository
    .createQueryBuilder("e")
    .select("MAX(e.id)", "max")
    .getRawOne()
    if (!maxId || !maxId.hasOwnProperty("max") || !maxId.max) {
      return null;
    }
    return maxId.max.toString();
  }
  catch(e) {
    throw e;
  }
}

async function deleteByIds(ids: string) {
  try {
    const repository = getRepository(CustomerEntity);
    // const customers = await repository.find({where: {id: ids, isActive: true}});
    // customers.map((e) => e.isActive = false);
    const customers = await getById(ids);
    if (!customers){
      return null
    }
    customers.isActive = false;
    const deletedIds = await repository.save(customers);
    return deletedIds;
  }
  catch(e) {
    throw e;
  }
}

async function getById(id: string) {
  try {
    const repository = getRepository(CustomerEntity);
    const customers = await repository.find({where: {id: id,isActive:true}});
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

async function getByName(name: string) {
  try {
    logger.debug("name "+ name)
    
    const repository = getRepository(CustomerEntity);
    // const customers = await repository.find({name: Like('%${name}%')});
    const customers = await repository.createQueryBuilder("customer")
                                      .where("customer.name like :name", { name:`%${name}%` })
                                      .where("customer.isActive = :isActive",{isActive:1})
                                      .where("customer.roleCode = :roleCode",{roleCode:1})
                                      .getMany();
    // logger.debug("name "+ JSON.stringify(customers))
    if (customers.length <= 0) {
      return null;
    }
    else {
      return customers;
    }
  }
  catch(e) {
    throw e;
  }
}

async function getAll() {
  try {
    const repository = getRepository(CustomerEntity);
    return await repository.find({where:{isActive:true,roleCode:1},cache:true});
  }
  catch(e) {
    throw e;
  }
}
function create (e: ICustomer){
  try {
    const repository = getRepository(CustomerEntity);
    return repository.create(e);
  }
  catch(e) {
    throw e;
  }
}
async function save(customer: CustomerEntity) {
  try {
    const repository = getRepository(CustomerEntity);
    return repository.save(customer);
  }
  catch(e) {
    throw e;
  }
}
async function update(customer: any) {
  try {
    const repository = getRepository(CustomerEntity);
    return repository.update(customer.id, customer);
  }
  catch(e) {
    throw e;
  }
}

const customerDAO = {
  getMaxCustomerId,
  getByName,
  getById,
  getAll,
  create,
  save,
  update,
  deleteByIds
}

export default customerDAO;