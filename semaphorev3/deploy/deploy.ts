import deploySemaphore from "./semaphore/deploy-semaphore"

// An example of a basic deploy script
// It will deploy a Feedback contract to selected network
// as well as verify it on Block Explorer if possible for the network
export default async function () {
  const feedbackContract = await deploySemaphore()
  return feedbackContract
}
