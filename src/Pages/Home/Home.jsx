import { useContext, useEffect, useState } from "react";
import { AppState } from "../../App";
import Header from "../../component/Header/Header";

import Footer from "../../component/Footer/Footer";
import { Link, useNavigate } from "react-router-dom";
import classes from "./home.module.css";
import axios from "../../axiosConfig";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import ScrollableComponent from "../../component/ScrollableComponent/scrollableComponent";
function Home() {
	const [questions, setQuestions] = useState([]);
	
	const token = localStorage.getItem("token");

	
	const { user } = useContext(AppState);
	async function userx() {
		try {
			const { data } = await axios.get("/questions/see-questions", {
				headers: {
					Authorization: "Bearer " + token,
				},
			});
			setQuestions(data.questions);
			console.log(data);
			// setUsername(username);
		} catch (error) {
			console.log(error.response);
		}
	}

	useEffect(() => {
		userx();
	}, []);
	const navigate = useNavigate();
	async function toQuestions(e) {
		e.preventDefault();
		navigate("/askquestion");
	}
	console.log(user);
	return (
		<>
			<section className={classes.top_container}>
				<Header />
				<div className={classes.question}>
					<div>
						<button onClick={toQuestions}>Ask Question</button>
					</div>
					<div>
						<h2>Wellcome : {user?.username}</h2>
					</div>
				</div>
				<div>
					<div className={classes.question_box}>
						<h1>Questions</h1>
						<ScrollableComponent>
							{questions?.map((question, i) => (
								<Link
									to={`/answers/${question.questionid}`}
									className={classes.flexing}
									key={question.questionid}
								>
									<div className={classes.question_list}>
										<div>
											<AccountCircleOutlinedIcon style={{ fontSize: '100' }} />
											<p>{question.username}</p>
										</div>
										<div>
											<h3>{question.title}</h3>
										</div>
									</div>
									<div className={classes.arrow}>
										<ArrowForwardIosSharpIcon />
									</div>
								</Link>
							))}
						</ScrollableComponent>
					</div>
				</div>
				<Footer />
			</section>
		</>
	);
}

export default Home;
