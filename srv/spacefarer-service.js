const cds = require("@sap/cds");
const {
  WormholeNavigationSkills,
  Spacefarers,
} = require("#cds-models/com/sap/spacefarer");

class SpacefarerService extends cds.ApplicationService {
  init() {
    this.before("SAVE", "Spacefarers", (req) => this.enhanceCandidate(req));
    this.after("SAVE", "Spacefarers", (data, req) =>
      this.sendWelcomeEmail(req.data),
    );

    return super.init();
  }

  /**
   * @param {import('@sap/cds').Request} req
   */
  async enhanceCandidate(req) {
    const stardust = req.data.stardustCollection ?? 0;
    const claimed = req.data.wormholeNavigationSkill_code ?? undefined;

    const skills = await SELECT.from(WormholeNavigationSkills).orderBy(
      "requiredStardust desc",
    );

    if (
      claimed !== undefined &&
      !skills.find((skill) => skill.code === claimed)
    ) {
      return req.error(
        400,
        "Unknown navigation skill rank",
        "wormholeNavigationSkill_code",
      );
    }

    const earned = skills.find(
      (skill) => stardust >= (skill.requiredStardust ?? 0),
    );

    if (earned?.code === undefined) {
      return req.error(
        500,
        "No navigation skill level is defined for this stardust amount",
      );
    }

    if (claimed === undefined) {
      req.data.wormholeNavigationSkill_code = earned.code;
    } else if (claimed > earned.code) {
      req.error(
        400,
        "Insufficient stardust for this rank",
        "wormholeNavigationSkill_code",
      );
    } else if (claimed < earned.code) {
      req.data.wormholeNavigationSkill_code = earned.code;
    }
  }

  /**
   * @param {import("#cds-models/com/sap/spacefarer").Spacefarer} spacefarer
   */
  async sendWelcomeEmail(spacefarer) {
    if (!spacefarer?.email) {
      return;
    }

    try {
      const skill = await SELECT.one
        .from(WormholeNavigationSkills)
        .where({ code: spacefarer.wormholeNavigationSkill_code });

      const rank = skill?.name ?? "";

      await this.sendEmail(
        spacefarer.email,
        `Congratulations ${rank} ${spacefarer.name}! Let's start your adventurous journey among the stars!`,
      );
    } catch (error) {
      console.error(
        "Failed to send welcome email:",
        error instanceof Error ? error.message : error,
      );
    }
  }

  /**
   * @param {string} email
   * @param {string} msg
   */
  async sendEmail(email, msg) {
    console.log(`[${email}]: ${msg}`);
  }
}

module.exports = SpacefarerService;
