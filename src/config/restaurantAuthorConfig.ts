import authorConfig from "../_base/author/authorConfig";
import AuthorGroupRole from "./authorGroupRoleConfig";

const RESOURCE = "restaurant";

const restaurantAuthorConfig = {
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
  ]
}

authorConfig.addConfig(restaurantAuthorConfig, RESOURCE);

export default RESOURCE