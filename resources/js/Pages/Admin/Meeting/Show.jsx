import React, { useState, useEffect } from "react";
import Layout from "../../../Layouts/Default";
import { Inertia } from "@inertiajs/inertia";
import { Link, Head } from "@inertiajs/inertia-react";
import { FiUser, FiUsers, FiUserCheck, FiChevronLeft, FiMessageSquare, FiTrash2, FiEdit, FiHash, FiSave } from 'react-icons/fi';
import { FcDeleteDatabase } from 'react-icons/fc';
import { HiTrash } from 'react-icons/hi';
import Countdown from "react-countdown";
import Choices from 'choices.js';
import Swal from "sweetalert2";

export default function ShowMeeting({ meeting, students, session, errors, current_route }) {
	const breadcrumb = [
		{
			url: `/dashboard`,
			text: `Dashboard`
		},
		{
			url: `/admin/meetings`,
			text: `Meeting`
		},
		{
			url: `#`,
			text: meeting.name
		}
	];
	const [subjectTitle, setSubjectTitle] = useState('');
	const [subjectContent, setSubjectContent] = useState('');
	const [student, setStudent] = useState('');
	const [stakeholder, setStakeholder] = useState('');
	const storeActor = async (e) => {
		e.preventDefault();
		Inertia.post(`/admin/meeting-actors`, {
			meeting: meeting.id,
			student: student,
			stakeholder: stakeholder
		},{
			onSuccess: () => {
				document.querySelector('form').reset();
				document.querySelector('#createActorModalClose').click();
			}
		});
	};
	const storeSubject = async (e) => {
		e.preventDefault();
		Inertia.post(`/admin/meeting-subjects`, {
			meeting: meeting.id,
			title: subjectTitle,
			content: subjectContent,
		},{
			onSuccess: () => {
				document.querySelector('form').reset();
				document.querySelector('#createSubjectModalClose').click();
			}
		});
	};
	const deleteMeeting = async (e) => {
		e.preventDefault();
		Swal.fire({
			title: `Delete this meet?`,
			text: `Data meeting, actors, and subjects from ${meeting.name} will be deleted.`, 
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
				Inertia.delete(`/admin/meetings/${meeting.id}`);
			}
		});
	};

	const deleteMeetingActor = async (e, id, name) => {
		e.preventDefault();
		Swal.fire({
			title: `Delete actor?`,
			text: `${name} will be deleted from ${meeting.name}.`, 
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
				Inertia.delete(`/admin/meeting-actors/${id}`);
			}
		});
	};

	const deleteMeetingSubject = async (e, id, name) => {
		e.preventDefault();
		Swal.fire({
			title: `Delete subject?`,
			text: `${name} will be deleted from ${meeting.name}.`, 
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
				Inertia.delete(`/admin/meeting-subjects/${id}`);
			}
		});
	};

	const CountComplete = () => <div className="border rounded text-success text-center py-4">You are good to go!</div>;
	useEffect(() => {
		new Choices('.choice-js');
	}), [];

	return (
		<>
			<Head>
				<title>{breadcrumb[breadcrumb.length -1].text}</title>
			</Head>
			<Layout route={current_route} breadcrumb={breadcrumb}>
				<div className="container-fluid py-4">
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
							<div className="d-flex gap-3">
								<Link href={`/admin/meetings`} className="btn bg-gradient-default d-none d-lg-inline-flex align-items-center mb-0">
									<FiChevronLeft className="me-1" />
									<span>Back</span>
								</Link>
								<div>
									<h6 className="mb-0">{meeting.name}</h6>
									<p className="text-sm mb-0">Create at {meeting.formatted_date}</p>
								</div>
							</div>
							<hr className="horizontal dark my-3"/>
						</div>
						<div className="card-body pt-0">
							<div className="row gap-3 gap-lg-0 mb-3">
								<div className="col-12 col-lg-6">
									<ul className="list-unstyled">
										<li className="mb-2">
											<span className="opacity-7 text-sm">Start at</span>
											<div className="text-dark">{meeting.formatted_start}</div>
										</li>
										<li>
											<span className="opacity-7 text-sm">End at</span>
											<div className="text-dark">{meeting.formatted_end}</div>
										</li>
									</ul>
								</div>
								<div className="col-12 col-lg-6">
									{ meeting.status=='soon' && 
									<ul className="list-unstyled">
										<li className="mb-2">
											<span className="opacity-7 text-sm">Will start in</span>
											<div>
												<Countdown
													className="fs-1"
													date={meeting.start}
													precision={3}>
													<CountComplete/>
												</Countdown>
											</div>
										</li>
									</ul> }
									{ meeting.status=='ongoing' &&
									<div className="d-flex gap-3">
										<div className="card card-body p-3">
											<div className="author align-items-center">
												<div className="avatar bg-gradient-secondary shadow d-none d-lg-flex">
													<FiUsers className="fs-4" />
												</div>
												<div className="name ps-3">
													<span className="fs-3">0</span>
													<div className="stats">
														<small>Participants registered</small>
													</div>
												</div>
											</div>
										</div>
										<div className="card card-body p-3">
											<div className="author align-items-center">
												<div className="avatar bg-gradient-primary shadow d-none d-lg-flex">
													<FiUserCheck className="fs-4" />
												</div>
												<div className="name ps-3">
													<span className="fs-3">0</span>
													<div className="stats">
														<small>Participants confirmed</small>
													</div>
												</div>
											</div>
										</div>
									</div> }
									{ meeting.status=='ended' &&
									<div className="">
										<div className="border rounded text-center py-4">
											<FcDeleteDatabase className="fs-2 mb-1"/>
											<p className="text-muted">Meeting has ended.</p>
										</div>
									</div> }
								</div>
							</div>
							<div className="row gap-3 gap-lg-0">
								<div className="col-12 col-lg-6">
									<div className="card shadow-none border">
										<div className="card-header d-flex justify-content-between align-items-center">
											<h6 className="d-flex align-items-center mb-0">
												<FiUser className="me-2"/>
												Actors
											</h6>
											<button type="button" className="btn btn-sm bg-gradient-warning mb-0" data-bs-toggle="modal" data-bs-target="#createActorModal">
												Add
											</button>
										</div>
										<div className="card-body pt-0">
											{(meeting.actors.length) ? meeting.actors.map((item, index) => (
											<div className="d-flex align-items-center gap-2 mb-2" key={index}>
												<div className="btn-link w-100 rounded shadow text-start p-3">
													<FiHash className="text-muted me-2"/>
													{item.student.name}
													<small className="fw-normal opacity-5 mx-1">as</small>
													{item.stakeholder}
												</div>
												<Link href="#" onClick={(e) => deleteMeetingActor(e, item.id, item.student.name)} className="text-danger fw-bold">
													<HiTrash/>
												</Link>
											</div>
											)) :
											<div className="text-center opacity-5 p-3">No actor in this meeting</div> }
										</div>
									</div>
								</div>
								<div className="col-12 col-lg-6">
									<div className="card shadow-none border">
										<div className="card-header d-flex justify-content-between align-items-center">
											<h6 className="d-flex align-items-center mb-0">
												<FiMessageSquare className="me-2"/>
												Subjects
											</h6>
											<button type="button" className="btn btn-sm bg-gradient-warning mb-0" data-bs-toggle="modal" data-bs-target="#createSubjectModal">
												Add
											</button>
										</div>
										<div className="accordion card-body pt-0" id="meetingSubject">
											{(meeting.subjects.length) ? meeting.subjects.map((item, index) => (
											<div className="accordion-item mb-2" key={index}>
												<span className="accordion-header d-flex align-items-center gap-2 mb-0">
													<button className="btn w-100 rounded text-dark text-start p-3 mb-0" type="button" data-bs-toggle="collapse" data-bs-target={`#subject-${index}`} aria-expanded="false" aria-controls={`#subject-${index}`}>
														{item.title}
													</button>
													<Link href="#" onClick={(e) => deleteMeetingSubject(e, item.id, item.title)} className="text-danger fw-bold">
														<HiTrash/>
													</Link>
												</span>
												<div id={`subject-${index}`} className="accordion-collapse collapse" data-bs-parent="#meetingSubject">
													<div className="accordion-body text-sm text-dark">
														{item.content}
													</div>
												</div>
											</div>
											)) :
											<div className="text-center opacity-5 p-3">No subject in this meeting</div> }
										</div>
									</div>
								</div>
							</div>
						</div>
						<div className="card-footer border-top">
							<ul className="list-group">
								<li className="list-group-item border-0 d-flex justify-content-between ps-0 mb-2 border-radius-lg">
									<div className="d-flex align-items-center">
										<div className="icon icon-shape icon-sm me-3 bg-gradient-default shadow text-center">
											<FiEdit className="text-primary"/>
										</div>
										<div className="d-flex flex-column">
											<span className="text-xs">Change meeting name.</span>
											<Link href={`/admin/meetings/${meeting.id}/edit`} className="text-primary fw-bold">Edit meeting</Link>
										</div>
									</div>
								</li>
								{ meeting.status!='ongoing' &&
								<li className="list-group-item border-0 d-flex justify-content-between ps-0 mb-2 border-radius-lg">
									<div className="d-flex align-items-center">
										<div className="icon icon-shape icon-sm me-3 bg-gradient-default shadow text-center">
											<FiTrash2 className="text-danger"/>
										</div>
										<div className="d-flex flex-column">
											<span className="text-xs">Delete meeting, actors, and subjects.</span>
											<Link href="#" onClick={deleteMeeting} className="text-danger fw-bold">Delete meeting</Link>
										</div>
									</div>
								</li> }
							</ul>
						</div>
					</div>
				</div>
				{/* Form */}
				<div className="modal fade" id="createActorModal" tabIndex="-1" role="dialog" aria-labelledby="createActorModalLabel" aria-hidden="true">
					<div className="modal-dialog modal-dialog-centered" role="document">
						<div className="modal-content">
							<div className="modal-header align-items-center">
								<h5 className="modal-title" id="createActorModalLabel">Add new actor</h5>
								<button type="button" className="btn bg-gradient-default text-danger mb-0" id="createActorModalClose" data-bs-dismiss="modal">&times;</button>
							</div>
							<form onSubmit={storeActor}>
								<div className="modal-body">
									<div className="form-group">
										<label htmlFor="student" className="form-control-label">
											Student
											{errors.student && (
												<b className={`text-danger ms-1`}>
													{errors.student}
												</b>
											)}
										</label>
										<select className={`form-control choice-js ` + (errors.student && (`is-invalid`))} id="school" defaultValue={''} onChange={(e) => setStudent(e.target.value)}>
											<option value="" disabled>Select student</option>
											{students.map((item, index) => {
												return (
													<optgroup label={item.name} key={index}>
														{item.students.map((sub_item, sub_index) => {
															return (
															<option key={sub_index} value={sub_item.id}>
																{sub_item.name}
															</option>
															);
														})}
													</optgroup>
												);
											})}
										</select>
									</div>
									<div className="form-group">
										<label htmlFor="stakeholder" className="form-control-label">
											As
											{errors.stakeholder && (
												<b className={`text-danger ms-1`}>
													{errors.stakeholder}
												</b>
											)}
										</label>
										<input className={`form-control ` + (errors.stakeholder && (`is-invalid`))} id="stakeholder" type="text" placeholder='Stakeholder' onChange={(e) => setStakeholder(e.target.value)}/>
									</div>
								</div>
								<div className="modal-footer">
									<button type="submit" className="btn bg-gradient-primary">
										<FiSave className="me-1"/>
										<span>Save</span>
									</button>
								</div>
							</form>
						</div>
					</div>
				</div>
				<div className="modal fade" id="createSubjectModal" tabIndex="-1" role="dialog" aria-labelledby="createSubjectModalLabel" aria-hidden="true">
					<div className="modal-dialog modal-dialog-centered modal-lg" role="document">
						<div className="modal-content">
							<div className="modal-header align-items-center">
								<h5 className="modal-title" id="createSubjectModalLabel">Add new subject</h5>
								<button type="button" className="btn bg-gradient-default text-danger mb-0" id="createSubjectModalClose" data-bs-dismiss="modal">&times;</button>
							</div>
							<form onSubmit={storeSubject}>
								<div className="modal-body">
									<div className="form-group">
										<label htmlFor="title" className="form-control-label">
											Subject title
											{errors.title && (
												<b className={`text-danger ms-1`}>
													{errors.title}
												</b>
											)}
										</label>
										<input className={`form-control ` + (errors.title && (`is-invalid`))} id="title" type="text" placeholder='Subject title' onChange={(e) => setSubjectTitle(e.target.value)}/>
									</div>
									<div className="form-group">
										<label htmlFor="content" className="form-control-label">
											Description
											{errors.content && (
												<b className={`text-danger ms-1`}>
													{errors.content}
												</b>
											)}
										</label>
										<textarea className={`form-control ` + (errors.content && (`is-invalid`))} id='content' placeholder="Description" rows={4} cols={40} onChange={(e) => setSubjectContent(e.target.value)} />
									</div>
								</div>
								<div className="modal-footer">
									<button type="submit" className="btn bg-gradient-primary">
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
	);
}
