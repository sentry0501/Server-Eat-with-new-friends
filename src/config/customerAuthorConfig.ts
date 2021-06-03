import authorConfig from "../_base/author/authorConfig";
import AuthorGroupRole from "./authorGroupRoleConfig";

const RESOURCE = "customer";

const customerAuthorConfig = {
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
  "updatePassword": [
    AuthorGroupRole.ADMIN,
    AuthorGroupRole.ROOT,
    AuthorGroupRole.CUSTOMER,
    AuthorGroupRole.GUEST,
    AuthorGroupRole.RESTAURANT,
  ],
  "getByName": [
    AuthorGroupRole.ADMIN,
    AuthorGroupRole.ROOT,
    AuthorGroupRole.CUSTOMER,
    AuthorGroupRole.GUEST,
    AuthorGroupRole.RESTAURANT,
  ],
}

authorConfig.addConfig(customerAuthorConfig, RESOURCE);

export default RESOURCE