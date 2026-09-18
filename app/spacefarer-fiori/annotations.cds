using SpacefarerService as service from '../../srv/spacefarer-service';

annotate service.Spacefarers with @(
  UI.FieldGroup #GeneratedGroup: {
    $Type: 'UI.FieldGroupType',
    Data : [
      {
        $Type: 'UI.DataField',
        Value: name,
      },
      {
        $Type: 'UI.DataField',
        Value: email,
      },
      {
        $Type: 'UI.DataField',
        Label: 'spacesuitColor_code',
        Value: spacesuitColor_code,
      },
      {
        $Type: 'UI.DataField',
        Value: stardustCollection,
      },
      {
        $Type: 'UI.DataField',
        Value: wormholeNavigationSkill_code,
      },
      {
        $Type: 'UI.DataField',
        Label: 'originPlanet_code',
        Value: originPlanet_code,
      },
      {
        $Type: 'UI.DataField',
        Label: 'department_code',
        Value: department_code,
      },
      {
        $Type: 'UI.DataField',
        Label: 'position_code',
        Value: position_code,
      },
    ],
  },
  UI.Facets                    : [{
    $Type : 'UI.ReferenceFacet',
    ID    : 'GeneratedFacet1',
    Label : 'General Information',
    Target: '@UI.FieldGroup#GeneratedGroup',
  }, ],
  UI.LineItem                  : [
    {
      $Type: 'UI.DataField',
      Value: name,
    },
    {
      $Type: 'UI.DataField',
      Value: email,
    },
    {
      $Type: 'UI.DataField',
      Value: spacesuitColor_code,
    },
    {
      $Type: 'UI.DataField',
      Value: stardustCollection,
    },
  ],
);
