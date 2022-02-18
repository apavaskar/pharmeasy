import React, { useState, useEffect } from 'react';
import { Checkbox } from 'primereact/components/checkbox/Checkbox';
import { Button } from 'primereact/components/button/Button';
import { DataTable } from 'primereact/components/datatable/DataTable';
import { Column } from 'primereact/components/column/Column';
import { Chart } from 'primereact/chart';
import { InputSwitch } from 'primereact/inputswitch';
import ProductService from '../service/ProductService';

const chartData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [{
        label: 'Sales',
        data: [12, 19, 3, 5, 2, 3, 9],
        borderColor: [
            '#4CAF50',
        ],
        borderWidth: 3,
        borderDash: [5, 5],
        fill: false,
        pointRadius: 3
    }, {
        label: 'Income',
        data: [1, 2, 5, 3, 12, 7, 15],
        backgroundColor: [
            'rgba(187,222,251,0.2)',
        ],
        borderColor: [
            '#00BCD4',
        ],
        borderWidth: 3,
        fill: true
    },
    {
        label: 'Expenses',
        data: [7, 12, 15, 5, 3, 13, 21],
        borderColor: [
            '#e91e63',
        ],
        borderWidth: 3,
        fill: false,
        pointRadius: [4, 6, 4, 12, 8, 0, 4]
    },
    {
        label: 'New Users',
        data: [3, 7, 2, 17, 15, 13, 19],
        borderColor: [
            '#FF8F00',
        ],
        borderWidth: 3,
        fill: false
    }]
}

const chartOptions = {
    maintainAspectRatio: false,
    responsive: true,
    hover: {
        mode: 'index'
    },
    scales: {
        xAxes: [{
            display: true,
            scaleLabel: {
                display: true,
                labelString: 'Month'
            }
        }],
        yAxes: [{
            display: true,
            scaleLabel: {
                display: true,
                labelString: 'Value'
            }
        }]
    }
}

