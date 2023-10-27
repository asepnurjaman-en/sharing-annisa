import React, { useState } from "react";
import Layout from "../../../Layouts/Default";
import { Inertia } from "@inertiajs/inertia";
import { Link, Head, usePage, useForm } from "@inertiajs/inertia-react";
import { FiChevronLeft, FiLink, FiUserCheck, FiCamera, FiEdit3 } from "react-icons/fi";

export default function ProfileMe({ profile, errors, current_route }) {
	const breadcrumb = [
		{
			url: `/dashboard`,
			text: `Dashboard`
		},
		{
			url: `/u/profile`,
			text: `Profile`
		},
		{
			url: `#`,
			text: `Edit`
		}
	];
	const { auth } = usePage().props;
	const { data, setData, post, progress } = useForm({
		name: auth.user.name,
		email: auth.user.email,
		password: null,
		password_confirmation: null,
		avatar: null,
		background: null
	});
	const previewAvatar = async (e) => {
		setData('avatar', e.target.files[0]);
		document.getElementsByClassName('avatar-changed')[0].setAttribute('src', URL.createObjectURL(e.target.files[0]))
	};
	const previewBackground = async (e) => {
		setData('background', e.target.files[0]);
		document.getElementsByClassName('background-changed')[0].setAttribute('src', URL.createObjectURL(e.target.files[0]))
	};
	const updateProfile = async (e) => {
		e.preventDefault();
		post(`/u/profile/update`);
	}

	return (
		<>
			<Head>
				<title>{breadcrumb[breadcrumb.length -1].text}</title>
			</Head>
			<Layout route={current_route} breadcrumb={breadcrumb}>
				<div className="container-fluid py-4">
					<form onSubmit={updateProfile}>
						<div className="row g-3">
							<div className="col-md-4">
								<div className="card card-profile">
									<div className="position-relative">
										<img src={`/storage/${profile.background_picture}`} className="background-changed card-img-top max-height-160 object-cover"/>
										<label className="bg-gray-100 shadow rounded background-change" htmlFor="background">
											<FiEdit3 />
											<input type="file" id="background" accept="image/*" onChange={previewBackground}/>
										</label>
									</div>
									<div className="row justify-content-center">
										<div className="col-4 col-lg-4 order-lg-2">
											<div className="position-relative mt-n4 mt-lg-n6 mb-4 mb-lg-0">
												<img src={`/storage/${profile.profile_picture}`} className="d-block icon-xl rounded-circle  object-cover img-fluid border border-2 border-white m-auto avatar-changed"/>
												<label className="bg-gray-100 shadow rounded-circle avatar-change" htmlFor="avatar">
													<FiCamera />
													<input type="file" id="avatar" accept="image/*" onChange={previewAvatar}/>
												</label>
											</div>
										</div>
									</div>
									{errors.avatar && (
										<div className={`alert bg-gradient-danger text-white mx-3`}>
											{errors.avatar}
										</div>
									)}
									<div className="card-header text-center border-0 pt-0 pt-lg-2 pb-4 pb-lg-3">
										<h5 className="mb-0">{data.name}</h5>
										<small className="text-sm">{data.email}</small>
									</div>
									<div className="card-body pt-0">
										<div className="fw-light text-center">
											<Link className="btn btn-sm btn-gradient-default d-inline-flex align-items-center" href="/u/profile">
												<FiChevronLeft className="me-1"/>
												Cancel
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
									<div className="card-footer">
									{progress && (
										<progress value={progress.percentage} max="100" className="w-100">
											{progress.percentage}%
										</progress>
									)}
									</div>
								</div>
							</div>
							<div className="col-md-8">
								<div className="card">
									<div className="card-body">
										<p className="text-uppercase text-sm">User Information</p>
										<div className="row">
											<div className="col-md-6">
												<div className="form-group">
													<label htmlFor="name" className="form-control-label">
														Name
														{errors.name && (
															<b className={`text-danger ms-1`}>
																{errors.name}
															</b>
														)}
													</label>
													<input className={`form-control ` + (errors.name && (`is-invalid`))} id="name" type="text" placeholder='Name' defaultValue={auth.user.name} onChange={e => setData('name', e.target.value)}/>
												</div>
												<div className="form-group">
													<label htmlFor="email" className="form-control-label">
														Email
														{errors.email && (
															<b className={`text-danger ms-1`}>
																{errors.email}
															</b>
														)}
													</label>
													<input className={`form-control ` + (errors.email && (`is-invalid`))} id="email" type="email" placeholder='Email address' defaultValue={auth.user.email} onChange={e => setData('email', e.target.value)}/>
												</div>
											</div>
											<div className="col-md-6">
												<div className="form-group">
													<label htmlFor="password" className="form-control-label">
														Password
														{errors.password && (
															<b className={`text-danger ms-1`}>
																{errors.password}
															</b>
														)}
													</label>
													<input className={`form-control ` + (errors.password && (`is-invalid`))} id="password" type="password" placeholder='Password' onChange={e => setData('password', e.target.value)}/>
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
													<input className={`form-control ` + (errors.passwordConfirmation && (`is-invalid`))} id="password_confirmation" type="password" placeholder='Password Confirmation' onChange={e => setData('password_confirmation', e.target.value)}/>
												</div>
											</div>
										</div>
										<hr className="horizontal dark"/>
										<p className="text-uppercase text-sm">Student connection</p>
										<div className="d-flex gap-2 rounded bg-gray-100">
											<div className="bg-gradient-warning shadow rounded d-flex align-items-center justify-content-center px-4">
												<FiLink className="text-white fs-4" />
											</div>
											<div className="p-2">
												<h6 className="lh-base mb-0">{auth.user.name}</h6>
												<span className="lh-base text-xs">from {auth.user.email}</span>
											</div>
										</div>
										<hr className="horizontal dark"/>
										<p className="text-uppercase text-sm">Bio</p>
										<div className="form-group">
											<textarea className="form-control" type="text" defaultValue="A beautiful Dashboard for Bootstrap 5. It is Free and Open Source."></textarea>
										</div>
									</div>
									<div className="card-footer d-flex justify-content-between border-top flex-column flex-lg-row">
										<button type="submit" className="btn bg-gradient-primary mb-0">
											<FiUserCheck className="me-1"/>
											<span>Save</span>
										</button>
									</div>
								</div>
							</div>
						</div>
					</form>
				</div>
			</Layout>
		</>
	);
}