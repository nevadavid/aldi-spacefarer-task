using com.sap.spacefarer as db from '../db/schema';

@requires: 'authenticated-user'

service SpacefarerService {
  @restrict: [
    {
      grant: ['*'],
      to   : 'Admin'
    },
    {
      grant: ['READ'],
      to   : 'Spacefarer',
      where: 'originPlanet_code = $user.planet'
    }
  ]
  entity Spacefarers as projection on db.Spacefarers;
}
