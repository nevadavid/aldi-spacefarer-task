sap.ui.define(
  [
    "sap/fe/test/JourneyRunner",
    "spacefarerfiori/test/integration/pages/SpacefarersList.gen",
    "spacefarerfiori/test/integration/pages/SpacefarersObjectPage.gen",
  ],
  function (
    JourneyRunner,
    SpacefarersListGenerated,
    SpacefarersObjectPageGenerated,
  ) {
    "use strict";

    const runner = new JourneyRunner({
      launchUrl:
        sap.ui.require.toUrl("spacefarerfiori") + "/test/flp.html#app-preview",
      pages: {
        onTheSpacefarersListGenerated: SpacefarersListGenerated,
        onTheSpacefarersObjectPageGenerated: SpacefarersObjectPageGenerated,
      },
      async: true,
    });

    return runner;
  },
);
