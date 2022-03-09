import { AbiItem } from 'web3-utils'
import { ResultRequestDbObject } from './generated/types'
import { Contract } from 'web3-eth-contract'

import { FeedRepository } from './repository/Feed'
import { ResultRequestRepository } from './repository/ResultRequest'

export * from './generated/types'
export { AbiItem } from 'web3-utils'
export { Db, Collection, ObjectId, WithId } from 'mongodb'

export type WithoutId<T> = Omit<T, '_id' | 'id'>

export type Context = {
  feedRepository: FeedRepository
  resultRequestRepository: ResultRequestRepository
  config: ConfigByFullName
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
  network: Network
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
}

export type FeedConfig = {
  address: string
  blockExplorer: string
  color: string
  name: string
  pollingPeriod: number
  feeds: FeedInfoRouterConfigMap
}

export type NetworkConfigMap = Record<string, FeedConfig>

export type RouterDataFeedsConfig = {
  abi: string
  chains: Record<string, { networks: Record<string, FeedConfig> }>
}

export type FeedInfosWithoutAbis = Array<
  Omit<FeedInfoConfig, 'abi' | 'routerAbi'>
>
