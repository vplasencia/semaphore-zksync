import { poseidonContract } from "circomlibjs"
import { zksyncEthers } from "hardhat"
import { getWallet } from "../utils"

export default async function deployPoseidon() {
  const poseidonABI = poseidonContract.generateABI(2)
  const poseidonBytecode = poseidonContract.createCode(2)

  const wallet = getWallet(process.env.WALLET_PRIVATE_KEY)

  const PoseidonFactory = await zksyncEthers.getContractFactory(
    poseidonABI,
    poseidonBytecode,
    wallet
  )
  const poseidon = await PoseidonFactory.deploy()

  const poseidonAddress = poseidon.getAddress()

  console.info(`Poseidon library has been deployed to: ${poseidonAddress}`)
}
