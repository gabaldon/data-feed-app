import { Context } from './types'

const resolvers = {
  Query: {
    feeds: async (_parent, args, { feedRepository }: Context) => {
      return {
        feeds: await feedRepository.getFeeds(args.page, args.pageSize),
        total: await feedRepository.getTotalCount()
      }
    },

    requests: async (_parent, args, { resultRequestRepository }: Context) => {
      return await resultRequestRepository.getFeedRequestsPage(
        args.feedId,
        args.page,
        args.size
      )
    },

    feed: async (_parent, args, { feedRepository }: Context) => {
      return await feedRepository.get(args.id)
    }
  },
  Feed: {
    requests: async (_parent, args, { resultRequestRepository }: Context) => {
      const request = await resultRequestRepository.getFeedRequests(
        args.id,
        args.timestamp
      )
      return request
    },
    lastResult: async (parent, _args, { resultRequestRepository }: Context) => {
      return (await resultRequestRepository.getLastResult(parent.id))?.result
    },
    color: async (parent, _args, { config }: Context) => {
      return config[`${parent.network}_${parent.address}`]?.color || ''
    },
    blockExplorer: async (parent, _args, { config }: Context) => {
      return config[`${parent.network}_${parent.address}`]?.blockExplorer || ''
    }
  }
}

export default resolvers
