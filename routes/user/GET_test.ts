import { H3Event } from "h3";

export default {
  values: (event: H3Event) => {
    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Test route is working!" }),
    };
  },
};
