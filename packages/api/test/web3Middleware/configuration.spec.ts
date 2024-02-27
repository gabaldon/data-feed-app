import { Network, RouterDataFeedsConfig } from '../../types'
import { Configuration } from '../../src/web3Middleware/Configuration'

const configurationFile: RouterDataFeedsConfig = {
  abi: '' as any,
  chains: {
    arbitrum: {
      name: 'Arbitrum',
      networks: {
        'arbitrum.one': {
          legacy: false,
          address: '0x9999999d139bdBFbF25923ba39F63bBFc7593400',
          blockExplorer: 'https://arbiscan.io/address/{address}',
          color: '#E84142',
          mainnet: true,
          name: 'Arbitrum ONE',
          pollingPeriod: 120000,
          feeds: {
            'Price-ETH/USD-6': {
              label: '$',
              deviationPercentage: 3.5,
              maxSecsBetweenUpdates: 86400,
              minSecsBetweenUpdates: 900,
            },
          },
        },
        'arbitrum.goerli': {
          legacy: false,
          address: '0x9999999d139bdBFbF25923ba39F63bBFc7593400',
          blockExplorer: 'https://goerli.arbiscan.io/address/{address}',
          color: '#E84142',
          name: 'Arbitrum Nitro Goerli',
          pollingPeriod: 120000,
          feeds: {
            'Price-ETH/USD-6': {
              label: '$',
              deviationPercentage: 3.5,
              maxSecsBetweenUpdates: 86400,
              minSecsBetweenUpdates: 900,
            },
          },
        },
      },
    },
    avalanche: {
      name: 'Avalanche',
      networks: {
        'avalanche.mainnet': {
          legacy: true,
          mainnet: true,
          address: '0xBaaF31F4AAc5ab5334b6E239a83bf4E855C55ea7',
          blockExplorer: 'https://snowtrace.io/address/{address}',
          color: '#070fdf',
          name: 'Avalanche Mainnet',
          pollingPeriod: 120000,
          feeds: {
            'Price-ETH/USD-6': {
              label: '$',
              deviationPercentage: 3.5,
              maxSecsBetweenUpdates: 86400,
              minSecsBetweenUpdates: 900,
            },
          },
        },
        'avalanche.fuji': {
          legacy: false,
          address: '0x9999999d139bdBFbF25923ba39F63bBFc7593400',
          blockExplorer: 'https://testnet.snowtrace.io/address/{address}',
          color: '#E84142',
          name: 'Avalanche Fuji',
          pollingPeriod: 120000,
          feeds: {
            'Price-ETH/USD-6': {
              label: '$',
              deviationPercentage: 3.5,
              maxSecsBetweenUpdates: 86400,
              minSecsBetweenUpdates: 900,
            },
          },
        },
      },
    },
    boba: {
      name: 'Boba',
      networks: {
        'boba.ethereum.mainnet': {
          legacy: true,
          mainnet: true,
          address: '0x93f61D0D5F623144e7C390415B70102A9Cc90bA5',
          blockExplorer: 'https://blockexplorer.boba.network/address/{address}',
          color: '#007dff',
          name: 'Boba ETH/L2 Mainnet',
          pollingPeriod: 120000,
          feeds: {},
        },
      },
    },
  },
  feeds: {
    'Price-ETH/USD-6': {
      label: '$',
      deviationPercentage: 10,
      maxSecsBetweenUpdates: 86400,
      minSecsBetweenUpdates: 900,
    },
  },
}

