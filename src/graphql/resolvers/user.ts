import { CreateUsernameResponse, GraphQLContext } from "../../utils/types";

const resolvers = {
  Query: {
    searchUsers: () => {},
  },
  Mutation: {
    createUsername: async (
      _: any,
      args: { username: string },
      ctx: GraphQLContext
    ): Promise<CreateUsernameResponse> => {
      const { username } = args;
      const { session, prisma } = ctx;

      if (!session?.user) {
        return {
          error: "Not authorized",
        };
      }

      const { id: userId } = session.user;

      try {
        // Check username is available
        const existingUser = await prisma.user.findUnique({
          where: { username },
        });

        if (existingUser) {
          return {
            error: "Username already taken, Try another!",
          };
        }
        // Update user
        await prisma.user.update({
          where: {
            id: userId,
          },
          data: {
            username,
          },
        });

        return {
          success: true,
        };
      } catch (error: any) {
        console.log("create username error!");
        return {
          error: error?.message,
        };
      }

      return {};
    },
  },
};

export default resolvers;
