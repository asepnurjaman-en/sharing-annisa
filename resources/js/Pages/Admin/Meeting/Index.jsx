import React, { useState } from "react";
import Layout from "../../../Layouts/Default";
import { Inertia } from "@inertiajs/inertia";
import { Link, Head } from "@inertiajs/inertia-react";
import { FiUsers, FiPlus, FiSave } from "react-icons/fi";
import flatpickr from "flatpickr";

export default function SchoolIndex({ meetings, session, errors, current_route }) {
	const breadcrumb = [
		{
			url: `/dashboard`,
			text: `Dashboard`
		},
		{
			url: `#`,
			text: `Meeting`
		}
	];
	const [name, setName] = useState('');
	const [periods, setPeriods] = useState('');
	const storeSchool = async (e) => {
		e.preventDefault();
		let submit = document.querySelector('button[type=submit]');
		Inertia.post('/admin/meetings', {
			name: name,
			periods: periods,
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

    React.useEffect(() => {
		flatpickr(".form-flatpickr", {
			mode: "range"
		});
	}, []);

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
										<span>Add new meeting</span>
									</Link>
								</div>
								<div className="card-body px-0 pt-0 pb-2">
									<div className="table-responsive p-0">
										<table className="table align-items-center mb-0">
											<thead>
												<tr>
													<th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Meeting name</th>
													<th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">Participants</th>
												</tr>
											</thead>
											<tbody>
												{ (meetings.length) ? meetings.map((item, index) => (
												<tr key={ index }>
													<td>
														<div className="px-3 py-1">
															<h6 className="text-sm mb-1"><span className="text-warning text-normal">[{item.formatted_start}]</span> { item.name }</h6>
															<div className="d-flex gap-2">
																<Link href={`/admin/meetings/${item.id}/edit`} className="fw-bold text-primary text-xs" data-bs-toggle="tooltip" title="Edit meeting">
																	Edit
																</Link>
															</div>
														</div>
													</td>
													<td className="align-middle text-sm">
														<Link href={`/admin/meetings/${item.id}`} className="d-inline-flex align-items-base btn bg-gradient-default text-xs" data-bs-toggle="tooltip" title="Manage meeting">
															<FiUsers className="me-1"/>
															<span className="d-none d-lg-inline">Manage meeting</span>
														</Link>
													</td>
												</tr>
												)) : 
												<tr>
													<td colSpan={2} className="text-center opacity-5 py-4">No meeting</td>
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
									Add new meeting
								</h5>
								<button type="button" className="btn bg-gradient-default text-danger mb-0" id="createModalClose" data-bs-dismiss="modal">&times;</button>
							</div>
							<form onSubmit={storeSchool}>
								<div className="modal-body">
									<div className="form-group">
										<label htmlFor="name" className="form-control-label">
                                            Meeting name
											{errors.name && (
												<b className={`text-danger ms-1`}>
													{errors.name}
												</b>
											)}
										</label>
										<input type="text" className={`form-control ` + (errors.name && (`is-invalid`))} placeholder="Meeting name" onChange={(e) => setName(e.target.value)}/>
									</div>
                                    <div className="form-group">
                                        <label htmlFor="periods" className="form-control-label">
                                            Period
                                            {errors.periods && (
                                                <b className={`text-danger ms-1`}>
                                                    {errors.periods}
                                                </b>
                                            )}
                                        </label>
                                        <input className={`form-control form-flatpickr ` + (errors.periods && (`is-invalid`))} placeholder="Please select periode" type="text" onFocus={(e) => setPeriods(e.target.value)}/>
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
