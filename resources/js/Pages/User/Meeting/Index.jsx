import React from "react";
import Layout from "../../../Layouts/Default";
import { Inertia } from "@inertiajs/inertia";
import { Link, Head } from "@inertiajs/inertia-react";
import { FiUserPlus, FiList, FiCalendar } from "react-icons/fi";
import { FcRemoveImage } from "react-icons/fc";
import Swal from "sweetalert2";

export default function SchoolIndex({ meetings, current_route }) {
	const breadcrumb = [
		{
			url: `/home`,
			text: `Dashboard`
		},
		{
			url: `#`,
			text: `Meetings`
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

	React.useEffect(() => {
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
							<div className="row g-3">
								{ (meetings.length) ? meetings.map((item, index) => (
								<div key={index} className="col-12 col-lg-4">
									<div className="card">
										<div className="card-body">
											<div className="py-1">
												<h5 className="mb-1">{ item.name }</h5>
												<small>{item.formatted_coming}</small>
											</div>
											<hr className="horizontal dark my-2"/>
											<div className="d-inline-flex align-items-center text-sm">
												<FiCalendar className="text-warning me-1"/>
												<span className="pt-1">
												{item.formatted_start} - {item.formatted_until}
												</span>
											</div>
										</div>
										<div className="d-flex gap-2 justify-content-between card-footer">
											<Link href={`/u/meetings/${item.id}`} className="d-flex align-items-center justify-content-center btn bg-gradient-default text-xs w-100 mb-0" data-bs-toggle="tooltip" title="Detail meeting">
												<FiList className="me-1"/>
												<span className="d-none d-lg-inline">Detail meeting</span>
											</Link>
											{(function() {
												if (item.participants.length == 0) {
													return <Link onClick={(e) => joinMeeting(e, item.id)} className="d-flex align-items-center justify-content-center btn btn-join bg-gradient-primary text-xs w-100 mb-0" data-bs-toggle="tooltip" title="Join meeting">
																<FiUserPlus className="me-1"/>
																<span className="d-none d-lg-inline">Join</span>
															</Link>;
												}
											})()}
										</div>
									</div>
								</div>
								)) : 
								<div className="card card-body min-vh-50 d-flex align-items-center justify-content-center">
									<FcRemoveImage className="fs-1 mb-2"/>
									<span>No meeting</span>
								</div> }
							</div>
						</div>
					</div>
				</div>
			</Layout>
		</>
	)
}
