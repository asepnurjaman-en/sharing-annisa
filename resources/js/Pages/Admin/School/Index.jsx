import React, { useState } from "react";
import Layout from "../../../Layouts/Default";
import { Inertia } from "@inertiajs/inertia";
import { Link, Head } from "@inertiajs/inertia-react";
import { FiUsers, FiPlus, FiSave } from "react-icons/fi";

export default function SchoolIndex({ schools, session, errors, current_route }) {
	const breadcrumb = [
		{
			url: `/dashboard`,
			text: `Dashboard`
		},
		{
			url: `#`,
			text: `Schools`
		}
	];
	const [name, setName] = useState('');
	const storeSchool = async (e) => {
		e.preventDefault();
		let submit = document.querySelector('button[type=submit]');
		Inertia.post(`/admin/schools`, {
			name: name,
		},{
			onProgress: () => {
				submit.disabled = true;
				submit.children[1].textContent=`Saving...`;
			},
			onSuccess: () => {
				submit.disabled = false;
				document.querySelector('form').reset();
				document.querySelector('#createModalClose').click();
			}
		});
	};

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
									<Link type="button" className="d-flex d-lg-inline-flex align-items-center btn bg-gradient-warning" data-bs-toggle="modal" data-bs-target="#createModal">
										<FiPlus className="me-1"/>
										<span>Add new school</span>
									</Link>
								</div>
								<div className="card-body px-0 pt-0 pb-2">
									<div className="table-responsive p-0">
										<table className="table align-items-center mb-0">
											<thead>
												<tr>
													<th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">School name</th>
													<th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">Participants</th>
												</tr>
											</thead>
											<tbody>
												{ (schools.length) ? schools.map((item, index) => (
												<tr key={ index }>
													<td>
														<div className="px-3 py-1">
															<h6 className="text-sm mb-0">{ item.name }</h6>
															<div className="d-flex gap-2">
																<Link href={`/admin/schools/${item.id}/edit`} className="fw-bold text-primary text-xs" data-bs-toggle="tooltip" title="Edit school">
																	Edit
																</Link>
															</div>
														</div>
													</td>
													<td className="align-middle text-sm">
														<Link href={`/admin/schools/${item.id}`} className="d-inline-flex align-items-base btn bg-gradient-default text-xs" data-bs-toggle="tooltip" title="Manage students">
															<FiUsers className="me-1"/>
															<span className="d-none d-lg-inline">Manage students</span>
														</Link>
													</td>
												</tr>
												)) : 
												<tr>
													<td colSpan={2} className="text-center opacity-5 py-4">No school</td>
												</tr> }
											</tbody>
										</table>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				{/* Form */}
				<div className="modal fade" id="createModal" tabIndex="-1" role="dialog" aria-labelledby="createModalLabel" aria-hidden="true">
					<div className="modal-dialog modal-dialog-centered" role="document">
						<div className="modal-content">
							<div className="modal-header align-items-center">
								<h5 className="modal-title" id="createModalLabel">
									Add new school
								</h5>
								<button type="button" className="btn bg-gradient-default text-danger mb-0" id="createModalClose" data-bs-dismiss="modal">&times;</button>
							</div>
							<form onSubmit={storeSchool}>
								<div className="modal-body">
									<div className="form-group">
										<label htmlFor="name" className="form-control-label">
											School name
											{errors.name && (
												<b className={`text-danger ms-1`}>
													{errors.name}
												</b>
											)}
										</label>
										<input type="text" className={`form-control ` + (errors.name && (`is-invalid`))} placeholder="School name" onChange={(e) => setName(e.target.value)}/>
									</div>
								</div>
								<div className="modal-footer">
									<button type="submit" className="btn bg-gradient-primary w-100 w-lg-auto">
										<FiSave className="me-1"/>
										<span>Save</span>
									</button>
								</div>
							</form>
						</div>
					</div>
				</div>
			</Layout>
		</>
	)
}
