import React, { useEffect, useState } from "react";

import classes from "./answer.module.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "../../axiosConfig";
import { useParams } from "react-router-dom";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import ScrollableComponent from "../../component/ScrollableComponent/scrollableComponent";
import LayOut from "../../layOut/LayOut";

function Answer() {
	const [answer, setAnswer] = useState("");
	const [bringAnswer, setBringAnswer] = useState([]);
	const [bringQuestion, setBringQuestion] = useState({});
	const [answerGiven, setAnswerGiven] = useState(false);
	const token = localStorage.getItem("token");
	const { questionid } = useParams();
	const navigate = useNavigate();

	useEffect(() => {
		if (questionid) {
			postedAnswer();
			postedQuestion();
		}
	}, [questionid]);

	async function postedAnswer() {
		try {
			const { data } = await axios.get(`/answers/${questionid}`, {
				headers: {
					Authorization: "Bearer " + token,
				},
			});
			setBringAnswer(data.answers);
		} catch (error) {
			console.log(error.response);
		}
	}

	async function postedQuestion() {
		try {
			const { data } = await axios.get(`/questions/${questionid}`, {
				headers: {
					Authorization: "Bearer " + token,
				},
			});
			console.log("Question data:", data); // Log the response data
			setBringQuestion(data.question);
		} catch (error) {
			console.log(error.response);
		}
	}

	async function postAnswer(e) {
		e.preventDefault();
		if (answer.length === 0) {
			alert("Please enter your answer");
			return;
		}
		try {
			const { data } = await axios.post(
				`/answers/${questionid}`,
				{ answer },
				{
					headers: {
						Authorization: "Bearer " + token,
					},
				}
			);
			setAnswerGiven(true);
			setAnswer("");
			setTimeout(() => {
				window.location.reload();
			}, 2000);
		} catch (error) {
			console.log(error.response);
		}
	}

	return (
		<>
			<LayOut>
				<section className={classes.answer_page}>
					<div className={classes.border_bottom}>
						<h1>Question</h1>
						<div className={classes.question}>
							<div className={classes.question_area}>
								<p
									style={{
										fontWeight: "bold",
										fontSize: "30px",
										borderBottom: "3px solid #fe8303",
										marginBottom: "2vh",
									}}
								>
									{bringQuestion.title}
								</p>
								<p
									style={{
										color: "rgb(95, 92, 92)",
										fontSize: "20px",
									}}
								>
									{bringQuestion.description}
								</p>
							</div>
						</div>

						<h1 className={classes.top_bottom}>Answers From The Community</h1>
						<div className={classes.answers_list}>
							<ScrollableComponent
								style={{
									height: "350px",
									display: bringAnswer.length ? "block" : "none",
								}}
							>
								{bringAnswer.map((answer, index) => (
									<div key={index} className={classes.answer}>
										<div>
											<AccountCircleOutlinedIcon style={{ fontSize: "100" }} />
											<p style={{ fontWeight: "bold", textAlign: "center" }}>
												{answer.username}
											</p>
										</div>
										<div>
											<p>{answer.answer}</p>
										</div>
									</div>
								))}
							</ScrollableComponent>
						</div>
					</div>
					<div className={classes.middle}>
						<h1>Answer The Top Question</h1>
						<small
							style={{
								display: answerGiven ? "block" : "none",
								color: "green",
								fontSize: "20px",
							}}
						>
							Answer posted successfully
						</small>

						<h2>
							<Link to={"/home"}>Go to question page</Link>
						</h2>

						<form onSubmit={postAnswer}>
							<textarea
								value={answer}
								onChange={(e) => setAnswer(e.target.value)}
								rows="10"
								cols="125"
								placeholder="Write your answer here..."
							></textarea>
							<button type="submit">Post Your Answer</button>
						</form>
					</div>
				</section>
			</LayOut>
		</>
	);
}

export default Answer;
