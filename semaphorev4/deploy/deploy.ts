import { deployContract } from "./utils"

// An example of a basic deploy script
// It will deploy a Greeter contract to selected network
// as well as verify it on Block Explorer if possible for the network
export default async function () {
  const semaphoreVerifier = await deployContract("SemaphoreVerifier")

  const semaphoreVerifierAddress = semaphoreVerifier.getAddress()

  console.info(
    `SemaphoreVerifier contract has been deployed to: ${semaphoreVerifierAddress}`
  )

  const semaphore = await deployContract("Semaphore", [
    semaphoreVerifierAddress
  ])

  const semaphoreAddress = semaphore.getAddress()

  console.info(`Semaphore contract has been deployed to: ${semaphoreAddress}`)

  const feedback = await deployContract("Feedback", [semaphoreAddress, "42"])

  const feedbackAddress = feedback.getAddress()

  console.info(`Feedback contract has been deployed to: ${feedbackAddress}`)
}
