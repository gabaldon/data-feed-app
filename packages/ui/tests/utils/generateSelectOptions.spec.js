import { generateSelectOptions } from '../../utils/generateSelectOptions'

describe('generateSelectOptions.js', () => {
  it('should generate a list of options from a list of feeds', () => {
    const networks = [
      { label: 'ethereum-rinkeby' },
      { label: 'ethereum-goerli' },
      { label: 'conflux-testnet' },
      { label: 'boba-rinkeby' },
    ]

    const options = generateSelectOptions(networks)

    expect(options).toStrictEqual({
      boba: [{ key: 'Boba Rinkeby', label: 'boba-rinkeby', network: 'Boba' }],
      conflux: [
        {
          key: 'Conflux Testnet',
          label: 'conflux-testnet',
          network: 'Conflux',
        },
      ],
      ethereum: [
        {
          key: 'Ethereum Rinkeby',
          label: 'ethereum-rinkeby',
          network: 'Ethereum',
        },
        {
          key: 'Ethereum Goerli',
          label: 'ethereum-goerli',
          network: 'Ethereum',
        },
      ],
    })
  })

  it('should generate an empty list if the arguments are empty', () => {
    const networks = []

    const options = generateSelectOptions(networks)

    expect(options).toStrictEqual({})
  })

  it('should generate empty list if no argument is provided', () => {
    const networks = []

    const options = generateSelectOptions(networks)

    expect(options).toStrictEqual({})
  })
})
