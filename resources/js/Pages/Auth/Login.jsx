import React, { useState } from "react";
import Layout from "../../Layouts/Auth";
import { Link, Head, usePage } from '@inertiajs/inertia-react';
import { Inertia } from "@inertiajs/inertia";

export default function Login() {
	const { errors } = usePage().props;
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const storeLogin = async (e) => {
		e.preventDefault();

		Inertia.post(`/login`, {
			email: email,
			password: password
		});
	}

	return (
		<>
			<Head>
				<title>Login Account</title>
			</Head>
			<Layout>
				<section>
					<div className="page-header min-vh-100">
						<div className="container">
							<div className="row">
								<div className="col-xl-4 col-lg-5 col-md-7 d-flex flex-column mx-lg-0 mx-auto">
									<div className="card">
										<div className="card-header pb-0 text-start">
											<h4 className="font-weight-bolder">Log In</h4>
											<p className="mb-0">Enter your email and password to login</p>
										</div>
										<div className="card-body">
											{ errors.email && (
												<div className="alert alert-danger alert-dismissible text-white text-xs fade show" role="alert">
													<span className="alert-text">{errors.email}</span>
													<button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close">
														<span aria-hidden="true">&times;</span>
													</button>
												</div>
											) }
											{ errors.password && (
												<div className="alert alert-danger alert-dismissible text-white text-xs fade show" role="alert">
													<span className="alert-text">{errors.password}</span>
													<button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close">
														<span aria-hidden="true">&times;</span>
													</button>
												</div>
											) }
											<form onSubmit={storeLogin}>
												<div className="mb-3">
													<input type="email" className={`form-control form-control-lg ` + (errors.email && (`is-invalid`))} placeholder="Email" aria-label="Email" onChange={(e) => setEmail(e.target.value)}/>
												</div>
												<div className="mb-3">
													<input type="password" className={`form-control form-control-lg ` + (errors.password && (`is-invalid`))} placeholder="Password" aria-label="Password" onChange={(e) => setPassword(e.target.value)}/>
												</div>
												<div className="text-center">
													<button type="submit" className="btn btn-lg bg-gradient-primary btn-lg w-100 mb-0">Log in</button>
												</div>
											</form>
										</div>
										<div className="card-footer text-center pt-0 px-lg-2 px-1">
										<p className="mb-4 text-sm mx-auto d-none">
											Don't have an account?
											<Link href="#" className="text-primary text-gradient font-weight-bold px-1">Register</Link>
										</p>
										</div>
									</div>
								</div>
								<div className="col-6 d-lg-flex d-none h-100 my-auto pe-0 position-absolute top-0 end-0 text-center justify-content-center flex-column">
									<div className="position-relative bg-gradient-primary h-100 m-3 px-7 border-radius-lg d-flex flex-column justify-content-center overflow-hidden">
										<span className="mask bg-gradient-primary opacity-6"></span>
										<h4 className="mt-5 text-white font-weight-bolder position-relative">"Attention is the new currency"</h4>
										<p className="text-white position-relative">The more effortless the writing looks, the more effort the writer actually put into the process.</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</section>
			</Layout>
		</>
	)
}