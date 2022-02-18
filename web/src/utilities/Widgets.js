import { Button } from 'primereact/button';
import React from 'react';

export const Widgets = () => {

	return (
		<div className="p-grid">
			<div className="p-col-12">
				<div className="card">
					<h4>Summary Boxes</h4>
					<div className="p-grid">
						<div className="p-col-12 p-md-3 widget-summary-box summary-box-messages">
							<div className="card">
								<div className="summary-box-title">Messages</div>
								<p>152</p>
								<img src="assets/layout/images/dashboard/icon-messages.svg" alt="sapphire" className="summary-box-icon" />
								<img src="assets/layout/images/dashboard/graph-messages.svg" alt="sapphire" className="summary-box-graph" />
							</div>
						</div>

						<div className="p-col-12 p-md-3 widget-summary-box summary-box-checkins">
							<div className="card">
								<div className="summary-box-title">Checkins</div>
								<p>532</p>
								<img src="assets/layout/images/dashboard/icon-checkins.svg" alt="sapphire" className="summary-box-icon" />
								<img src="assets/layout/images/dashboard/graph-checkins.svg" alt="sapphire" className="summary-box-graph" />
							</div>
						</div>

						<div className="p-col-12 p-md-3 widget-summary-box summary-box-filessynced">
							<div className="card">
								<div className="summary-box-title">Files Synced</div>
								<p>28</p>
								<img src="assets/layout/images/dashboard/icon-filessynced.svg" alt="sapphire" className="summary-box-icon" />
								<img src="assets/layout/images/dashboard/graph-filessynced.svg" alt="sapphire" className="summary-box-graph" />
							</div>
						</div>

						<div className="p-col-12 p-md-3 widget-summary-box summary-box-usersonline">
							<div className="card">
								<div className="summary-box-title">Users Online</div>
								<p>256</p>
								<img src="assets/layout/images/dashboard/icon-usersonline.svg" alt="sapphire" className="summary-box-icon" />
								<img src="assets/layout/images/dashboard/graph-usersonline.svg" alt="sapphire" className="summary-box-graph" />
							</div>
						</div>
					</div>
				</div>
			</div>

			<div className="p-col-12">
				<div className="card">
					<h4>Overview Boxes</h4>
					<div className="p-grid">
						<div className="p-col-12 p-sm-6 p-xl-4 widget-overview-box monthly-sales">
							<div className="card">
								<div className="card-title">Monthly Sales</div>
								<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis aliquam sed purus non porta. </p>
								<img src="assets/layout/images/dashboard/asset-stats.svg" alt="sapphire" />
							</div>
						</div>

						<div className="p-col-12 p-sm-6 p-xl-4 widget-overview-box total-views">
							<div className="card">
								<div className="card-title">Total Views</div>
								<div className="overview-numbers">26520 / day</div>
								<img src="assets/layout/images/dashboard/asset-graph.svg" alt="sapphire" />
							</div>
						</div>

						<div className="p-col-12 p-xl-4 widget-overview-box connections">
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
											<div className="p-col-6"><span>644,421</span> <i className="legend-arrow pi pi-caret-up"></i></div>

											<div className="p-col-6"><span className="dot dot-red"></span>Offline</div>
											<div className="p-col-6">537,777 <i className="legend-arrow pi pi-caret-up"></i></div>

											<div className="p-col-6"><span className="dot dot-orange"></span>Pending</div>
											<div className="p-col-6">570,099 <i className="legend-arrow pi pi-caret-up"></i></div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div className="p-col-12 p-lg-6">
				<div className="widget-team card">
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
							</div>
						</li>
					</ul>
				</div>

				<div className="p-col-12">
					<div className="widget-location widget-timeline card">
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
							<Button label="READ MORE" className="p-button-link p-mb-2 p-mr-2"></Button>
						</div>
					</div>
				</div>
			</div>

			<div className="p-col-12 p-lg-6">
				<div className="widget-timeline card">
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
									<div className="event-detail">Ab nobis, magnam sunt eum. Laudantium, repudiandae, similique!.</div>
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
									<div className="event-detail">Omnis veniam quibusdam ratione est repellat qui nam quisquam ab mollitia dolores ullam voluptates, similique, dignissimos.</div>
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
									<div className="event-detail">Quibusdam ratione est repellat qui nam quisquam veniam quibusdam ratione..</div>
									<span className="timeline-clock"><i className="pi pi-clock"></i><span>16:24</span></span>
								</div>
							</div>
						</li>
					</ul>
				</div>
			</div>

			<div className="p-col-12 p-lg-4">
				<div className="widget-userprofile card">
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

			<div className="p-col-12 p-lg-4">
				<div className="widget-weather card">
					<div className="weather-image">
						<div className="city-name">Prime City</div>
						<div className="weather-today">Snow</div>
						<div className="weather-degree">11 <span>&#8451;</span></div>
					</div>
					<div className="p-grid weekdays">
						<div className="p-col-6">Monday</div>
						<div className="p-col-6 weather-degree-col">-2 <span>&#8451;</span><img src="assets/layout/images/dashboard/asset-weathericon-2.svg" alt="sapphire" /></div>
						<div className="p-col-6">Tuesday</div>
						<div className="p-col-6 weather-degree-col">--7 <span>&#8451;</span><img src="assets/layout/images/dashboard/asset-weathericon-3.svg" alt="sapphire" /></div>
						<div className="p-col-6">Wednesday</div>
						<div className="p-col-6 weather-degree-col">2 <span>&#8451;</span><img src="assets/layout/images/dashboard/asset-weathericon-4.svg" alt="sapphire" /></div>
						<div className="p-col-6">Thursday</div>
						<div className="p-col-6 weather-degree-col">4 <span>&#8451;</span><img src="assets/layout/images/dashboard/asset-weathericon-2.svg" alt="sapphire" /></div>
						<div className="p-col-6">Friday</div>
						<div className="p-col-6 weather-degree-col">0 <span>&#8451;</span><img src="assets/layout/images/dashboard/asset-weathericon-3.svg" alt="sapphire" /></div>
					</div>

				</div>
			</div>

			<div className="p-col-12 p-lg-4">
				<div className="widget-pricing-box">
					<div className="pricing-header">
						<h3>Pro</h3>
						<p className="pricing-fee"><b>$59</b>/mo</p>
					</div>

					<div className="pricing-content">
						<ul>
							<li><i className="pi pi-check"></i> Responsive</li>
							<li><i className="pi pi-check"></i> Push Messages</li>
							<li><i className="pi pi-check"></i> 10 Support Tickets</li>
							<li><i className="pi pi-check"></i> Free Shipping</li>
							<li><i className="pi pi-times" style={{ color: '#e53935' }}></i> Unlimited Space</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
	)
}
