import React, { useState } from 'react';
import Layout from '../../../Layouts/Default';
import { Inertia } from '@inertiajs/inertia';
import { Link, Head } from '@inertiajs/inertia-react';
import { FiChevronLeft, FiSave, FiTrash2 } from "react-icons/fi";
import Swal from "sweetalert2";

export default function ManageStudent({ account, session, errors, current_route }) {
	const breadcrumb = [
		{
			url: `/dashboard`,
			text: `Dashboard`
		},
        {
			url: `/admin/students`,
			text: `Students`
		},
		{
			url: `#`,
			text: `Edit account ${account.name}`
		}
	];
	const [email, setEmail] = useState(account.email);
	const [password, setPassword] = useState('');
	const [passwordConfirmation, setPasswordConfirmation] = useState('');

	const updateStudent = async (e) => {
		e.preventDefault();
		let submit = document.querySelector('button[type=submit]');
		Inertia.put(`/admin/students/${account.id}/edit-account`, {
			email: email,
			password: password,
			password_confirmation: passwordConfirmation
		}, {
			onProgress: () => {
				submit.disabled = true;
				submit.children[1].textContent=`Saving...`;
			},
			onSuccess: () => {
				submit.disabled = false;
			}
		});
	};
	const deleteStudent = async (id) => {
		Swal.fire({
			title: `Delete this account?`,
			text: `Account ${account.name} will be deleted.`, 
			icon: `question`,
			showCancelButton: true,
			reverseButtons: true,
			customClass: {
				confirmButton: `btn bg-gradient-danger mx-1`,
				cancelButton: `btn bg-gradient-default mx-1`
			},
			buttonsStyling: false,
			allowOutsideClick: false
		}).then((response) => {
			if (response.isConfirmed) {
				Inertia.delete(`/admin/students/${id}/delete-account`);
			}
		});
	}

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
								<form onSubmit={updateStudent}>
									<div className="card-header pb-0">
                                        { session.success && (
                                            <div className="alert alert-success alert-dismissible text-white text-xs fade show" role="alert">
                                                <span className="alert-text">{session.success}</span>
                                                <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close">
                                                    <span aria-hidden="true">&times;</span>
                                                </button>
                                            </div>
                                        ) }
										<div className="d-flex gap-3">
											<Link href={`/admin/students/`} className="btn bg-gradient-default d-none d-lg-inline-flex align-items-center mb-0">
												<FiChevronLeft className="me-1" />
												<span>Back</span>
											</Link>
											<div>
												<h6 className="mb-0"><u>{account.name}</u>`s account</h6>
												<p className="text-sm mb-0">Created at {account.formatted_date}</p>
											</div>
										</div>
										<hr className="horizontal dark my-3"/>
									</div>
									<div className="card-body py-0">
										<div className="row">
											<div className="col-12 col-lg-6">
												<div className="form-group">
													<label htmlFor="email" className="form-control-label">
														Email
														{errors.email && (
															<b className={`text-danger ms-1`}>
																{errors.email}
															</b>
														)}
													</label>
													<input className={`form-control ` + (errors.email && (`is-invalid`))} id="email" type="email" placeholder='Email address' defaultValue={account.email} onChange={(e) => setEmail(e.target.value)}/>
												</div>
												<div className="form-group">
													<label htmlFor="password" className="form-control-label">
														Password
														{errors.password && (
															<b className={`text-danger ms-1`}>
																{errors.password}
															</b>
														)}
													</label>
													<input className={`form-control ` + (errors.password && (`is-invalid`))} id="password" type="password" placeholder='Password' onChange={(e) => setPassword(e.target.value)}/>
												</div>
												<div className="form-group">
													<label htmlFor="password_confirmation" className="form-control-label">
														Password Confirmation
														{errors.passwordConfirmation && (
															<b className={`text-danger ms-1`}>
																{errors.passwordConfirmation}
															</b>
														)}
													</label>
													<input className={`form-control ` + (errors.passwordConfirmation && (`is-invalid`))} id="password_confirmation" type="password" placeholder='Password Confirmation' onChange={(e) => setPasswordConfirmation(e.target.value)}/>
												</div>
											</div>
										</div>
									</div>
									<div className="card-footer d-flex justify-content-between border-top flex-column flex-lg-row">
										<button type="submit" className="btn bg-gradient-primary">
											<FiSave className="me-1"/>
											<span>Save</span>
										</button>
										<button type="button" className="btn bg-gradient-danger" onClick={() => deleteStudent(account.id)}>
											<FiTrash2 className="me-1"/>
											<span>Remove</span>
										</button>
									</div>
								</form>
							</div>
						</div>
					</div>
				</div>
			</Layout>
		</>
	);
}