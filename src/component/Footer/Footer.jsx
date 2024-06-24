import React from "react";
import whiteLogo from "./images/whiteLogo.png";
import classes from "./Footer.module.css";
import FacebookRoundedIcon from "@mui/icons-material/FacebookRounded";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import { Link } from "react-router-dom";

function Footer() {
	return (
		<footer className={classes.footer}>
			<div className={classes.footerContainer}>
				<div className={classes.logoContainer}>
					<Link to="#">
						<img src={whiteLogo} alt="Logo" className={classes.logo} />
					</Link>
					<div className={classes.socialMedia}>
						<a href="#">
							<FacebookRoundedIcon fontSize="large" />
						</a>
						<a href="#">
							<InstagramIcon fontSize="large" />
						</a>
						<a href="#">
							<YouTubeIcon fontSize="large" />
						</a>
					</div>
				</div>
				<div className={classes.links}>
					<h2>Useful Links</h2>
					<ul>
						<li>
							<Link to="#">Terms of Service</Link>
						</li>
						<li>
							<Link to="#">Privacy Policy</Link>
						</li>
					</ul>
				</div>
				<div className={classes.contactInfo}>
					<h2>Contact Info</h2>
					<ul>
						<li>support@evangadi.com</li>
						<li>+1-202-386-2702</li>
					</ul>
				</div>
			</div>
		</footer>
	);
}

export default Footer;
