import {crudStatements} from './scripts/dml';

export const executeQuery = (sql, params = []) =>
  new Promise((resolve, reject) => {
    console.log(sql, params);
    db.transaction(trans => {
      trans.executeSql(
        sql,
        params,
        (trans, results) => {
          resolve(results);
        },
        error => {
          reject(error);
        },
      );
    });
  });

export const selectQuery = (type, params = [], conditions = '') =>
  new Promise((resolve, reject) => {
    const sql = crudStatements[type].select;
    console.log(sql, conditions, params, 'SELECT');
    db.transaction(trans => {
      trans.executeSql(
        `${sql} ${conditions}`,
        params,
        (trans, results) => {
          resolve(convertResultToArray(results.rows));
        },
        error => {
          console.log(error);
          reject(error);
        },
      );
    });
  });

export const selectAdhocQuery = (sql, params) =>
  new Promise((resolve, reject) => {
    console.log(sql, params);
    db.transaction(trans => {
      trans.executeSql(
        sql,
        params,
        (trans, results) => {
          resolve(convertResultToArray(results.rows));
        },
        error => {
          console.log(error);
          reject(error);
        },
      );
    });
  });

export const upsertQuery = (type, params, action = 'insert') =>
  new Promise((resolve, reject) => {
    if (params.length === 0) {
      resolve({});
    }
    let sql = crudStatements[type][action];
    if (action === 'insert' && crudStatements[type].inserts !== undefined) {
      sql = `${sql} values ${crudStatements[type].inserts}`;
    }
    console.log(type, sql, params);
    db.transaction(trans => {
      trans.executeSql(
        sql,
        params,
        (trans, results) => {
          resolve(results);
        },
        error => {
          console.log(error);
          reject(error);
        },
      );
    });
  });

export const insertBulkQuery = (type, params) => {
  if (params.length === 0) {
    return;
  }
  return new Promise((resolve, reject) => {
    const statement = crudStatements[type];
    const sql = statement.insert;
    const inserts = statement.inserts;
    const numCols = inserts.split('?').length - 1;
    const numRows = params.length / numCols;
    let allParams = [];
    for (let i = 0; i < numRows; i++) {
      allParams.push(inserts);
    }
    const allParamsString = allParams.join();
    db.transaction(trans => {
      trans.executeSql(
        `${sql} values ${allParamsString}`,
        params,
        (trans, results) => {
          resolve(results);
        },
        error => {
          console.log(error);
          reject(error);
        },
      );
    });
  });
};

export const convertResultToArray = result => {
  console.log(result);
  if (result.length === 0) {
    return [];
  }
  let rows = [];
  for (let i = 0; i < result.length; i++) {
    rows.push(result.item(i));
  }
  return rows;
};
