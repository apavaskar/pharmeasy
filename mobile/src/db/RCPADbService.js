import {selectQuery} from './genericDao';
import {BRAND_MASTER, COMP_BRAND_MASTER, RCPA_DATA} from './constants';
import {toYyyyMmDd} from '../utils/dateUtil';

export const loadRCPA = async (doctorId, visitId, date) => {
  const currentRcpa = (
    await selectQuery(RCPA_DATA, [visitId], 'WHERE visitId = ?')
  ).map(rcpa => {
    rcpa.action = 'N';
    return rcpa;
  });
  const current = toYyyyMmDd(date);
  const prevVisit = await selectQuery(
    RCPA_DATA,
    [current, doctorId],
    'WHERE rcpaDateYyyyMmDd < ? and doctorId = ? limit 1',
  );
  let prevRcpa = [];
  if (prevVisit.length > 0) {
    const prevVisitId = prevVisit.visitId;
    prevRcpa = (
      await selectQuery(RCPA_DATA, [prevVisitId], 'WHERE visitId = ?')
    ).map(rcpa => {
      rcpa.action = 'N';
      return rcpa;
    });
  }
  return {
    prevRCPA: prevRcpa,
    currentRCPA: currentRcpa,
  };
};

export const loadBrandsForRCPA = async () => {
  const brands = await selectQuery(BRAND_MASTER, [1], 'where isRCPA = ?');
  let brandList = [];
  for (let brand of brands) {
    const compBrands = await selectQuery(
      COMP_BRAND_MASTER,
      [brand.id],
      'WHERE ownBrandId = ? ',
    );
    brandList.push(brand);
    compBrands.forEach(cBrand => brandList.push(cBrand));
  }
  return brandList;
};
