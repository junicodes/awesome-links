
export const resolvers = {
    Query: {
        links: async (_parent, _arg, ctx) => await ctx.prisma.link.findMany(),
    },
}