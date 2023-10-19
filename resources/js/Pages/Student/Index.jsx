import React from "react";
import Layout from "../../Layouts/Default";
import { Link, Head } from "@inertiajs/inertia-react";
import { FiPlus } from "react-icons/fi";

export default function StudentIndex({ students, session, current_route }) {
	const breadcrumb = [
		{
			url: `/home`,
			text: `Dashboard`
		},
		{
			url: `#`,
			text: `Students`
		}
	];
	return (
		<>
			<Head>
				<title>{breadcrumb[breadcrumb.length -1].text}</title>
			</Head>
			<Layout route={current_route} breadcrumb={breadcrumb}>
				<div className="container-fluid py-4">
					<div className="row">
						<div className="col-12">
							<div className="card mb-4">
								<div className="card-header pb-0">
									{ session.success && (
										<div className="alert alert-success alert-dismissible text-white text-xs fade show" role="alert">
											<span className="alert-text">{session.success}</span>
											<button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close">
												<span aria-hidden="true">&times;</span>
											</button>
										</div>
									) }
									<Link href={'/students/create'} className="d-flex d-lg-inline-flex align-items-center btn bg-gradient-warning me-2">
										<FiPlus className="me-1"/>
										Add new student
									</Link>
								</div>
								<div className="card-body px-0 pt-0 pb-2">
									<div className="table-responsive p-0">
										<table className="table align-items-center mb-0">
											<thead>
												<tr>
													<th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Student name</th>
													<th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">Participant active</th>
												</tr>
											</thead>
											<tbody>
												{ (students.length) ? students.map((item, index) => (
												<tr key={ index }>
													<td>
														<div className="px-3 py-1">
															<h6 className="text-sm mb-0">{ item.name }</h6>
															<div className="d-flex gap-2">
																<Link href={`/students/${item.id}/edit`} className="fw-bold text-primary text-xs" data-bs-toggle="tooltip" title="Edit student">
																	Edit
																</Link>
															</div>
														</div>
													</td>
													<td className="align-middle text-sm">{item.school.name}</td>
												</tr>
												)) :
												<tr>
													<td colSpan={2} className="text-center opacity-5 py-4">No student</td>
												</tr>
												}
											</tbody>
										</table>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</Layout>
		</>
	)
}
