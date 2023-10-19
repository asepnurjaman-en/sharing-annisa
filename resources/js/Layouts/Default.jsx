import React from "react";
import Sidebar from "./Sidebar";
import { Link } from "@inertiajs/inertia-react";
import { Inertia } from "@inertiajs/inertia";
import { FiPower } from "react-icons/fi";
import 'bootstrap/dist/js/bootstrap.min.js';

function Layout({ children, route, breadcrumb }) {
	const sidenav = document.getElementById('sidenav-main');
	let body = document.getElementsByTagName('body')[0];
	let className = 'g-sidenav-pinned';
	let html = document.getElementsByTagName('html')[0];

	function toggleSidenav() {
		if (body.classList.contains(className)) {
			body.classList.remove(className);
			setTimeout(function() {
				sidenav.classList.remove('bg-white');
			}, 100);
			sidenav.classList.remove('bg-transparent');
	  
		} else {
			body.classList.add(className);
			sidenav.classList.add('bg-white');
			sidenav.classList.remove('bg-transparent');
		}
	}
	html.addEventListener("click", function(e) {
		if (body.classList.contains('g-sidenav-pinned') && !e.target.classList.contains('sidenav-toggler-line')) {
			body.classList.remove(className);
		}
	});

	const destroyLog = async (e) => {
		Inertia.post(`/logout`);
	}

    React.useEffect(() => {
		
	}, []);

	return (
		<>
			<div className="position-absolute w-100 min-height-300 bg-gradient-primary top-0">
				<span className="mask bg-primary opacity-6"></span>
			</div>
			<Sidebar route={route}></Sidebar>
			<main className="main-content position-relative border-radius-lg ">
				<nav className="navbar navbar-main navbar-expand-lg px-0 mx-4 shadow-none border-radius-xl " id="navbarBlur" data-scroll="false">
					<div className="container-fluid py-1 px-3">
						<nav aria-label="breadcrumb">
							<ol className="breadcrumb bg-transparent mb-0 pb-0 pt-1 px-0 me-0 me-lg-5">
							{ breadcrumb.map((item, index) => (
								(item.url=='#') ? 
								<li className="breadcrumb-item text-sm text-white active" aria-current="page" key={index}>{item.text}</li>
								: 
								<li className="breadcrumb-item text-sm" key={index}>
									<Link className="opacity-5 text-white" href={item.url}>{item.text}</Link>
								</li>
							)) }
							</ol>
							<h6 className="font-weight-bolder text-white mb-0">{breadcrumb[breadcrumb.length -1].text}</h6>
						</nav>
						<div className="collapse navbar-collapse mt-sm-0 mt-2 me-md-0 me-sm-4" id="navbar">
							<div className="ms-md-auto pe-md-3 d-flex align-items-center">
							</div>
							<ul className="navbar-nav  justify-content-end">
								<li className="nav-item align-items-center">
									<Link onClick={destroyLog} className="btn btn-sm bg-white bg-gradient-default text-danger font-weight-bold px-3 mb-0">
										<FiPower className="mx-1" />
										<span className="d-sm-inline d-none">Sign Out</span>
									</Link>
								</li>
								<li className="nav-item d-xl-none ps-3 d-flex align-items-center">
									<button onClick={toggleSidenav} className="nav-link text-white p-0 bg-transparent border-0" type="button">
										<div className="sidenav-toggler-inner">
											<i className="sidenav-toggler-line bg-white"></i>
											<i className="sidenav-toggler-line bg-white"></i>
											<i className="sidenav-toggler-line bg-white"></i>
										</div>
									</button>
								</li>
							</ul>
						</div>
					</div>
				</nav>
				{ children }
			</main>
		</>
	)
}

export default Layout