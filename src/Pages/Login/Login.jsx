import { useRef, useState } from "react";
import axios from "../../axiosConfig";
import { Link, useNavigate } from "react-router-dom";

import classes from "./login.module.css";
import Register from "../Register/Register";

import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import VisibilityOffRoundedIcon from "@mui/icons-material/VisibilityOffRounded";
import LayOut from "../../layOut/LayOut";

function Login() {
	const [loginError, setLoginError] = useState();
	const [passwordVisible, setPasswordVisible] = useState(false);
	const navigate = useNavigate();
	const emailDom = useRef();
	const passwordDom = useRef();
	const [toggle, setToggle] = useState(true);
	async function handleToggle(e) {
		e.preventDefault();
		setToggle(!toggle);
	}
	async function visibliity(e) {
		e.preventDefault();
		setPasswordVisible(!passwordVisible);
	}

	async function handleSubmit(e) {
		e.preventDefault();
		const emailValue = emailDom.current.value;
		const passwordValue = passwordDom.current.value;
		if (!emailValue || !passwordValue) {
			alert("Please fill all the fields");
			return;
		}
		try {
			const { data } = await axios.post("/users/login", {
				email: emailValue,
				password: passwordValue,
			});
			// alert("User logged in successfully");
			localStorage.setItem("token", data.token);
			navigate("/home");
			//   console.log(data)
		} catch (error) {
			// alert(error?.response?.data?.msg);
			console.log(error.response.data);
			setLoginError(error?.response?.data?.msg);
		}
	}

	return (
		<>
			<LayOut>
				<div className={classes.full_page}>
					<div className={classes.container}>
						<div className={classes.container_content}>
							<div className={classes.first_box}
								style={{ display: !toggle ? "none" : "block" }}>
								<form onSubmit={handleSubmit}>
									<div style={{ fontWeight: "bold" }}>
										Login to your account
									</div>
									<div>
										<span>Don't have an account? </span>
										<span className={classes.register_link}>
											<Link onClick={handleToggle}>Create a new account</Link>
										</span>
									</div>
									<div>
										<p style={{ color: "red" }}>{loginError}</p>
									</div>
									<div>
										<input ref={emailDom} type="text" placeholder="email" />
									</div>
									<div className={classes.eye_input_container}>
										<input
											ref={passwordDom}
											className="eyeInput"
											type={passwordVisible ? "text" : "password"}
											// type="password"
											placeholder="password"
										/>
										{passwordVisible ? (
											<VisibilityRoundedIcon
												className={classes.toggle_password}
												onClick={visibliity}
											/>
										) : (
											<VisibilityOffRoundedIcon
												className={classes.toggle_password}
												onClick={visibliity}
											/>
										)}
									</div>
									<div className={classes.left_container}>
										<Link to="#">Forgot Password?</Link>
									</div>
									<div>
										<button type="submit">Log in</button>
									</div>
								</form>
								{/* ) : ( */}

								<br />
								{/* <Link to={"/register"}>register</Link> */}
							</div>
							<div
								style={{ display: toggle ? "none" : "block" }}
								className={classes.first_box}
							>
								<Register handleToggle={handleToggle} />
							</div>
							<div className={classes.second_box}>
								<h2>About</h2>
								<h1>Evangadi Networks Q&A</h1>
								<div>
									<div>
										Over the past three years, we have dedicated ourselves to
										educating and guiding our students toward becoming major
										contributors and leaders of the digital arena.
									</div>
									<div>
										We've reached a point where we can proudly say several of
										our students are now at the mid-level developer caliber.
									</div>
									<div>
										If your organization is in the pursuit of a mid-level
										developer, our intimate knowledge of our students'
										capabilities, including their strengths and areas for
										improvement, allows us to facilitate a match that aligns
										with your needs without overstating their abilities.
									</div>
								</div>
								<div>
									<button>HOW IT WORKS</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</LayOut>
		</>
	);
}

export default Login;
