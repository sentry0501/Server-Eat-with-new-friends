import { getManager, getRepository, In, LessThan, Repository } from 'typeorm';
import { GroupEntity } from '../entity/groupEntity';
import { CustomerEntity } from '../entity/customerEntity';
import IMessage from "../model/IMessage";
import IGroup from '../model/IGroup';
import logger from '../_base/log/logger4js';
import { MessageEntity } from '../entity/messageEntity';

async function getByGroupId(id: string) {
  try {
    const repository = getRepository(MessageEntity);
    const messages = await repository.find({where:{group:{id:id}}})
    return messages;
    
  }
  catch(e) {
    throw e;
  }
}

function create (e: IMessage){
  try {
    const repository = getRepository(MessageEntity);
    return repository.create(e);
  }
  catch(e) {
    throw e;
  }
}
async function save(message: MessageEntity) {
  try {
    const repository = getRepository(MessageEntity);
    // logger.debug("updateAt: "+group.updateAt);
    return repository.save(message);
  }
  catch(e) {
    throw e;
  }
}


const groupDAO = {

  getByGroupId,

  create,

  save,

}

export default groupDAO;