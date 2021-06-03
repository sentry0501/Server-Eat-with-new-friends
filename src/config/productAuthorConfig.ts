import authorConfig from "../_base/author/authorConfig";
import AuthorGroupRole from "./authorGroupRoleConfig";

const RESOURCE = "product";

const productAuthorConfig = {
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
  "getByRestaurantId": [
    AuthorGroupRole.ADMIN,
    AuthorGroupRole.ROOT,
    AuthorGroupRole.CUSTOMER,
    AuthorGroupRole.GUEST,
    AuthorGroupRole.RESTAURANT,
  ]
}

authorConfig.addConfig(productAuthorConfig, RESOURCE)

export default RESOURCE