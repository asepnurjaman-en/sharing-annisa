import React from "react";
import Layout from "../../../Layouts/Default";
import { Link, Head } from "@inertiajs/inertia-react";
import { FiUser, FiList, FiCalendar } from "react-icons/fi";
import { FcRemoveImage } from "react-icons/fc";

export default function SchoolMyIndex({ meetings, current_route }) {
	const breadcrumb = [
		{
			url: `/dashboard`,
			text: `Dashboard`
		},
		{
			url: `#`,
			text: `Engaged Meetings`
		}
	];

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
										<div className="card-body pb-0">
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
											{ item.actors.map((sub_item, sub_index) => (
											<div className="d-block bg-gray-100 border rounded text-sm p-2 my-1" key={sub_index}>
												<FiUser className="text-warning me-1"/>
												<span>You are trusted as <b>{sub_item.stakeholder}</b></span>
											</div>
											)) }
										</div>
										<div className="d-flex gap-2 justify-content-between card-footer">
											<Link href={`/u/meetings/${item.id}`} className="d-flex align-items-center justify-content-center btn bg-gradient-default text-xs w-100 mb-0" data-bs-toggle="tooltip" title="Detail meeting">
												<FiList className="me-1"/>
												<span className="d-none d-lg-inline">Detail meeting</span>
											</Link>
										</div>
									</div>
								</div>
								)) : 
								<div className="card card-body min-vh-50 d-flex align-items-center justify-content-center">
									<FcRemoveImage className="fs-1 mb-2"/>
									<span>You have no meeting yet</span>
								</div> }
							</div>
						</div>
					</div>
				</div>
			</Layout>
		</>
	)
}
