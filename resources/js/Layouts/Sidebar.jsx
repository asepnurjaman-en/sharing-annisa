import React from "react";
import { Link } from "@inertiajs/inertia-react";
import PerfectScrollbar from "perfect-scrollbar";
import { FiUsers, FiInbox, FiCast, FiMonitor } from "react-icons/fi";

function Sidebar({ route }) {
	if (document.getElementById('sidenav-collapse-main')) {
		new PerfectScrollbar(document.querySelector('#sidenav-collapse-main'));
	};

    return (
        <>
            <aside className="sidenav bg-white navbar navbar-vertical navbar-expand-xs border-0 border-radius-xl my-3 fixed-start ms-4 " id="sidenav-main">
				<div className="sidenav-header">
					<i className="ni ni-fat-remove p-3 cursor-pointer text-secondary opacity-5 position-absolute end-0 top-0 d-none d-xl-none" aria-hidden="true" id="iconSidenav"></i>
					<Link className="navbar-brand m-0" href="/home">
						<img src="https://raw.githubusercontent.com/innocenzi/awesome-inertiajs/main/assets/logo.svg" className="navbar-brand-img h-100" alt="main_logo"/>
						<span className="ms-1 font-weight-bold">Sharing Annisa</span>
					</Link>
				</div>
				<div className="collapse navbar-collapse w-auto h-auto" id="sidenav-collapse-main">
					<ul className="navbar-nav">
						<li className="nav-item">
							<Link className={ `nav-link ` + ((['dashboard.index'].includes(route)) ? `active` : null) } href="/home/">
								<div className="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">
									<FiMonitor className="text-primary"/>
								</div>
								<span className="nav-link-text ms-1">Dashboard</span>
							</Link>
						</li>
						<li className="my-2 border-bottom"></li>
						<li className="nav-item">
							<Link className={ `nav-link ` + ((['meetings.index','meetings.create','meetings.show','meetings.edit'].includes(route)) ? `active` : null) } href="/meetings/">
								<div className="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">
									<FiCast className="text-primary"/>
								</div>
								<span className="nav-link-text ms-1">Meets</span>
							</Link>
						</li>
						<li className="my-2 border-bottom"></li>
						<li className="nav-item">
							<Link className={ `nav-link ` + ((['schools.index','schools.show','schools.edit'].includes(route)) ? `active` : null) } href="/schools/">
								<div className="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">
									<FiInbox className="text-primary"/>
								</div>
								<span className="nav-link-text ms-1">Schools</span>
							</Link>
						</li>
						<li className="nav-item">
							<Link className={ `nav-link ` + ((['students.index','students.create','students.edit'].includes(route)) ? `active` : null) } href="/students/">
								<div className="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">
								<FiUsers className="text-primary"/>
								</div>
								<span className="nav-link-text ms-1">Students</span>
							</Link>
						</li>
					</ul>
				</div>
			</aside>
        </>
    )
}

export default Sidebar