const Dashboard = () => {

	const [products, setProducts] = useState(null);
	const [selectedProduct, setSelectedProduct] = useState(null);
	const [tasks, setTasks] = useState([]);
	const [checked1, setChecked1] = useState(true);
	const [checked2, setChecked2] = useState(true);
	const [checked3, setChecked3] = useState(true);
	const [checked4, setChecked4] = useState(true);
	const [checked5, setChecked5] = useState(true);
	const [checked6, setChecked6] = useState(true);
	const [checked7, setChecked7] = useState(false);
	const [checked8, setChecked8] = useState(false);
	const [checked9, setChecked9] = useState(false);

	useEffect(() => {
		const productService = new ProductService();
		productService.getProductsSmall().then(data => setProducts(data))
	}, [])

	const logoTemplate = (rowData, column) => {
		var src = "assets/demo/images/product/" + rowData.image;
		return <img src={src} alt={rowData.brand} width="50px" />;
	}

	const actionTemplate = (rowData, column) => {
		return <div className="p-grid">
			<Button icon="pi pi-search" type="button" className="p-button-success p-mr-2 p-mb-1"></Button>
			<Button icon="pi pi-times" type="button" className="p-button-danger p-mb-1"></Button>
		</div>
	}

	const formatCurrency = (value) => {
		return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
    };

	const onTaskChange = (e) => {
		let selectedTasks = [...tasks];
		if (e.checked)
			selectedTasks.push(e.value);
		else
			selectedTasks.splice(selectedTasks.indexOf(e.value), 1);
		setTasks(selectedTasks)
    }

    const bodyTemplate = (data, props) => {
        return (
            <>
                <span className="p-column-title">{props.header}</span>
                {data[props.field]}
            </>
        );
    };

    const priceBodyTemplate = (data) => {
        return (
            <>
                <span className="p-column-title">Price</span>
                {formatCurrency(data.price)}
            </>
        );
    };

	return (
		<div className="dashboard">
			<div className="p-grid dashboard-grid">
				<div className="p-col-12 p-sm-6 p-xl-4 overview-box monthly-sales">
					<div className="card">
						<div className="card-title">Monthly Sales</div>
						<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis aliquam sed purus non
							porta. </p>
						<img src="assets/layout/images/dashboard/asset-stats.svg" alt="sapphire" />
					</div>
				</div>

				<div className="p-col-12 p-sm-6 p-xl-4 overview-box total-views">
					<div className="card">
						<div className="card-title">Total Views</div>
						<div className="overview-numbers">26520 / day</div>
						<img src="assets/layout/images/dashboard/asset-graph.svg" alt="sapphire" />
					</div>
				</div>

				<div className="p-col-12 p-xl-4 overview-box connections">
					<div className="card">
						<div className="card-title">Connections</div>
						<div className="overview-numbers">2,449,570</div>
						<div className="p-grid">
							<div className="p-col-4 connection-chart">
								<img src="assets/layout/images/dashboard/asset-connectiongraph.svg" alt="sapphire" />
							</div>
							<div className="p-col-8 connection-chart-legend">
								<div className="p-grid">
									<div className="p-col-6"><span className="dot dot-green"></span>Online</div>
									<div className="p-col-6"><span>644,421</span>  <i className="legend-arrow pi pi-caret-up"></i></div>

									<div className="p-col-6"><span className="dot dot-red"></span>Offline</div>
									<div className="p-col-6">537,777 <i className="legend-arrow pi pi-caret-up"></i></div>

									<div className="p-col-6"><span className="dot dot-orange"></span>Pending</div>
									<div className="p-col-6">570,099 <i className="legend-arrow pi pi-caret-up"></i></div>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div className="p-col-12 p-md-3 summary-box summary-box-messages">
					<div className="card">
						<div className="summary-box-title">Messages</div>
						<p>152</p>
						<img src="assets/layout/images/dashboard/icon-messages.svg" alt="sapphire" className="summary-box-icon" />
						<img src="assets/layout/images/dashboard/graph-messages.svg" alt="sapphire" className="summary-box-graph" />
					</div>
				</div>

				<div className="p-col-12 p-md-3 summary-box summary-box-checkins">
					<div className="card">
						<div className="summary-box-title">Checkins</div>
						<p>532</p>
						<img src="assets/layout/images/dashboard/icon-checkins.svg" alt="sapphire" className="summary-box-icon" />
						<img src="assets/layout/images/dashboard/graph-checkins.svg" alt="sapphire" className="summary-box-graph" />
					</div>
				</div>

				<div className="p-col-12 p-md-3 summary-box summary-box-filessynced">
					<div className="card">
						<div className="summary-box-title">Files Synced</div>
						<p>28</p>
						<img src="assets/layout/images/dashboard/icon-filessynced.svg" alt="sapphire" className="summary-box-icon" />
						<img src="assets/layout/images/dashboard/graph-filessynced.svg" alt="sapphire" className="summary-box-graph" />
					</div>
				</div>

				<div className="p-col-12 p-md-3 summary-box summary-box-usersonline">
					<div className="card">
						<div className="summary-box-title">Users Online</div>
						<p>256</p>
						<img src="assets/layout/images/dashboard/icon-usersonline.svg" alt="sapphire" className="summary-box-icon" />
						<img src="assets/layout/images/dashboard/graph-usersonline.svg" alt="sapphire" className="summary-box-graph" />
					</div>
				</div>

				<div className="p-col-12 p-lg-6">
					<div className="tasks card">
						<div className="tasks-progress">
							<div className="tasks-progress-value"></div>
						</div>
						<div className="tasks-header">
							You have <span className="task-number">4</span> Pending Tasks.
						</div>
						<ul>
							<li>
								<div className="p-grid p-nogutter">
									<div className="p-col-fixed p-col-align-center">
										<Checkbox value="task1" onChange={onTaskChange} checked={tasks.indexOf('task1') > -1 ? true : false}></Checkbox>
									</div>
									<div className="p-col">
										<div className="task-content">
											<div className="task-name">Sales Report</div>
											<div className="tasks-detail">Assigned by James Harrison</div>

										</div>
									</div>
									<div className="p-col-fixed p-col-align-center">
										<i className="pi pi-heart"></i>
									</div>
								</div>
							</li>
							<li>
								<div className="p-grid p-nogutter">
									<div className="p-col-fixed p-col-align-center">
										<Checkbox value="task2" onChange={onTaskChange} checked={tasks.indexOf('task2') > -1 ? true : false}></Checkbox>
									</div>
									<div className="p-col">
										<div className="task-content">
											<div className="task-name">Pay Invoices</div>
											<div className="tasks-detail">Assigned by Jane Davidson</div>
										</div>
									</div>
									<div className="p-col-fixed p-col-align-center">
										<i className="pi pi-heart"></i>
									</div>
								</div>
							</li>
							<li>
								<div className="p-grid p-nogutter">
									<div className="p-col-fixed p-col-align-center">
										<Checkbox value="task3" onChange={onTaskChange} checked={tasks.indexOf('task3') > -1 ? true : false}></Checkbox>
									</div>
									<div className="p-col">
										<div className="task-content">
											<div className="task-name">Customer Meeting</div>
											<div className="tasks-detail">Assigned by Sarah Williams</div>
										</div>
									</div>
									<div className="p-col-fixed p-col-align-center">
										<i className="pi pi-heart"></i>
									</div>
								</div>
							</li>
							<li>
								<div className="p-grid p-nogutter">
									<div className="p-col-fixed p-col-align-center">
										<Checkbox value="task4" onChange={onTaskChange} checked={tasks.indexOf('task4') > -1 ? true : false}></Checkbox>
									</div>
									<div className="p-col">
										<div className="task-content">
											<div className="task-name">Expense Reports</div>
											<div className="tasks-detail">Assigned by James Harrison</div>
										</div>
									</div>
									<div className="p-col-fixed p-col-align-center">
										<i className="pi pi-heart"></i>
									</div>
								</div>
							</li>
						</ul>
					</div>
				</div>

				<div className="p-col-12 p-lg-6">
					<div className="team card">
						<div className="card-title">Team Members</div>
						<ul>
							<li>
								<div className="p-grid p-nogutter">
									<div className="p-col-fixed p-col-align-center">
										<img src="assets/layout/images/dashboard/avatar-1.jpg" alt="sapphire" />
									</div>
									<div className="p-col">
										<div className="member-content">
											<div className="member-name">Anne-Marije Marking</div>
											<div className="member-status">
												<div className="dot dot-red"></div>
												<span>In a meeting</span>
											</div>
										</div>
									</div>
									<div className="p-col-fixed p-col-align-center">
										<Button icon="pi pi-check" className="p-button-info" />
										<Button icon="pi pi-refresh" className="p-button-warning" />
									</div>
								</div>
							</li>
							<li>
								<div className="p-grid p-nogutter">
									<div className="p-col-fixed p-col-align-center">
										<img src="assets/layout/images/dashboard/avatar-2.jpg" alt="sapphire" />
									</div>
									<div className="p-col">
										<div className="member-content">
											<div className="member-name">Gabriel Soares</div>
											<div className="member-status">
												<div className="dot dot-green"></div>
												<span>Online</span>
											</div>
										</div>
									</div>
									<div className="p-col-fixed p-col-align-center">
										<Button icon="pi pi-check" className="p-button-info" />
										<Button icon="pi pi-refresh" className="p-button-warning" />
									</div>
								</div>
							</li>
							<li>
								<div className="p-grid p-nogutter">
									<div className="p-col-fixed p-col-align-center">
										<img src="assets/layout/images/dashboard/avatar-3.jpg" alt="sapphire" />
									</div>
									<div className="p-col">
										<div className="member-content">
											<div className="member-name">Hector Mariano</div>
											<div className="member-status">
												<div className="dot dot-green"></div>
												<span>Online</span>
											</div>
										</div>
									</div>
									<div className="p-col-fixed p-col-align-center">
										<Button icon="pi pi-check" className="p-button-info" />
										<Button icon="pi pi-refresh" className="p-button-warning" />
									</div>
								</div>
							</li>
							<li>
								<div className="p-grid p-nogutter">
									<div className="p-col-fixed p-col-align-center">
										<img src="assets/layout/images/dashboard/avatar-4.jpg" alt="sapphire" />
									</div>
									<div className="p-col">
										<div className="member-content">
											<div className="member-name">Paulina Gayoso</div>
											<div className="member-status">
												<div className="dot dot-orange"></div>
												<span>Commuting</span>
											</div>
										</div>
									</div>
									<div className="p-col-fixed p-col-align-center">
										<Button icon="pi pi-check" className="p-button-info" />
										<Button icon="pi pi-refresh" className="p-button-warning" />
									</div>
								</div>
							</li>
						</ul>
					</div>
				</div>

				<div className="p-col-12 p-lg-4">
					<div className="userprofile card">
						<img src="assets/layout/images/dashboard/asset-profile.jpg" alt="sapphire" className="userprofile-bg" />
						<img src="assets/layout/images/avatar.png" alt="sapphire" className="userprofile-avatar" />
						<div className="userprofile-name">Helena Brauer</div>
						<div className="userprofile-role">Business Management</div>

						<div className="p-grid p-nogutter userprofile-legend">
							<div className="p-col-12 p-lg-4 userprofile-completed">
								<div className="userprofile-circle"></div>
								<div className="userprofile-status">COMPLETED</div>
								<div className="userprofile-value">190</div>
							</div>
							<div className="p-col-12 p-lg-4 userprofile-snoozed">
								<div className="userprofile-circle"></div>
								<div className="userprofile-status">SNOOZED</div>
								<div className="userprofile-value">64</div>
							</div>
							<div className="p-col-12 p-lg-4 userprofile-overdue">
								<div className="userprofile-circle"></div>
								<div className="userprofile-status">OVERDUE</div>
								<div className="userprofile-value">28</div>
							</div>
						</div>
					</div>
				</div>

				<div className="p-col-12 p-lg-8">
					<div className="quarterreport card">
						<div className="card-title">Quarter Report</div>
						<div className="dashboard-chart-container">
							<Chart type="line" data={chartData} options={chartOptions} style={{height: '325px'}}/>
						</div>
					</div>
				</div>

				<div className="p-col-12 p-lg-6">
					<div className="p-grid controlpanel">
						<div className="p-col-6 p-lg-4">
							<div className="switchpanel card">
								<div className="switch-name">Wireless Status</div>
								<span className="switch-status">Stable</span>
								<InputSwitch checked={checked1} onChange={(e) => setChecked1(e.value)} />
							</div>
						</div>
						<div className="p-col-6 p-lg-4">
							<div className="switchpanel card">
								<div className="switch-name">Cooling Systems</div>
								<span className="switch-status">Stable</span>
								<InputSwitch checked={checked2} onChange={(e) => setChecked2(e.value)} />
							</div>
						</div>
						<div className="p-col-6 p-lg-4">
							<div className="switchpanel card">
								<div className="switch-name">HQ Security</div>
								<span className="switch-status">Offline</span>
								<InputSwitch checked={checked3} onChange={(e) => setChecked3(e.value)} />
							</div>
						</div>
						<div className="p-col-6 p-lg-4">
							<div className="switchpanel card">
								<div className="switch-name">Help Desk Load</div>
								<span className="switch-status">Stable</span>
								<InputSwitch checked={checked4} onChange={(e) => setChecked4(e.value)} />
							</div>
						</div>
						<div className="p-col-6 p-lg-4">
							<div className="switchpanel card switchpanel-off">
								<div className="switch-name">Meeting Intensity</div>
								<span className="switch-status">Critical</span>
								<InputSwitch checked={checked5} disabled={true} onChange={(e) => setChecked5(e.value)} />
							</div>
						</div>
						<div className="p-col-6 p-lg-4">
							<div className="switchpanel card">
								<div className="switch-name">Energy Backup</div>
								<span className="switch-status">Stable</span>
								<InputSwitch checked={checked6} onChange={(e) => setChecked6(e.value)} />
							</div>
						</div>
						<div className="p-col-6 p-lg-4">
							<div className="switchpanel card switchpanel-off">
								<div className="switch-name">Coffee Machine</div>
								<span className="switch-status">Offline</span>
								<InputSwitch checked={checked7} onChange={(e) => setChecked7(e.value)} />
							</div>
						</div>
						<div className="p-col-6 p-lg-4">
							<div className="switchpanel card">
								<div className="switch-name">Game Console</div>
								<span className="switch-status">Stable</span>
								<InputSwitch checked={checked8} onChange={(e) => setChecked8(e.value)} />
							</div>
						</div>
						<div className="p-col-6 p-lg-4">
							<div className="switchpanel card">
								<div className="switch-name">Network</div>
								<span className="switch-status">Stable</span>
								<InputSwitch checked={checked9} onChange={(e) => setChecked9(e.value)} />
							</div>
						</div>
						<div className="p-col-12">
							<div className="location card">
								<img src="assets/layout/images/dashboard/puebla.jpg" alt="sapphire" />
								<div className="location-content">
									<div className="p-grid">
										<div className="p-col-fixed p-col-align-top">
											<div className="icon-container">
												<i className="pi pi-map-marker"></i>
											</div>
										</div>
										<div className="p-col">
											<div className="location-name">Puebla</div>
											<div className="location-subtitle">Where the magic happens</div>
										</div>
									</div>

									<p>Earum porro tenetur consequuntur veritatis eos vel natus quisquam.</p>
									<Button label="READ MORE" className="p-button-link"></Button>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div className="p-col-12 p-lg-6">
					<div className="timeline card">
						<div className="card-title">Recent Activities</div>
						<ul>
							<li>
								<div className="p-grid p-nogutter">
									<div className="p-col-fixed p-col-align-top">
										<div className="icon-container">
											<i className="pi pi-map-marker"></i>
										</div>
									</div>
									<div className="p-col">
										<div className="event-owner">Katherine May</div>
										<div className="event-detail">Lorem ipsun dolor amet</div>
										<div className="p-grid p-nogutter">
											<div className="p-col-4">
												<img src="assets/layout/images/dashboard/timeline-1.jpg" alt="sapphire" />
											</div>
											<div className="p-col-4">
												<img src="assets/layout/images/dashboard/timeline-2.jpg" alt="sapphire" />
											</div>
											<div className="p-col-4">
												<img src="assets/layout/images/dashboard/timeline-3.jpg" alt="sapphire" />
											</div>
										</div>
										<span className="timeline-clock"><i className="pi pi-clock"></i><span>12:30</span></span>
									</div>
								</div>
							</li>
							<li>
								<div className="p-grid p-nogutter">
									<div className="p-col-fixed p-col-align-top">
										<div className="icon-container">
											<i className="pi pi-ticket"></i>
										</div>
									</div>
									<div className="p-col">
										<div className="event-owner">Brandon Williams</div>
										<div className="event-detail">Ab nobis, magnam sunt eum. Laudantium,
										repudiandae, similique!.
										</div>
										<span className="timeline-clock"><i className="pi pi-clock"></i><span>14:39</span></span>
									</div>
								</div>
							</li>
							<li>
								<div className="p-grid p-nogutter">
									<div className="p-col-fixed p-col-align-top">
										<div className="icon-container">
											<i className="pi pi-lock"></i>
										</div>
									</div>
									<div className="p-col">
										<div className="event-owner">Stephan Ward</div>
										<div className="event-detail">Omnis veniam quibusdam ratione est repellat qui
										nam quisquam ab mollitia dolores ullam voluptates, similique, dignissimos.
										</div>
										<img src="assets/layout/images/dashboard/timeline-4.jpg" alt="sapphire" />
										<span className="timeline-clock"><i className="pi pi-clock"></i><span>14:52</span></span>
									</div>
								</div>
							</li>
							<li>
								<div className="p-grid p-nogutter location">
									<div className="p-col-fixed p-col-align-top">
										<div className="icon-container">
											<i className="pi pi-image"></i>
										</div>
									</div>
									<div className="p-col">
										<div className="event-owner">Lara Cohen</div>
										<div className="event-detail">Quibusdam ratione est repellat qui nam quisquam
										veniam quibusdam ratione..
										</div>
										<span className="timeline-clock"><i
											className="pi pi-clock"></i><span>16:24</span></span>
									</div>
								</div>
							</li>
						</ul>
					</div>
				</div>

				<div className="p-col-12 p-lg-4">
					<div className="weather card">
						<div className="weather-image">
							<div className="city-name">Prime City</div>
							<div className="weather-today">Snow</div>
							<div className="weather-degree">11 <span>&#8451;</span></div>
						</div>
						<div className="p-grid weekdays">
							<div className="p-col-6">Monday</div>
							<div className="p-col-6 weather-degree-col">-2
                                <span>&#8451;</span><img src="assets/layout/images/dashboard/asset-weathericon-2.svg" alt="sapphire" />
							</div>
							<div className="p-col-6">Tuesday</div>
							<div className="p-col-6 weather-degree-col">-7
                                <span>&#8451;</span><img src="assets/layout/images/dashboard/asset-weathericon-3.svg" alt="sapphire" />
							</div>
							<div className="p-col-6">Wednesday</div>
							<div className="p-col-6 weather-degree-col">2
                                <span>&#8451;</span><img src="assets/layout/images/dashboard/asset-weathericon-4.svg" alt="sapphire" />
							</div>
							<div className="p-col-6">Thursday</div>
							<div className="p-col-6 weather-degree-col">4
                                <span>&#8451;</span><img src="assets/layout/images/dashboard/asset-weathericon-2.svg" alt="sapphire" />
							</div>
							<div className="p-col-6">Friday</div>
							<div className="p-col-6 weather-degree-col">0
                                <span>&#8451;</span><img src="assets/layout/images/dashboard/asset-weathericon-3.svg" alt="sapphire" />
							</div>
						</div>

					</div>
				</div>

				<div className="p-col-12 p-lg-8">
					<div className="inventory card">
						<DataTable value={products} style={{ marginBottom: '20px' }} className="p-datatable-orders" responsive={true} paginator={true} rows={5}
							selection={selectedProduct} onSelectionChange={(e) => setSelectedProduct(e.value)}>
							<Column header="Logo" body={logoTemplate} />
							<Column field="name" header="Name" sortable body={bodyTemplate} />
							<Column field="category" header="Category" sortable body={bodyTemplate} />
							<Column field="price" header="Price" sortable body={priceBodyTemplate} />
							<Column header="View" body={actionTemplate} />
						</DataTable>
					</div>
				</div>
			</div>
		</div>
	)

}
export default Dashboard;