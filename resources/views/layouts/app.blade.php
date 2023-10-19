<!doctype html>
<html>
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<link rel="shortcut icon" href="{{ asset('icons/inertia.png') }}" type="image/x-icon">
	@viteReactRefresh
	@vite(['resources/js/app.jsx', 'resources/css/app.css'])
	@inertiaHead
</head>
<body class="g-sidenav-show bg-gray-100">
	@inertia
</body>
</html>
