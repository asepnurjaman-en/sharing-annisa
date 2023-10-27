import React from "react";
import { Link, usePage } from "@inertiajs/inertia-react";
import PerfectScrollbar from "perfect-scrollbar";
import { FiUsers, FiInbox, FiMonitor } from "react-icons/fi";
import { FaCalendarWeek, FaCalendarDay, FaCalendarDays } from "react-icons/fa6";
import { FcApproval } from "react-icons/fc";
import { VscGithubInverted } from "react-icons/vsc";

function Sidebar({ route }) {
	if (document.getElementById('sidenav-collapse-main')) {
		new PerfectScrollbar(document.querySelector('#sidenav-collapse-main'));
	};
	const { auth } = usePage().props;

	

    return (
        <>
            <aside className="sidenav bg-white navbar navbar-vertical navbar-expand-xs border-0 border-radius-xl my-3 fixed-start ms-4 " id="sidenav-main">
				<div className="sidenav-header">
					<i className="ni ni-fat-remove p-3 cursor-pointer text-secondary opacity-5 position-absolute end-0 top-0 d-none d-xl-none" aria-hidden="true" id="iconSidenav"></i>
					<div className="navbar-brand d-flex gap-2 align-items-center m-0">
						<img src="https://raw.githubusercontent.com/innocenzi/awesome-inertiajs/main/assets/logo.svg" className="navbar-brand-img h-100" alt="main_logo"/>
						<div>
							<span className="font-weight-bold">
								{auth.user.name}
								{(auth.user.role=='developer') && (
									<a href="https://github.com/asepnurjaman-en" target="_BLANK">
										<VscGithubInverted title="You`re Developer" className="ms-1"/>
									</a>
								)}
								<FcApproval title="Verified account" className="ms-1"/>
							</span>
							<small className="text-muted text-xxs d-block">{auth.user.email}</small>
						</div>
					</div>
				</div>
				<div className="collapse navbar-collapse w-auto h-auto" id="sidenav-collapse-main">
					<ul className="navbar-nav">
						<li className="nav-item">
							<Link className={ `nav-link ` + ((['dashboard.index'].includes(route)) ? `active` : null) } href="/dashboard/">
								<div className="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">
									<FiMonitor className="text-primary"/>
								</div>
								<span className="nav-link-text ms-1">Dashboard</span>
							</Link>
						</li>
						{(function() {
							if (auth.user.role=='developer' || auth.user.role=='admin') {
								return (
								<>
									<li className="my-2 border-bottom"></li>
									<li className="nav-item">
										<Link className={ `nav-link ` + ((['meetings.index','meetings.create','meetings.show','meetings.edit'].includes(route)) ? `active` : null) } href="/admin/meetings/">
											<div className="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">
												<FaCalendarDays className="text-primary"/>
											</div>
											<span className="nav-link-text ms-1">Meetings</span>
										</Link>
									</li>
									<li className="my-2 border-bottom"></li>
									<li className="nav-item">
										<Link className={ `nav-link ` + ((['schools.index','schools.show','schools.edit'].includes(route)) ? `active` : null) } href="/admin/schools/">
											<div className="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">
												<FiInbox className="text-primary"/>
											</div>
											<span className="nav-link-text ms-1">Schools</span>
										</Link>
									</li>
									<li className="nav-item">
										<Link className={ `nav-link ` + ((['students.index','students.create','students.edit', 'students.create_account', 'students.edit_account'].includes(route)) ? `active` : null) } href="/admin/students/">
											<div className="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">
											<FiUsers className="text-primary"/>
											</div>
											<span className="nav-link-text ms-1">Students</span>
										</Link>
									</li>
								</>
								);
							} else if (auth.user.role=='user') {
								return (
									<>
										<li className="my-2 border-bottom"></li>
										<li className="nav-item">
											<Link className={ `nav-link ` + ((['user.meetings.myindex'].includes(route)) ? `active` : null) } href="/u/my-meetings/">
												<div className="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">
													<FaCalendarDay className="text-primary"/>
												</div>
												<span className="nav-link-text ms-1">My Meets</span>
											</Link>
										</li>
										<li className="nav-item">
											<Link className={ `nav-link ` + ((['user.meetings.engaged'].includes(route)) ? `active` : null) } href="/u/engaged-meetings/">
												<div className="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">
													<FaCalendarWeek className="text-primary"/>
												</div>
												<span className="nav-link-text ms-1">Engaged Meets</span>
											</Link>
										</li>
										<li className="nav-item">
											<Link className={ `nav-link ` + ((['user.meetings.index','user.meetings.show'].includes(route)) ? `active` : null) } href="/u/meetings/">
												<div className="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">
													<FaCalendarDays className="text-primary"/>
												</div>
												<span className="nav-link-text ms-1">Meetings</span>
											</Link>
										</li>
									</>
								);
							}
						})()}
					</ul>
				</div>
			</aside>
        </>
    )
}

export default Sidebar