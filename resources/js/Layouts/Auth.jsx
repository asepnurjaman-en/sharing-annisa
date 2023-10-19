import React from "react";
import 'bootstrap/dist/js/bootstrap.min.js';

function Layout({ children }) {
    return (
		<>
            <main className="main-content  mt-0">
                { children }
            </main>
        </>
    )
}

export default Layout