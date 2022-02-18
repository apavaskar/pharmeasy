import {dmlStatements} from '../db/scripts/dml';
import {statements} from '../db/scripts/ddl';
import {executeQuery, selectQuery} from '../db/genericDao';
import {APP_INFO, EMPLOYEE_PROFILE} from '../db/constants';

const APP_VERSION = 'AppVersion';

const installPath = [
  '0.0',
  '1.0',
  '1.1',
  '1.2',
  '1.3',
  '1.4',
  '1.5',
  '1.6',
  '1.7',
];

export const installDDL = async () => {
  try {
    const installedVersion = await getCurrentVersion();
    if (installedVersion === installPath[installPath.length - 1]) {
      const appInfos = await selectQuery('AppInfo');
      const employee = await selectQuery(EMPLOYEE_PROFILE);
      return {
        certificate: appInfos[0].auth_certificate,
        employee: employee[0],
      };
    }
    const startIndex = installPath.indexOf(await getCurrentVersion());
    let allddls = [];
    for (let i = startIndex + 1; i < installPath.length; i++) {
      const currentDbInstall = installPath[i];
      const ddls = statements[currentDbInstall] || [];
      const dmls = dmlStatements[currentDbInstall] || [];
      allddls = [...ddls, ...dmls];
      for (const ddl of allddls) {
        try {
          await executeQuery(ddl.sql);
        } catch (e) {
          console.log('err', e);
        }
      }
    }

    const appInfos = await selectQuery('AppInfo');
    const employee = await selectQuery(EMPLOYEE_PROFILE);
    return {
      employee: employee,
      certificate: appInfos[0].auth_certificate,
    };
  } catch (error) {
    throw error;
  }
};

const getCurrentVersion = async () => {
  await executeQuery(
    'CREATE TABLE IF NOT EXISTS AppInfo(id TEXT PRIMARY KEY, app_version TEXT, auth_certificate TEXT )',
  );
  const appversions = await selectQuery(APP_INFO, []);
  if (appversions.length === 0) {
    return '0.0';
  } else {
    return appversions[0].app_version;
  }
};
