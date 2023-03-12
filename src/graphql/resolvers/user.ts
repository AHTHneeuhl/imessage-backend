import { GraphQLContext } from "../../utils/types";

const resolvers = {
  Query: {
    searchUsers: () => {},
  },
  Mutation: {
    createUsername: (
      _: any,
      args: { username: string },
      ctx: GraphQLContext
    ) => {
      const { username } = args;
      const { session, prisma } = ctx;
      console.log(username);
      console.log(session, prisma);
    },
  },
};

export default resolvers;
