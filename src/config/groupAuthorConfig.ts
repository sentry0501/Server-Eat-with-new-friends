import authorConfig from "../_base/author/authorConfig";
import AuthorGroupRole from "./authorGroupRoleConfig";

const RESOURCE = "group";

const groupAuthorConfig = {
  "create": [
    AuthorGroupRole.ADMIN,
    AuthorGroupRole.ROOT,
    AuthorGroupRole.CUSTOMER,
    AuthorGroupRole.GUEST,
    AuthorGroupRole.RESTAURANT,
  ],
  "getAll": [
    AuthorGroupRole.ADMIN,
    AuthorGroupRole.ROOT,
    AuthorGroupRole.CUSTOMER,
    AuthorGroupRole.GUEST,
    AuthorGroupRole.RESTAURANT,
  ],
  "delete": [
    AuthorGroupRole.ADMIN,
    AuthorGroupRole.ROOT,
    AuthorGroupRole.CUSTOMER,
    AuthorGroupRole.GUEST,
    AuthorGroupRole.RESTAURANT,
  ],
  "update": [
    AuthorGroupRole.ADMIN,
    AuthorGroupRole.ROOT,
    AuthorGroupRole.CUSTOMER,
    AuthorGroupRole.GUEST,
    AuthorGroupRole.RESTAURANT,
  ],
  "getById": [
    AuthorGroupRole.ADMIN,
    AuthorGroupRole.ROOT,
    AuthorGroupRole.CUSTOMER,
    AuthorGroupRole.GUEST,
    AuthorGroupRole.RESTAURANT,
  ],
  "join": [
    AuthorGroupRole.ADMIN,
    AuthorGroupRole.ROOT,
    AuthorGroupRole.CUSTOMER,
    AuthorGroupRole.GUEST,
    AuthorGroupRole.RESTAURANT,
  ],
  "leave": [
    AuthorGroupRole.ADMIN,
    AuthorGroupRole.ROOT,
    AuthorGroupRole.CUSTOMER,
    AuthorGroupRole.GUEST,
    AuthorGroupRole.RESTAURANT,
  ],
  "members": [
    AuthorGroupRole.ADMIN,
    AuthorGroupRole.ROOT,
    AuthorGroupRole.CUSTOMER,
    AuthorGroupRole.GUEST,
    AuthorGroupRole.RESTAURANT,
  ],
  
}

authorConfig.addConfig(groupAuthorConfig, RESOURCE)

export default RESOURCE