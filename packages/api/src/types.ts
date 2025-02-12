import { AbiItem } from 'web3-utils'
import { ResultRequestDbObject } from './generated/types'
import { Contract } from 'web3-eth-contract'

import { FeedRepository } from './repository/Feed'
import { ResultRequestRepository } from './repository/ResultRequest'
import DataLoader from 'dataloader'

export * from './generated/types'
export { AbiItem } from 'web3-utils'
export { Contract } from 'web3-eth-contract'
export { Db, Collection, ObjectId, WithId } from 'mongodb'

export type WithoutId<T> = Omit<T, '_id' | 'id'>

export type Context = {
  feedRepository: FeedRepository
  resultRequestRepository: ResultRequestRepository
  config: {
    feedsConfig: ConfigByFullName
    networksConfig: NetworksConfig
  }
  loaders: {
    lastResult: DataLoader<string, ResultRequestDbObjectNormalized, string>
    requests: DataLoader<
      {
        feedFullName: string
        timestamp: number
      },
      ResultRequestDbObjectNormalized,
      {
        feedFullName: string
        timestamp: number
      }
    >
  }
}

export type ConfigByFullName = {
  [key: string]: FeedInfo
}

export enum Network {
  EthereumMainnet = 'ethereum-mainnet',
  EthereumGoerli = 'ethereum-goerli',
  EthereumRinkeby = 'ethereum-rinkeby',
  AvalancheFuji = 'avalanche-fuji',
  BobaMainnet = 'boba-mainnet',
  BobaRinkeby = 'boba-rinkeby',
  ConfluxTethys = 'conflux-tethys',
  ConfluxTestnet = 'conflux-testnet',
  CeloMainnet = 'celo-mainnet',
  CeloAlfajores = 'celo-alfajores',
  HarmonyTestnet = 'harmony-testnet',
  MetisMainnet = 'metis-mainnet',
  MetisRinkeby = 'metis-rinkeby',
  MoonbeamMoonbase = 'moonbeam-moonbase',
  PolygonMainnet = 'polygon-mainnet',
  PolygonGoerli = 'polygon-goerli',
  KCCMainnet = 'KCC-mainnet',
  KCCTestnet = 'KCC-testnet'
}

export type FeedInfoGeneric<ABI> = {
  feedFullName: string
  id: string
  abi: ABI
  routerAbi: ABI
  address: string
  routerAddress: string
  // Network is the network key to identify a feed from a specific network in the database
  network: Network
  // NetworkName is the label of the network to show in the ui
  networkName: string
  chain: string
  name: string
  pollingPeriod: number
  label: string
  contractId: string
  color: string
  blockExplorer: string
  deviation: string
  heartbeat: string
  finality: string
}

export type NetworksConfig = {
  chain: String
  label: String
  key: String
}

export type FeedInfo = FeedInfoGeneric<Array<AbiItem>>

export type FeedInfoConfig = FeedInfoGeneric<string>

export type PaginatedFeedsObject = {
  feeds: Array<FeedInfo>
  total: number
}

export type ContractInfo = {
  contractAddress: string
  contractId: string
}

export type ResultRequestDbObjectNormalized = ResultRequestDbObject & {
  id: string
}

export type Repositories = {
  feedRepository: FeedRepository
  resultRequestRepository: ResultRequestRepository
}

export type ContractsState = {
  lastPrice: string
  lastTimestamp: string
  lastDrTxHash: string
  requestId: string
}

export type LastResponse = {
  timestamp: string
  drTxHash: string
}

export type Contracts = {
  feedContract: Contract
}

export type FeedInfoRouterConfigMap = {
  [key: string]: FeedParamsConfig
}

export type FeedParamsConfig = {
  label: string
  deviationPercentage: number
  maxSecsBetweenUpdates: number
  minSecsBetweenUpdates: number
}

export type FeedParsedParams = {
  label: string
  deviationPercentage: number
  maxSecsBetweenUpdates: number
  minSecsBetweenUpdates: number
  key: string
  chain: string
}

export type FeedConfig = {
  address: string
  blockExplorer: string
  color: string
  name: string
  pollingPeriod: number
  feeds: FeedInfoRouterConfigMap
}

export type ExtendedFeedConfig = {
  address: string
  blockExplorer: string
  color: string
  name: string
  chain: string
  network: string
  pollingPeriod: number
  feeds: FeedInfoRouterConfigMap
}

export type Chain = { name: string; networks: Record<string, FeedConfig> }

export type NetworkConfigMap = Record<string, FeedConfig>

export type RouterDataFeedsConfig = {
  abi: string
  chains: Record<string, Chain>
}

export type FeedInfosWithoutAbis = Array<
  Omit<FeedInfoConfig, 'abi' | 'routerAbi'>
>
