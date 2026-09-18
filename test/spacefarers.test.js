const cds = require("@sap/cds");
const { GET, POST, PATCH, expect, axios } = cds.test(__dirname + "/..");

axios.defaults.auth = { username: "admin", password: "admin" };

const SPACEFARERS = "/odata/v4/spacefarer/Spacefarers";

/**
 * Runs the three-step draft flow (create, fill, activate) tests.http walks
 * through by hand, and returns the activation response.
 */
async function createAndActivate(fields) {
  const { data: draft } = await POST(SPACEFARERS, {});
  const draftKey = `${SPACEFARERS}(ID=${draft.ID},IsActiveEntity=false)`;

  await PATCH(draftKey, fields);

  return POST(`${draftKey}/SpacefarerService.draftActivate`, {});
}

describe("SpacefarerService", () => {
  it("derives the rank from stardust when none is claimed", async () => {
    const { data } = await createAndActivate({
      name: "Vera Lumen",
      email: "vera.lumen@spacefarer.io",
      stardustCollection: 2500,
      originPlanet_code: "EAR",
      department_code: "NAV",
      position_code: "LTC",
      spacesuitColor_code: "AZURE",
    });

    expect(data.wormholeNavigationSkill_code).to.equal(3);

    // Activation persists a real record; remove it so later tests (e.g. the
    // admin "sees everything" count) still see the original seed data only.
    await axios.delete(`${SPACEFARERS}(${data.ID})`);
  });

  it("rejects a claimed rank the stardust does not support", async () => {
    await expect(
      createAndActivate({
        name: "Pretender Pete",
        email: "pete@spacefarer.io",
        stardustCollection: 2500,
        wormholeNavigationSkill_code: 4,
        originPlanet_code: "MAR",
        department_code: "ENG",
        position_code: "CDT",
        spacesuitColor_code: "VOID",
      }),
    ).to.be.rejectedWith("400");
  });

  it("rejects an unknown rank code", async () => {
    await expect(
      createAndActivate({
        name: "Nobody",
        email: "nobody@spacefarer.io",
        stardustCollection: 2500,
        wormholeNavigationSkill_code: 99,
        originPlanet_code: "MAR",
        department_code: "ENG",
        position_code: "CDT",
        spacesuitColor_code: "VOID",
      }),
    ).to.be.rejectedWith("400");
  });

  it("hides Spacefarers from other planets behind a 404", async () => {
    await expect(
      GET(`${SPACEFARERS}(11111111-0000-0000-0000-000000000001)`, {
        auth: { username: "ares", password: "ares" },
      }),
    ).to.be.rejectedWith("404");
  });

  it("lets an admin see every Spacefarer", async () => {
    const { data } = await GET(SPACEFARERS);

    expect(data.value).to.have.length(32);
  });
});
