import React, { useContext } from "react";
import { Link } from "react-router-dom";
import evangadi from "./images/blackLogo.png";
import classes from "./header.module.css";
import { AppState } from "../../App";

function Header() {
	const { user, Logout } = useContext(AppState);
	return (
		<>
			<div className={classes.header_outer_container}>
				<div className={classes.header}>
					<div>
						<Link to={"/home"}>
							<img src={evangadi} alt="" />
						</Link>
					</div>
					<div className={classes.header_inside_container}>
						<div>Home</div>
						<div>How it works</div>
						{!user?.username ? (
							<button
								onClick={Logout}
							>
								SIGN IN
							</button>
						) : (
							<button
								onClick={Logout}
							>
								LogOut
							</button>
						)}
					</div>
				</div>
			</div>
		</>
	);
}

export default Header;
