import React, { useState } from 'react';
import Layout from '../../Layouts/Default';
import { Inertia } from '@inertiajs/inertia';
import { Link, Head } from '@inertiajs/inertia-react';
import { FiChevronLeft, FiSave } from "react-icons/fi";
import flatpickr from "flatpickr";
import Choices from 'choices.js';

export default function CreateStudent({ schools, errors, current_route }) {
	const breadcrumb = [
		{
			url: `/home`,
			text: `Dashboard`
		},
        {
			url: `/students`,
			text: `Students`
		},
		{
			url: `#`,
			text: `New student`
		}
	];
	const [name, setName] = useState('');
	const [school, setSchool] = useState('');
	const [gender, setGender] = useState('m');
	const [periods, setPeriods] = useState('');

	const storeStudent = async (e) => {
		e.preventDefault();
		let submit = document.querySelector('button[type=submit]');
		Inertia.post('/students', {
			name: name,
			school: school,
			gender: gender,
			periods: periods,
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

	React.useEffect(() => {
		new Choices('.choice-js');

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
								<form onSubmit={storeStudent}>
									<div className="card-header pb-0">
										<div className="d-flex gap-3">
											<Link href="/students/" className="btn bg-gradient-default d-none d-lg-inline-flex align-items-center mb-0">
												<FiChevronLeft className="me-1" />
												<span>Back</span>
											</Link>
											<div>
												<h6 className="mb-0">Add student</h6>
												<p className="text-sm mb-0">Add new student</p>
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
											<select className={`form-control choice-js ` + (errors.school && (`is-invalid`))} id="school" defaultValue={''} onChange={(e) => setSchool(e.target.value)}>
												<option value="" disabled>Select school</option>
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
											<input className={`form-control ` + (errors.name && (`is-invalid`))} id="name" type="text" placeholder='Full name' onChange={(e) => setName(e.target.value)}/>
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
												<input className="form-check-input" type="radio" name="gender" id="gender_male" value="m" defaultChecked onChange={(e) => setGender(e.target.value)}/>
												<label className="custom-control-label" htmlFor="gender_male">Male</label>
											</div>
											<div className="form-check">
												<input className="form-check-input" type="radio" name="gender" id="gender_female" value="f" onChange={(e) => setGender(e.target.value)}/>
												<label className="custom-control-label" htmlFor="gender_female">Female</label>
											</div>
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
									<div className="card-footer d-flex justify-content-between border-top flex-column flex-lg-row">
										<button type="submit" className="btn bg-gradient-primary">
											<FiSave className="me-1"/>
											<span>Save</span>
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