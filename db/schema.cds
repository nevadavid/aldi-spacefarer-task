namespace com.sap.spacefarer;

using {
  cuid,
  managed,
  sap.common.CodeList
} from '@sap/cds/common';


entity SpacesuitColors : CodeList {
  key code     : String(10);
      hexValue : String(7) @title: '{i18n>ColorHexCode}'
}

entity Departments : CodeList {
  key code : String(3)
}

entity Positions : CodeList {
  key code : String(3)
}

entity Planets : CodeList {
  key code : String(3)
}

@title: '{i18n>WormholeNavigationSkills}'
entity WormholeNavigationSkills : CodeList {
  key code             : Integer;
      requiredStardust : Integer @title: '{i18n>RequiredStardust}'
}

@title: '{i18n>GalacticSpacefarers}'
entity Spacefarers : cuid, managed {
  name                    : String(100)                             @title: '{i18n>SpacefarerName}'     @mandatory;
  email                   : String(255)                             @title: '{i18n>Email}'               @mandatory  @assert.format: '^[^@]+@[^@]+\.[^@]+$';
  spacesuitColor          : Association to SpacesuitColors          @title: '{i18n>SpacesuitColor}';
  stardustCollection      : Integer default 0                       @title: '{i18n>StardustCollected}'  @assert.range: [
    0,
    1000000
  ];
  wormholeNavigationSkill : Association to WormholeNavigationSkills @title: '{i18n>WormholeNavigationSkill}';
  originPlanet            : Association to Planets                  @title: '{i18n>OriginPlanet}';
  department              : Association to Departments              @title: '{i18n>Department}';
  position                : Association to Positions                @title: '{i18n>Position}'
}
