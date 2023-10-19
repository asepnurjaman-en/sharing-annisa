import React from 'react';
import Layout from '../../Layouts/Default';
import { Link, Head } from '@inertiajs/inertia-react';
import { FiChevronLeft } from 'react-icons/fi';

export default function ShowSchool({ students, school, current_route }) {
	const breadcrumb = [
		{
			url: `/home`,
			text: `Dashboard`
		},
		{
			url: `/schools`,
			text: `Schools`
		},
		{
			url: `#`,
			text: school.name
		}
	];
	var total = document.querySelectorAll('.nav-pills');

	total.forEach(function(item, i) {
		var moving_div = document.createElement('div');
		var first_li = item.querySelector('li:first-child .nav-link');
		var tab = first_li.cloneNode();
		tab.innerHTML = "-";

		moving_div.classList.add('moving-tab', 'position-absolute', 'nav-link');
		moving_div.appendChild(tab);
		item.appendChild(moving_div);

		var list_length = item.getElementsByTagName("li").length;

		moving_div.style.padding = '0px';
		moving_div.style.width = item.querySelector('li:nth-child(1)').offsetWidth + 'px';
		moving_div.style.transform = 'translate3d(0px, 0px, 0px)';
		moving_div.style.transition = '.5s ease';

		item.onmouseover = function(event) {
			let target = getEventTarget(event);
			let li = target.closest('li'); // get reference
			if (li) {
			let nodes = Array.from(li.closest('ul').children); // get array
			let index = nodes.indexOf(li) + 1;
			item.querySelector('li:nth-child(' + index + ') .nav-link').onclick = function() {
				moving_div = item.querySelector('.moving-tab');
				let sum = 0;
				if (item.classList.contains('flex-column')) {
				for (var j = 1; j <= nodes.indexOf(li); j++) {
					sum += item.querySelector('li:nth-child(' + j + ')').offsetHeight;
				}
				moving_div.style.transform = 'translate3d(0px,' + sum + 'px, 0px)';
				moving_div.style.height = item.querySelector('li:nth-child(' + j + ')').offsetHeight;
				} else {
				for (var j = 1; j <= nodes.indexOf(li); j++) {
					sum += item.querySelector('li:nth-child(' + j + ')').offsetWidth;
				}
				moving_div.style.transform = 'translate3d(' + sum + 'px, 0px, 0px)';
				moving_div.style.width = item.querySelector('li:nth-child(' + index + ')').offsetWidth + 'px';
				}
			}
			}
		}
		
		function getEventTarget(e) {
			e = e || window.event;
			return e.target || e.srcElement;
		}
	});

	return (
		<>
			<Head>
				<title>{breadcrumb[breadcrumb.length -1].text}</title>
			</Head>
			<Layout route={current_route} breadcrumb={breadcrumb}>
				<div className="container-fluid py-4">
					<div className="card mb-4">
						<div className="card-header pb-0">
							<div className="d-flex gap-3">
								<Link href={`/schools`} className="btn bg-gradient-default d-none d-lg-inline-flex align-items-center mb-0">
									<FiChevronLeft className="me-1" />
									<span>Back</span>
								</Link>
								<div>
									<h6 className="mb-0">{school.name}</h6>
									<p className="text-sm mb-0">Create at {school.formatted_date}</p>
								</div>
							</div>
							<hr className="horizontal dark my-3"/>
						</div>
						<div className="card-body px-0 pt-0 pb-2">
							<div className="nav-wrapper position-relative end-0">
								<ul className="nav nav-pills nav-fill p-1 mx-4" role="tablist">
									<li className="nav-item">
										<Link className="nav-link mb-0 px-0 py-1 active d-flex align-items-center justify-content-center " data-bs-toggle="tab" data-bs-target="#active" href="#active" role="tab" aria-selected="true">
											<span className="ms-2">Active</span>
										</Link>
									</li>
									<li className="nav-item">
										<Link className="nav-link mb-0 px-0 py-1 d-flex align-items-center justify-content-center" data-bs-toggle="tab" data-bs-target="#passed" href="#passed" role="tab" aria-selected="false">
											<span className="ms-2">Passed</span>
										</Link>
									</li>
									<li className="nav-item">
										<Link className="nav-link mb-0 px-0 py-1 d-flex align-items-center justify-content-center" data-bs-toggle="tab" data-bs-target="#scheduled" href="#scheduled" role="tab" aria-selected="false">
											<span className="ms-2">Scheduled</span>
										</Link>
									</li>
								</ul>
								<div className="tab-content">
									<div className="tab-pane py-3 fade show active" id="active" role="tabpanel" aria-labelledby="active-tab">
										<div className="table-responsive p-0">
											<table className="table align-items-center mb-0">
												<thead>
													<tr>
														<th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Student name</th>
														<th className="text-uppercase text-secondary text-xxs opacity-7">Period</th>
													</tr>
												</thead>
												<tbody>
													{ (students.active.length) ? students.active.map((item, index) => (
													<tr key={ index }>
														<td>
															<div className="px-3 py-1">
																<div className="d-flex flex-column justify-content-center">
																	<h6 className="mb-1 text-sm">
																		{ item.student.name }
																	</h6>
																	<Link href={`/students/${item.student.id}/edit`} className="fw-bold text-primary text-xs" data-bs-toggle="tooltip" title="Edit student">
																		Edit
																	</Link>
																</div>
															</div>
														</td>
														<td className="text-sm">
															{item.formatted_start}
															<span className='opacity-5 px-2'>to</span>
															{item.formatted_departure}
														</td>
													</tr>
													)) : 
													<tr>
														<td colSpan={3} className='text-center text-sm text-muted opacity-5 py-3'>No student active</td>
													</tr> }
												</tbody>
											</table>
										</div>
									</div>
									<div className="tab-pane py-3 fade" id="passed" role="tabpanel" aria-labelledby="passed-tab">
										<div className="table-responsive p-0">
											<table className="table align-items-center mb-0">
												<thead>
													<tr>
														<th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Student name</th>
														<th className="text-uppercase text-secondary text-xxs opacity-7">Period</th>
													</tr>
												</thead>
												<tbody>
													{ (students.passed.length) ? students.passed.map((item, index) => (
													<tr key={ index }>
														<td>
															<div className="px-3 py-1">
																<div className="d-flex flex-column justify-content-center">
																	<h6 className="mb-1 text-sm">
																		{ item.student.name }
																	</h6>
																	<Link href={`/students/${item.student.id}/edit`} className="fw-bold text-primary text-xs" data-bs-toggle="tooltip" title="Edit student">
																		Edit
																	</Link>
																</div>
															</div>
														</td>
														<td className="text-sm">
															{item.formatted_start}
															<span className='opacity-5 px-2'>to</span>
															{item.formatted_departure}
														</td>
													</tr>
													)) :
													<tr>
														<td colSpan={3} className='text-center text-sm text-muted opacity-5 py-3'>No student passed</td>
													</tr> }
												</tbody>
											</table>
										</div>
									</div>
									<div className="tab-pane py-3 fade" id="scheduled" role="tabpanel" aria-labelledby="scheduled-tab">
										<div className="table-responsive p-0">
											<table className="table align-items-center mb-0">
												<thead>
													<tr>
														<th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Student name</th>
														<th className="text-uppercase text-secondary text-xxs opacity-7">Period</th>
													</tr>
												</thead>
												<tbody>
													{ (students.scheduled.length) ? students.scheduled.map((item, index) => (
													<tr key={ index }>
														<td>
															<div className="px-3 py-1">
																<div className="d-flex flex-column justify-content-center">
																	<h6 className="mb-1 text-sm">
																		{ item.student.name }
																	</h6>
																	<Link href={`/students/${item.student.id}/edit`} className="fw-bold text-primary text-xs" data-bs-toggle="tooltip" title="Edit student">
																		Edit
																	</Link>
																</div>
															</div>
														</td>
														<td className="text-sm">
															{item.formatted_start}
															<span className='opacity-5 px-2'>to</span>
															{item.formatted_departure}
														</td>
													</tr>
													)) : 
													<tr>
														<td colSpan={3} className='text-center text-sm text-muted opacity-5 py-3'>No student scheduled</td>
													</tr> }
												</tbody>
											</table>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</Layout>
		</>
	);
}