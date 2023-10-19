import React, { useState } from 'react';
import Layout from '../../Layouts/Default';
import { Inertia } from '@inertiajs/inertia';
import { Link, Head } from '@inertiajs/inertia-react';
import { FiChevronLeft, FiSave } from "react-icons/fi";
import flatpickr from "flatpickr";

export default function EditSchool({ meeting, errors, current_route }) {
	const breadcrumb = [
		{
			url: `/home`,
			text: `Dashboard`
		},
        {
			url: `/meetings`,
			text: `Meetings`
		},
		{
			url: `#`,
			text: `Edit meeting`
		}
	];
	const [name, setName] = useState(meeting.name);
	const [start, setStart] = useState(meeting.start);
	const [until, setUntil] = useState(meeting.until);
	const updateMeeting = async (e) => {
		e.preventDefault();
		let submit = document.querySelector('button[type=submit]');
		Inertia.put(`/meetings/${meeting.id}`, {
			name: name,
			start: start,
			until: until
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

    React.useEffect(() => {
		flatpickr(".form-flatpickr");
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
								<form onSubmit={updateMeeting}>
									<div className="card-header pb-0">
										<div className="d-flex gap-3">
											<Link href="/meetings/" className="btn bg-gradient-default d-none d-lg-inline-flex align-items-center mb-0">
												<FiChevronLeft className="me-1" />
												<span>Back</span>
											</Link>
											<div>
												<h6 className="mb-0">Edit meeting</h6>
												<p className="text-sm mb-0">Create at {meeting.formatted_date}</p>
											</div>
										</div>
										<hr className="horizontal dark my-3"/>
									</div>
									<div className="card-body py-0">
										<div className="form-group">
											<label htmlFor="name" className="form-control-label">
												Meeting name
												{errors.name && (
													<b className={`text-danger ms-1`}>
														{errors.name}
													</b>
												)}
											</label>
											<input className={`form-control ` + (errors.name && (`is-invalid`))} id="name" type="text" defaultValue={name} onChange={(e) => setName(e.target.value)}/>
										</div>
                                        <div className="form-group">
											<label htmlFor="start" className="form-control-label">
												Start
												{errors.start && (
													<b className={`text-danger ms-1`}>
														{errors.start}
													</b>
												)}
											</label>
											<input className={`form-control form-flatpickr ` + (errors.start && (`is-invalid`))} id='start' type="text"  placeholder="Please select periode" defaultValue={start} onFocus={(e) => setStart(e.target.value)}/>
										</div>
                                        <div className="form-group">
											<label htmlFor="until" className="form-control-label">
												Until
												{errors.until && (
													<b className={`text-danger ms-1`}>
														{errors.until}
													</b>
												)}
											</label>
											<input className={`form-control form-flatpickr ` + (errors.until && (`is-invalid`))} id='until' type="text"  placeholder="Please select periode" defaultValue={until} onFocus={(e) => setUntil(e.target.value)}/>
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
	)
}