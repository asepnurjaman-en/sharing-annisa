import React, { useState } from "react";
import Layout from "../../Layouts/Default";
import { Link, Head, usePage } from "@inertiajs/inertia-react";
import { FiUsers, FiCast, FiChevronRight, FiRadio, FiCalendar } from "react-icons/fi";

export default function DashboardIndex({ data, meetings, current_route }) {
	const breadcrumb = [
		{
			url: `#`,
			text: `Dashboard`
		}
	];
	const { auth } = usePage().props;

	return (
		<>
			<Head>
				<title>{breadcrumb[breadcrumb.length -1].text}</title>
			</Head>
			<Layout route={current_route} breadcrumb={breadcrumb}>
				<div className="container-fluid py-4">
					<div className="row gap-2">
						<div className="col-xl-3 col-md-4 col-sm-60">
							<div className="card">
								<div className="card-body p-3">
									<div className="row">
										<div className="col-8">
											<div className="numbers">
												<p className="text-sm mb-0 font-weight-bold">We have</p>
												<h5 className="font-weight-bolder fs-3 mb-0">
													{data.students}
												</h5>
												<p className="text-sm mb-0">Participants</p>
											</div>
										</div>
										<div className="col-4">
											<div className="icon icon-shape bg-gradient-default shadow rounded-circle d-flex align-items-center justify-content-center flex-end">
												<FiUsers className="text-warning fs-4" />
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div className="col-xl-3 col-md-4 col-sm-60">
							<div className="card">
								<div className="card-body p-3">
									<div className="row">
										<div className="col-8">
											<div className="numbers">
												<p className="text-sm mb-0 font-weight-bold">We has</p>
												<h5 className="font-weight-bolder fs-3 mb-0">
													{data.meetings}
												</h5>
												<p className="text-sm mb-0">Meetings</p>
											</div>
										</div>
										<div className="col-4">
											<div className="icon icon-shape bg-gradient-default shadow rounded-circle d-flex align-items-center justify-content-center flex-end">
												<FiCast className="text-warning fs-4" />
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="row mt-3 mt-lg-5">
						<div className="col-lg-6">
							<div className="card">
								<div className="card-header pb-0 p-3">
									<h6 className="mb-0">Meetings ongoing</h6>
								</div>
								<div className="card-body p-3">
									<ul className="list-group">
										{ (meetings.ongoing.length) ? meetings.ongoing.map((item, index) => (
										<li className="list-group-item border-0 d-flex justify-content-between ps-0 mb-2 border-radius-lg" key={index}>
											<div className="d-flex align-items-center">
												<div className="icon icon-shape icon-sm me-3 bg-gradient-warning shadow text-center">
													<FiRadio className="text-white"/>
												</div>
												<div className="d-flex flex-column">
													<h6 className="mb-1 text-dark text-sm">{item.name}</h6>
													<span className="text-xs"><span className="font-weight-bold">{item.participants_count}</span> participants</span>
												</div>
											</div>
											<div className="d-flex">
												<Link href={`/admin/meetings/${item.id}`} className="btn btn-link btn-icon-only btn-rounded btn-sm text-dark icon-move-right my-auto">
													<FiChevronRight />
												</Link>
											</div>
										</li>
										)) :
										<li className="list-group-item border-0">
											<div className="text-muted text-center opacity-5 p-3">No meeting</div>
										</li> }
									</ul>
								</div>
							</div>
						</div>
						<div className="col-lg-6">
							<div className="card">
								<div className="card-header pb-0 p-3">
									<h6 className="mb-0">Meetings scheduled</h6>
								</div>
								<div className="card-body p-3">
									<ul className="list-group">
										{ (meetings.scheduled.length) ? meetings.scheduled.map((item, index) => (
										<li className="list-group-item border-0 d-flex justify-content-between ps-0 mb-2 border-radius-lg" key={index}>
											<div className="d-flex align-items-center">
												<div className="icon icon-shape icon-sm me-3 bg-gradient-primary shadow text-center">
													<FiCalendar className="text-white" />
												</div>
												<div className="d-flex flex-column">
													<h6 className="mb-1 text-dark text-sm">{item.name}</h6>
													<span className="text-xs">{item.formatted_start}, <span className="font-weight-bold">{item.participants_count}</span> participants</span>
												</div>
											</div>
											<div className="d-flex">
												<Link href={`/admin/meetings/${item.id}`} className="btn btn-link btn-icon-only btn-rounded btn-sm text-dark icon-move-right my-auto">
													<FiChevronRight />
												</Link>
											</div>
										</li>
										)) :
										<li className="list-group-item border-0">
											<div className="text-muted text-center opacity-5 p-3">No meeting</div>
										</li> }
									</ul>
								</div>
							</div>
						</div>
					</div>
				</div>
			</Layout>
		</>
	)
}