describe('Configuration', () => {
  it('listNetworksUsingPriceFeedsContract', () => {
    const configuration = new Configuration(configurationFile)
    const result = configuration.listNetworksUsingPriceFeedsContract()
    process.env.ARBITRUM_ONE_PROVIDER = 'provider-arbitrum-one'
    process.env.ARBITRUM_GOERLI_PROVIDER = 'provider-arbitrum-goerli'
    process.env.AVALANCHE_FUJI_PROVIDER = 'provider-avalanche-fuji'

    const expected = [
      {
        address: '0x9999999d139bdBFbF25923ba39F63bBFc7593400',
        key: 'arbitrum-one',
        networkName: 'Arbitrum ONE',
        pollingPeriod: 120000,
        provider: 'provider-arbitrum-one',
      },
      {
        address: '0x9999999d139bdBFbF25923ba39F63bBFc7593400',
        key: 'arbitrum-goerli',
        networkName: 'Arbitrum Nitro Goerli',
        pollingPeriod: 120000,
        provider: 'provider-arbitrum-goerli',
      },
      {
        address: '0x9999999d139bdBFbF25923ba39F63bBFc7593400',
        key: 'avalanche-fuji',
        networkName: 'Avalanche Fuji',
        pollingPeriod: 120000,
        provider: 'provider-avalanche-fuji',
      },
    ]

    expect(result).toStrictEqual(expected)
  })

  it('getLegacyConfigurationFile', () => {
    const configuration = new Configuration(configurationFile)
    const result = configuration.getLegacyConfigurationFile()

    const expected = {
      abi: '',
      chains: {
        avalanche: {
          name: 'Avalanche',
          networks: {
            'avalanche.mainnet': {
              address: '0xBaaF31F4AAc5ab5334b6E239a83bf4E855C55ea7',
              blockExplorer: 'https://snowtrace.io/address/{address}',
              color: '#070fdf',
              feeds: {
                'Price-ETH/USD-6': {
                  deviationPercentage: 3.5,
                  label: '$',
                  maxSecsBetweenUpdates: 86400,
                  minSecsBetweenUpdates: 900,
                },
              },
              legacy: true,
              mainnet: true,
              name: 'Avalanche Mainnet',
              pollingPeriod: 120000,
            },
          },
        },
        boba: {
          name: 'Boba',
          networks: {
            'boba.ethereum.mainnet': {
              address: '0x93f61D0D5F623144e7C390415B70102A9Cc90bA5',
              blockExplorer:
                'https://blockexplorer.boba.network/address/{address}',
              color: '#007dff',
              feeds: {},
              legacy: true,
              mainnet: true,
              name: 'Boba ETH/L2 Mainnet',
              pollingPeriod: 120000,
            },
          },
        },
      },
      feeds: {
        'Price-ETH/USD-6': {
          deviationPercentage: 10,
          label: '$',
          maxSecsBetweenUpdates: 86400,
          minSecsBetweenUpdates: 900,
        },
      },
    }

    expect(result).toStrictEqual(expected)
  })

  it('getFeedConfiguration', () => {
    const configuration = new Configuration(configurationFile)

    const result = configuration.getFeedConfiguration(
      'Price-ETH/USD-6',
      Network.BobaEthereumMainnet,
    )

    expect(result).toStrictEqual({
      label: '$',
      deviationPercentage: 10,
      maxSecsBetweenUpdates: 86400,
      minSecsBetweenUpdates: 900,
    })
  })

  it('getFeedConfiguration overwrite', () => {
    const configuration = new Configuration(configurationFile)

    const result = configuration.getFeedConfiguration(
      'Price-ETH/USD-6',
      Network.AvalancheMainnet,
    )

    expect(result).toStrictEqual({
      deviationPercentage: 3.5,
      label: '$',
      maxSecsBetweenUpdates: 86400,
      minSecsBetweenUpdates: 900,
    })
  })

  it('isFeedActive', () => {
    const configuration = new Configuration(configurationFile)

    expect(configuration.isFeedActive('Price-ETH/USD-6')).toBe(true)
    expect(configuration.isFeedActive('Price-ETH/USDt-6')).toBe(false)
  })

  it('getNetworkConfiguration', () => {
    const configuration = new Configuration(configurationFile)

    const result = configuration.getNetworkConfiguration(
      Network.BobaEthereumMainnet,
    )

    expect(result).toStrictEqual({
      address: '0x93f61D0D5F623144e7C390415B70102A9Cc90bA5',
      blockExplorer: 'https://blockexplorer.boba.network/address/{address}',
      color: '#007dff',
      feeds: {},
      legacy: true,
      mainnet: true,
      name: 'Boba ETH/L2 Mainnet',
      pollingPeriod: 120000,
    })
  })
})
