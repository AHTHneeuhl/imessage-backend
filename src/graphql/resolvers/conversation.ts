import { GraphQLContext } from "../../utils/types";

const resolvers = {
  Mutation: {
    createConversation: async (
      _: any,
      args: { participantIds: string[] },
      ctx: GraphQLContext
    ) => {
      console.log("Insite create conversation resolver!", args);
    },
  },
};

export default resolvers;
