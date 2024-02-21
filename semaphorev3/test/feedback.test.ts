import { expect } from "chai"
import deploy from "../deploy/deploy"

describe("Feedback", function () {
  let feedback

  before(async () => {
    feedback = await deploy()
  })

  it("Should send feedback", async function () {
    expect(feedback !== undefined)
  })
})
