import React, { useState } from 'react';
import Layout from '../../../Layouts/Default';
import { Inertia } from '@inertiajs/inertia';
import { Link, Head } from '@inertiajs/inertia-react';
import { FiChevronLeft, FiSave, FiTrash2 } from 'react-icons/fi';
import Swal from "sweetalert2";
import Choices from 'choices.js';

export default function EditStudent({ student, schools, errors, current_route }) {
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
			text: `Edit student`
		}
	];
	const [name, setName] = useState(student.name);
	const [school, setSchool] = useState(student.school_id);
	const [gender, setGender] = useState(student.gender);
	const updateStudent = async (e) => {
		e.preventDefault();
		let submit = document.querySelector('button[type=submit]');
		Inertia.put(`/admin/students/${student.id}`, {
			name: name,
			school: school,
			gender: gender
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
	const deleteStudent = async (id) => {
		Swal.fire({
			title: `Delete this student?`,
			text: `Data ${student.name} will be deleted.`, 
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
				Inertia.delete(`/admin/students/${id}`);
			}
		});
	}

	React.useEffect(() => {
		new Choices('.choice-js');
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
								<form onSubmit={updateStudent}>
									<div className="card-header pb-0">
										<div className="d-flex gap-3">
											<Link href={`/admin/students/`} className="btn bg-gradient-default d-none d-lg-inline-flex align-items-center mb-0">
												<FiChevronLeft className="me-1" />
												<span>Back</span>
											</Link>
											<div>
												<h6 className="mb-0">Edit student</h6>
												<p className="text-sm mb-0">Created at {student.formatted_date}</p>
											</div>
										</div>
										<hr className="horizontal dark my-3"/>
									</div>
									<div className="card-body py-0">
										<div className="form-group">
											<label htmlFor="school" className="form-control-label">
												School
												{errors.school && (
													<b className={`text-danger ms-1`}>
														{errors.school}
													</b>
												)}
											</label>
											<select className={`choice-js form-control ` + (errors.school && (`is-invalid`))} id="school" defaultValue={school} onChange={(e) => setSchool(e.target.value)}>
												{schools.map((item, index) => {
													return (
														<option key={index} value={item.id}>
															{item.name}
														</option>
													);
												})}
											</select>
										</div>
										<div className="form-group">
											<label htmlFor="name" className="form-control-label">
												Student name
												{errors.name && (
													<b className={`text-danger ms-1`}>
														{errors.name}
													</b>
												)}
											</label>
											<input className={`form-control ` + (errors.name && (`is-invalid`))} id="name" type="text" defaultValue={name} onChange={(e) => setName(e.target.value)}/>
										</div>
										<div className="form-group">
											<label htmlFor="gender" className="form-control-label">
												Student gender
												{errors.gender && (
													<b className={`text-danger ms-1`}>
														{errors.gender}
													</b>
												)}
											</label>
											<div className="form-check">
												<input className="form-check-input" type="radio" name="gender" id="gender_male" value="m" defaultChecked={gender=='m'} onChange={(e) => setGender(e.target.value)}/>
												<label className="custom-control-label" htmlFor="gender_male">Male</label>
											</div>
											<div className="form-check">
												<input className="form-check-input" type="radio" name="gender" id="gender_female" value="f" defaultChecked={gender=='f'} onChange={(e) => setGender(e.target.value)}/>
												<label className="custom-control-label" htmlFor="gender_female">Female</label>
											</div>
										</div>
									</div>
									<div className="card-footer d-flex justify-content-between border-top flex-column flex-lg-row">
										<button type="submit" className="btn bg-gradient-primary">
											<FiSave className="me-1"/>
											<span>Save</span>
										</button>
										<button type="button" className="btn bg-gradient-danger" onClick={() => deleteStudent(student.id)}>
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