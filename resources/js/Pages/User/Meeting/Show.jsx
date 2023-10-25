import React, { useEffect } from "react";
import Layout from "../../../Layouts/Default";
import { Inertia } from "@inertiajs/inertia";
import { Link, Head } from "@inertiajs/inertia-react";
import { FiUsers, FiUserPlus, FiUserCheck, FiChevronLeft, FiMessageSquare, FiUserX, FiHash } from 'react-icons/fi';
import { FcDeleteDatabase } from 'react-icons/fc';
import Countdown from "react-countdown";
import Swal from "sweetalert2";

export default function ShowMeeting({ meeting, session, current_route }) {
	const breadcrumb = [
		{
			url: `/home`,
			text: `Dashboard`
		},
		{
			url: `/meetings`,
			text: `Meeting`
		},
		{
			url: `#`,
			text: meeting.name
		}
	];
	const joinMeeting = async (e, id) => {
		e.preventDefault();
		let submit = document.querySelector('.btn-join');
		Swal.fire({
			title: `Join this meet?`,
			text: `You will be participating to this meeting.`, 
			icon: `question`,
			showCancelButton: true,
			reverseButtons: true,
			customClass: {
				confirmButton: `btn bg-gradient-primary mx-1`,
				cancelButton: `btn bg-gradient-default mx-1`
			},
			buttonsStyling: false,
			allowOutsideClick: false
		}).then((response) => {
			if (response.isConfirmed) {
				Inertia.post(`/u/meetings/${id}/join`, {
					meeting: id,
				},{
					onError: (error) => {
						Swal.fire({
							icon: 'error',
							title: `Fail to join`,
							html: error.meeting
						});
					},
					onProgress: () => {
						submit.disabled = true;
					},
					onSuccess: () => {
						submit.disabled = false;
					}
				});
			}
		});
	};
	const leaveMeeting = async (e) => {
		e.preventDefault();
		Swal.fire({
			title: `Leave this meet?`,
			text: `You will be not participating to this meeting.`, 
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
				Inertia.delete(`/u/meetings/${meeting.id}/leave`);
			}
		});
		};
	const CountComplete = () => <div className="border rounded text-success text-center py-4">You are good to go!</div>;
	useEffect(() => {
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
								<Link href={`/u/meetings`} className="btn bg-gradient-default d-none d-lg-inline-flex align-items-center mb-0">
									<FiChevronLeft className="me-1" />
									<span>Back</span>
								</Link>
								<div>
									<h6 className="mb-0">{meeting.name}</h6>
									<p className="text-sm mb-0">{meeting.formatted_coming}</p>
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
													<span className="fs-3">{meeting.participants_count}</span>
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
														<small>Attendance confirmed</small>
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
							<div className="row">
								<div className="col-12">
									<div className="card shadow-none">
										<div className="card-body px-0">
											<div className="row g-3">
												{(meeting.actors.length) ? meeting.actors.map((item, index) => (
												<div className="col-6 col-md-4 col-lg-2" key={index}>
													<div className="card card-body shadow-lg text-center p-2 mb-3">
														<div className="mt-n2 mt-lg-n4 mb-4 mb-lg-2">
															<img src="/icons/inertia.png" className="d-block icon-lg rounded-circle img-fluid border border-2 border-white m-auto"/>
														</div>
														<span className="d-block fw-bold">{item.student.name}</span>
														<span className="opacity-5 text-sm">{item.stakeholder}</span>
													</div>
												</div>
												)) :
												<div className="col-12">
													<div className="text-center opacity-5 p-3">No actor in this meeting</div>
												</div> }
											</div>
										</div>
									</div>
								</div>
								<div className="col-12">
									<div className="card shadow-none">
										<div className="card-header d-flex justify-content-between align-items-center p-0">
											<h6 className="d-flex align-items-center mb-0">
												<FiMessageSquare className="me-2"/>
												Subjects
											</h6>
										</div>
										<div className="accordion card-body px-0" id="meetingSubject">
											{(meeting.subjects.length) ? meeting.subjects.map((item, index) => (
											<div className="accordion-item mb-2" key={index}>
												<span className="accordion-header mb-0">
													<button className="btn w-100 rounded text-dark text-start p-3 mb-0" type="button" data-bs-toggle="collapse" data-bs-target={`#subject-${index}`} aria-expanded="false" aria-controls={`#subject-${index}`}>
														{item.title}
													</button>
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
						{ meeting.status=='soon' && 
						<div className="card-footer border-top">
						{(function() {
							if (meeting.participants.length == 0) {
                            	return <Link onClick={(e) => joinMeeting(e, meeting.id)} className="d-flex align-items-center justify-content-center btn bg-gradient-primary text-xs w-100 mb-0" data-bs-toggle="tooltip" title="Join meeting">
                                			<FiUserPlus className="me-1"/>
                                			<span className="d-none d-lg-inline">Join</span>
                            			</Link>;
							} else if (meeting.participants.length > 0) {
								return <Link onClick={leaveMeeting} className="d-flex align-items-center justify-content-center btn btn-join bg-gradient-danger text-xs w-100 mb-0" data-bs-toggle="tooltip" title="Leave meeting">
											<FiUserX className="me-1"/>
											<span className="d-none d-lg-inline">Leave Meeting</span>
										</Link>;
							}
						})()}
						</div>
						}
						{ meeting.status=='ongoing' && 
						<div className="card-footer border-top">
							<Link onClick={(e) => joinMeeting(e, meeting.id)} className="d-flex align-items-center justify-content-center btn bg-gradient-primary text-xs w-100 mb-0" data-bs-toggle="tooltip" title="Join meeting">
								<FiUserCheck className="me-1"/>
								<span className="d-none d-lg-inline">Attendance Confirmation </span>
							</Link>
						</div>
						}
					</div>
				</div>
			</Layout>
		</>
	);
}
