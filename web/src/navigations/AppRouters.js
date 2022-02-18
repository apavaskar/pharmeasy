import Home from '../components/home/Home';
import EffortReportComponent from '../components/reports/EffortReportComponent';
import FieldStructureReportComponent from '../components/reports/FieldStructureReportComponent';
import MyExpenseSearchComponent from '../components/expense/MyExpenseSearchComponent';
import NewExpenseComponent from "../components/expense/NewExpenseComponent";
import MISExpenseSearchComponent from "../components/expense/mis/MISExpenseSearchComponent";
import ExpenseApprovalComponent from "../components/expense/mis/ExpenseApprovalComponent";
import DMLReportComponent from "../components/reports/DMLReportComponent";
import DailyEffortReportComponent from '../components/reports/DailyEffortReportComponent';
import DoctorVisitReportComponent from '../components/reports/DoctorVisitReportComponent';
import ExpenseConsolidatedReportComponent from '../components/expense/mis/ExpenseConsolidatedReportComponent'
import SFCComponent from "../components/custom/SFCComponent";
import ApprovalReportComponent from "../components/reports/ApprovalReportComponent";
import DeviationEffortReportComponent from "../components/reports/DeviationEffortReportComponent";


const routers = [
    {path: '/home', label: 'Home', component: Home},
    {path: '/home/reports/effort', label: 'Effort Report', component: EffortReportComponent},
    {path: '/home/reports/daily', label: 'Daily Effort Report', component: DailyEffortReportComponent},
    {path: '/home/reports/doctorvisit', label: 'Doctor Visit Report', component: DoctorVisitReportComponent},
    {path: '/home/reports/deviation', label: 'Deviation Report', component: DeviationEffortReportComponent},
    {path: '/home/reports/fieldstructure', label: 'Field Structure', component: FieldStructureReportComponent},
    {path: '/home/reports/dml', label: 'Doctor List', component: DMLReportComponent},
    {path: '/home/reporting/expense/search', label: 'Expense', component: MyExpenseSearchComponent},
    {path: '/home/reporting/expense/new/:date', label: 'Claim Expense', component: NewExpenseComponent},
    {path: '/home/reporting/expense/mis/search', label: 'Approve Expenses', component: MISExpenseSearchComponent},
    {path: '/home/reporting/expense/approvaldetails/:employeeId/:yearMonth', label: 'Approve Expenses', component: ExpenseApprovalComponent},
    {path: '/home/reporting/expense/mis/daily', label: 'Approve Expenses', component: DailyEffortReportComponent},
    {path: '/home/reporting/expense/mis/consolidated', label:'Expense Consolidated Report', component: ExpenseConsolidatedReportComponent},
    {path: '/home/reporting/expense/verify_distance', label:'Verify Distance', component: SFCComponent},
    {path: '/home/reports/approvals', label:'Approvals', component: ApprovalReportComponent},

];
export default routers;
