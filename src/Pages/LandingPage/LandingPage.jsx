import React from "react";
import Footer from "../../component/Footer/Footer";
import backGroundPic from "./images/blackLogo.png";
import classes from  "./landingPage.module.css";
import { Link, useNavigate } from "react-router-dom";

function LandingPage() {
	const navigate = useNavigate();

	function ToLogIn() {
		navigate("./login");
	}
	return (
		<div>
			<div className={classes.background}>
				<ul>
					<li>
						<img src={backGroundPic} alt="" />
					</li>
					<li className={classes.item_link}>
						<Link to="">Home</Link>
					</li>
					<li className={classes.item_link}>
						<Link to="">How it works</Link>
					</li>

					<li>
						<button onClick={ToLogIn} className={classes.login_button}>
							Sign In
						</button>
					</li>
				</ul>
			</div>
			
				<Footer />
			
		</div>
	);
}

export default LandingPage;
