import { constants } from '../constants'
import { addressesURL, wrongRepoAlert } from './helpers'
const local = {
  VOTING_TO_CHANGE_KEYS_ADDRESS: '0xad66497bd6dd2b6a81bc12acf709c8ddd5eafa5a',
  VOTING_TO_CHANGE_MIN_THRESHOLD_ADDRESS: '0x6bd896c748f4645cea8a00b2265e4ec53bb2f6b9',
  VOTING_TO_CHANGE_PROXY_ADDRESS: '0x7f9265b500dc524c41fcfd111ce465a1f2b45cc8',
  VOTING_TO_MANAGE_EMISSION_FUNDS_ADDRESS: '0x20dba6b45b3e17e71049804e657fcc8d607173ad',
  BALLOTS_STORAGE_ADDRESS: '0x9548175aab495a9415a9722d667d60db51a9bd2e',
  KEYS_MANAGER_ADDRESS: '0x07c2ac52c8e8417c676753f36113083d9fe81437',
  METADATA_ADDRESS: '0x0779f34abd67bfa8b9053c1a67c49796e5117501',
  PROXY_ADDRESS: '0x745988b45d48beb59e21a3255c24ac39f1db9ce6',
  POA_ADDRESS: '0xf472e0e43570b9afaab67089615080cf7c20018d',
  EMISSION_FUNDS_ADDRESS: '0xdff9afb7360b6326c9f2524ed711ead0ef13143d',
  REWARD_BY_BLOCK_ADDRESS: '0x75c093881c8476b120bb59a203c31d98b38f1cd6',
  MOC: '0x6189c84bc4289bc336f5fbe9a8f802c4cb08a2b9'
}

let SOKOL_ADDRESSES = {}
let ARTIS_ADDRESSES = {}
let CORE_ADDRESSES = {}
let DAI_TEST_ADDRESSES = {}
let DAI_ADDRESSES = {}

async function getContractsAddresses(branch) {
  let addr = addressesURL(branch)
  let response
  try {
    response = await fetch(addr)
  } catch (e) {
    return wrongRepoAlert(addr)
  }

  let contracts = await response.json()

  switch (branch) {
    case 'core':
      CORE_ADDRESSES = contracts
      break
    case 'dai':
      DAI_ADDRESSES = contracts
      break
    case 'sokol':
      SOKOL_ADDRESSES = contracts
      break
    case 'ARTIS':
      ARTIS_ADDRESSES = contracts
      break
    case 'dai-test':
      DAI_TEST_ADDRESSES = contracts
      break
    default:
      CORE_ADDRESSES = contracts
      break
  }
}

function getAddresses(netId) {
  switch (netId) {
    case constants.NETID_SOKOL:
      return SOKOL_ADDRESSES
    case constants.NETID_ARTIS:
      return local
    case constants.NETID_DAI_TEST:
      return DAI_TEST_ADDRESSES
    case constants.NETID_CORE:
      return CORE_ADDRESSES
    case constants.NETID_DAI:
      return DAI_ADDRESSES
    default:
      return CORE_ADDRESSES
  }
}

module.exports = {
  getContractsAddresses,
  networkAddresses: getAddresses
}
