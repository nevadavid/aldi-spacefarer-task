namespace com.sap.spacefarer;

using {
  cuid,
  managed,
  sap.common.CodeList
} from '@sap/cds/common';


entity SpacesuitColors : CodeList {
  key code     : String(10);
      hexValue : String(7) @title: 'Color Hex Code'
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

@title: 'Wormhole Navigation Skills'
entity WormholeNavigationSkills : CodeList {
  key code             : Integer;
      requiredStardust : Integer @title: 'Required Stardust'
}

@title: 'Galactic Spacefarers'
entity Spacefarers : cuid, managed {
  name                    : String(100)                             @title: 'Spacefarer Name'     @mandatory;
  email                   : String(255)                             @title: 'Email'               @mandatory  @assert.format: '^[^@]+@[^@]+\.[^@]+$';
  spacesuitColor          : Association to SpacesuitColors          @title: 'Spacesuit Color';
  stardustCollection      : Integer default 0                       @title: 'Stardust Collected'  @assert.range: [
    0,
    1000000
  ];
  wormholeNavigationSkill : Association to WormholeNavigationSkills @title: 'Wormhole Navigation Skill';
  originPlanet            : Association to Planets                  @title: 'Origin Planet';
  department              : Association to Departments              @title: 'Department';
  position                : Association to Positions                @title: 'Position'
}
