import React, { useState } from 'react';
import Layout from '../../Layouts/Default';
import { Inertia } from '@inertiajs/inertia';
import { Link, Head } from '@inertiajs/inertia-react';
import { FiChevronLeft, FiSave, FiTrash2 } from "react-icons/fi";
import Swal from "sweetalert2";

export default function EditSchool({ school, errors, current_route }) {
	const breadcrumb = [
		{
			url: `/home`,
			text: `Dashboard`
		},
        {
			url: `/schools`,
			text: `Schools`
		},
		{
			url: `#`,
			text: `Edit school`
		}
	];
	const [name, setName] = useState(school.name);
	const updateSchool = async (e) => {
		e.preventDefault();
		let submit = document.querySelector('button[type=submit]');
		Inertia.put(`/schools/${school.id}`, {
			name: name
		}, {
			onProgress: () => {
				submit.disabled = true;
				submit.children[1].textContent=`Saving...`;
			},
			onSuccess: () => {
				submit.disabled = false;
			}
		});
	}
	const deleteSchool = async (id) => {
		Swal.fire({
			title: `Delete this school?`,
			text: `Data ${school.name} will be deleted and the student will unorganized.`, 
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
				Inertia.delete(`/schools/${id}`);
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
								<form onSubmit={updateSchool}>
									<div className="card-header pb-0">
										<div className="d-flex gap-3">
											<Link href="/schools/" className="btn bg-gradient-default d-none d-lg-inline-flex align-items-center mb-0">
												<FiChevronLeft className="me-1" />
												<span>Back</span>
											</Link>
											<div>
												<h6 className="mb-0">Edit school</h6>
												<p className="text-sm mb-0">Create at {school.formatted_date}</p>
											</div>
										</div>
										<hr className="horizontal dark my-3"/>
									</div>
									<div className="card-body py-0">
										<div className="form-group">
											<label htmlFor="name" className="form-control-label">
												School name
												{errors.name && (
													<b className={`text-danger ms-1`}>
														{errors.name}
													</b>
												)}
											</label>
											<input className={`form-control ` + (errors.name && (`is-invalid`))} id="name" type="text" defaultValue={name} onChange={(e) => setName(e.target.value)}/>
										</div>
									</div>
									<div className="card-footer d-flex justify-content-between border-top flex-column flex-lg-row">
										<button type="submit" className="btn bg-gradient-primary">
											<FiSave className="me-1"/>
											<span>Save</span>
										</button>
										<button type="button" className="btn bg-gradient-danger" onClick={() => deleteSchool(school.id)}>
											<FiTrash2 className="me-1" />
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
	)
}