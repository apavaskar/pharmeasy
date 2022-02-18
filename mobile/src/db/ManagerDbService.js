import {
  convertResultToArray,
  executeQuery,
  selectAdhocQuery,
  selectQuery,
} from './genericDao';
import {BEAT_MASTER, MY_TEAM, TEAM_TOUR_PLAN} from './constants';
import {toYyyyMmDd} from '../utils/dateUtil';

export const getBeatsPlanned = async date => {
  const beatsByLocation = await selectAdhocQuery(
    'select t.planLocationId locationId, b.id, b.name, count(distinct d.id) doctorCount from TeamTourPlan t inner join DoctorMaster d on d.id = t.customerId inner join BeatMaster b on b.id = d.beatId where t.planDateYyyyMmDd = ? group by t.planLocationId, b.id, b.name',
    [toYyyyMmDd(date)],
  );

  const teamMembers = await selectQuery(MY_TEAM);
  let map = {};
  teamMembers.forEach(
    t => (map[t.locationId] = {team: t, beats: [], doctorCount: 0}),
  );
  console.log(teamMembers, map);
  beatsByLocation.forEach(b => {
    if (map[b.locationId] !== undefined) {
      let val = map[b.locationId];
      val.beats.push(b);
      val.doctorCount = val.doctorCount + b.doctorCount;
      map[b.locationId] = val;
    }
  });
  return map;
};
