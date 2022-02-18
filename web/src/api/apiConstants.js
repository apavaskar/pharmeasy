export const AUTH_CERTIFICATE = 'AUTH_CERTIFICATE';
export const BASE_URL = '';

export const menuAPI = {url: '/uicontroller/my-menus/web', method: 'GET', auth: true};
export const loginAPI = {url: '/auth/login', method: 'POST', auth: false};
export const profileAPI = {url: '/employee/profile', method: 'GET', auth: true};
export const profileByEmployeeAPI = {url: '/employee/profile-by-employee', method: 'GET', auth: true};
export const systemLovByTypeAPI = {url: '/systemlov/by-type', method: 'GET', auth: true};
export const profileForYearMonthAPI = {url: '/employeeprofile/list', method: 'GET', auth: true};
export const locationHeirarchyAPI = {url: '/employee/my-team', method: 'GET', auth: true};
export const allLocationAPI = {url: '/location/hierarchy', method: 'GET', auth: true};
export const divisionListAPI = {url: '/division/list', method: 'GET', auth: true};
export const locationAPI = {url: '/location', method: 'GET', auth: true};

export const fieldStructureAPI = {url: '/report/filed-structure', method: 'GET', auth: true};
export const effortReportAPI = {url: '/reports/effort', method: 'GET', auth: true};
export const dailyEffortReportAPI = {url: '/reports/effort/dailyeffort', method: 'GET', auth: true};
export const deviationReportAPI = {url: '/reports/effort/deviation', method: 'GET', auth: true};
export const doctorVisitReportAPI = {url: '/reports/effort/doctorvisit', method: 'GET', auth: true};
export const dmlReportAPI = {url: '/reports/customer/dml', method: 'GET', auth: true};

export const expenseForEmployeeYearMonth = {url: '/expense/by-month', method: 'GET', auth: true};
export const saveExpenseAPI = {url: '/expense/saveExpense', method: 'POST', auth: true};
export const visitedTownsByDateAPI = {url: '/expense/visited-towns', method: 'GET', auth: true};
export const distanceBetweenTownAPI = {url: '/distance/by-town-list', method: 'POST', auth: true};
export const allowancesByJobRoleAPI = {url: '/allowances/by-employee', method: 'GET', auth: true };
export const documentCountByDate = {url: '/expense/document-count', method: 'GET', auth: true};
export const documentById = {url: '/document/download', method: 'GET', auth: true};
export const submitExpenseAPI = {url: '/expensemaster/submit', method: 'PUT', auth: true};
export const searchExpenseAPI = {url: '/expensemaster/search', method: 'POST', auth: true};

export const searchMisExpenseApprovalAPI = {url: '/expensemaster/search', method: 'POST', auth: true};
export const approveExpenseApprovalAPI = {url: '/expense/approveExpenses', method: 'PUT', auth: true};
export const routesForEmployeeAndDateApi = {url: '/expense/routes', method: 'GET', auth: true};

export const townsAPI = {url: '/town/all', method: 'GET', auth: true};

export const expenseConsolidatedAPI = {url: '/expense/report/consolidation-report', method: 'GET', auth: true};


export const searchApprovalAPI = {url: '/approvals', method: 'GET', auth: true}
