import {selectAdhocQuery, selectQuery} from './genericDao';
import {BRAND_MASTER} from './constants';

export const loadBrandsDetailedForVisit = async visitId => {
  return await selectAdhocQuery(
    'SELECT d.id id, d.detailingId detailingId, d.visitId visitId, ' +
      'd.doctorId doctorId, d.brandId brandId, detlSeq, d.action action, b.name name from BrandDetailing d inner join ' +
      'OwnBrandMaster b on b.id = d.brandId where visitId = ? and action != ?',
    [visitId, 'D'],
  );
};

export const loadDetailingBrands = async () => {
  return await selectQuery(BRAND_MASTER, [1], 'where isDetailing = ?');
};

export const loadFilesForDetailing = async () => {
  return await selectAdhocQuery(
    'select d.*, b.name from DetailingAid d inner join OwnBrandMaster b on d.brandId = b.id order by b.name, sequence',
    [],
  );
};
