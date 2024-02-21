import { deployContract } from "../utils"
import { poseidonContract } from "circomlibjs"
import { zksyncEthers } from "hardhat"
import { getWallet } from "../utils"

export default async function deploySemaphore() {
  /** First option */

  const pairing = await deployContract("Pairing")

  const pairingAddress = pairing.getAddress()

  console.info(`Pairing library has been deployed to: ${pairingAddress}`)

  const semaphoreVerifier = await deployContract("SemaphoreVerifier")

  const semaphoreVerifierAddress = semaphoreVerifier.getAddress()

  console.info(
    `SemaphoreVerifier contract has been deployed to: ${semaphoreVerifierAddress}`
  )

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

  const incrementalBinaryTree = await deployContract("IncrementalBinaryTree")

  const incrementalBinaryTreeAddress = incrementalBinaryTree.getAddress()

  console.info(
    `IncrementalBinaryTree library has been deployed to: ${incrementalBinaryTreeAddress}`
  )

  const semaphore = await deployContract("Semaphore")

  const semaphoreAddress = semaphore.getAddress()

  console.info(`Semaphore contract has been deployed to: ${semaphoreAddress}`)

  const feedbackContract = await deployContract("Feedback", [
    semaphoreAddress,
    "42"
  ])

  const feedbackAddress = feedbackContract.getAddress()

  console.info(`Feedback contract has been deployed to: ${feedbackAddress}`)

  /** Second option */

  // const PairingFactory = await zksyncEthers.getContractFactory("Pairing")
  // const pairing = await PairingFactory.deploy()

  // await pairing.deployed()

  // console.info(`Pairing library has been deployed to: ${pairing.address}`)

  // const pairingAddress = pairing.address

  // const SemaphoreVerifierFactory = await zksyncEthers.getContractFactory(
  //   "SemaphoreVerifier"
  // )

  // const semaphoreVerifier = await SemaphoreVerifierFactory.deploy()

  // console.info(
  //   `SemaphoreVerifier contract has been deployed to: ${semaphoreVerifier.getAddress()}`
  // )

  // const semaphoreVerifierAddress = semaphoreVerifier.address

  // const poseidonABI = poseidonContract.generateABI(2)
  // const poseidonBytecode = poseidonContract.createCode(2)

  // const PoseidonFactory = new zksyncEthers.ContractFactory(
  //   poseidonABI,
  //   poseidonBytecode
  // )
  // const poseidon = await PoseidonFactory.deploy()

  // console.info(
  //   `Poseidon library has been deployed to: ${poseidon.getAddress()}`
  // )

  // const poseidonAddress = poseidon.getAddress()

  // const IncrementalBinaryTreeFactory = await zksyncEthers.getContractFactory(
  //   "IncrementalBinaryTree"
  // )
  // const incrementalBinaryTree = await IncrementalBinaryTreeFactory.deploy()

  // console.info(
  //   `IncrementalBinaryTree library has been deployed to: ${incrementalBinaryTree.getAddress()}`
  // )

  // const incrementalBinaryTreeAddress = incrementalBinaryTree.address

  // const SemaphoreFactory = await zksyncEthers.getContractFactory("Semaphore")

  // const semaphore = await SemaphoreFactory.deploy(semaphoreVerifierAddress)

  // console.info(
  //   `Semaphore contract has been deployed to: ${semaphore.getAddress()}`
  // )

  // const semaphoreAddress = semaphore.getAddress()

  // const FeedbackFactory = await zksyncEthers.getContractFactory("Feedback")

  // const feedbackContract = await FeedbackFactory.deploy(semaphoreAddress, "42")

  // console.info(
  //   `Feedback contract has been deployed to: ${feedbackContract.getAddress()}`
  // )

  return feedbackContract
}
