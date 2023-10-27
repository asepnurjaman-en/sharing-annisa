import React from "react";
import Layout from "../../../Layouts/Default";
import { Link, Head, usePage } from "@inertiajs/inertia-react";
import { FiEdit } from "react-icons/fi";
import { FcRemoveImage } from "react-icons/fc";

export default function ProfileMe({ profile, current_route }) {
	const breadcrumb = [
		{
			url: `/dashboard`,
			text: `Dashboard`
		},
		{
			url: `#`,
			text: `Profile`
		}
	];
	const { auth } = usePage().props;

	return (
		<>
			<Head>
				<title>{breadcrumb[breadcrumb.length -1].text}</title>
			</Head>
			<Layout route={current_route} breadcrumb={breadcrumb}>
				<div className="container-fluid py-4">
					<div className="row g-3">
						<div className="col-md-4">
							<div className="card card-profile">
								<img src={`/storage/${profile.background_picture}`} className="card-img-top max-height-160 object-cover"/>
								<div className="row justify-content-center">
									<div className="col-4 col-lg-4 order-lg-2">
										<div className="mt-n4 mt-lg-n6 mb-4 mb-lg-0">
											<img src={`/storage/${profile.profile_picture}`} className="d-block icon-xl rounded-circle object-cover img-fluid border border-2 border-white m-auto"/>
										</div>
									</div>
								</div>
								<div className="card-header text-center border-0 pt-0 pt-lg-2 pb-4 pb-lg-3">
									<h5 className="mb-0">{auth.user.name}</h5>
									<small className="text-sm">{auth.user.email}</small>
								</div>
								<div className="card-body pt-0">
									<div className="fw-light text-center">
										<Link className="btn btn-sm btn-outline-primary d-inline-flex align-items-center" href="/u/profile/edit">
											<FiEdit className="me-1"/>
											Edit Profile
										</Link>
									</div>
									<div className="d-flex justify-content-center">
										<div className="d-grid text-center">
											<span className="text-lg font-weight-bolder">{auth.user.id}</span>
											<span className="text-sm opacity-8">Meetings</span>
										</div>
										<div className="d-grid text-center mx-4">
											<span className="text-lg font-weight-bolder">10</span>
											<span className="text-sm opacity-8">Followers</span>
										</div>
										<div className="d-grid text-center">
											<span className="text-lg font-weight-bolder">89</span>
											<span className="text-sm opacity-8">Following</span>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div className="col-md-8">
							<div className="card card-body min-vh-50 d-flex align-items-center justify-content-center">
								<FcRemoveImage className="fs-1 mb-2"/>
								No Participation yet
							</div>
						</div>
					</div>
				</div>
			</Layout>
		</>
	);
}