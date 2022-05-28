module.exports = {
    TABLES: {
      USERS: "User",
      PRODUCTS: "Product",
      CART : "Cart",
      ORDER : "Orders"
    },
    STATUS_CODES: {
      NOT_FOUND: 404,
      SUCCESS: 200,
      SERVER_ERROR: 500,
      FILE_NOT_FOUND: 404,
      NO_CONTENT : 204
    },
    ROUTES: {
      ROOT: "/",
      USER: {
        REGISTER: "/add",
      },
      ORDER: {
        ADD : "/add",
        HISTORY : "/display",
      },
      PRODUCT:{ 
        ADD: "/add",
        DISPLAY : "/display",
      },
      CART:{
        ADD: "/add",
        DISPLAY: "/display",
        UPDATE: "/update",
        REMOVE : "/delete",
      },
    },
  };