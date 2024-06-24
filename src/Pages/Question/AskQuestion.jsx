import React, { useState } from "react";
import classes from "./askQuestion.module.css"
import { Link, useNavigate } from "react-router-dom";
import axios from "../../axiosConfig";
import LayOut from "../../layOut/LayOut";

function AskQuestion() {
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [successful, setSuccessful] = useState(false);
	const [questionId, setQuestionId] = useState("");
	const token = localStorage.getItem("token");
	const navigate = useNavigate();

	async function addQuestion(e) {
		e.preventDefault();
		setSuccessful(!successful);
		try {
			if (title.length === 0 && description.length === 0) {
				alert("Please fill all the fields");
			} else if (title.length === 0) {
				alert("Please fill the title of your Question!");
			} else if (description.length === 0) {
				alert("Please fill the description of your Question!");
			}
			const { data } = await axios.post(
				"/questions/ask-questions",
				{ title, description },
				{
					headers: {
						Authorization: "Bearer " + token,
					},
				}
			);
			
			setQuestionId(data.questionId); 
			setTimeout(() => {
				navigate("/home");
			}, 1000);
		} catch (error) {
			console.log(error.response);
		}
	}
	return (
		<>
			<LayOut>
				<div className={classes.all_section}>
					<div className={classes.container}>
						<div className={classes.instructions}>
							<h2>Steps to write a good question</h2>
							<ul>
								<li>Summarize your problem in a one-line title.</li>
								<li>Describe your problem in more detail.</li>
								<li>
									Describe what you tried and what you expected to happen.
								</li>
								<li>Review your question and post it to the site.</li>
							</ul>
						</div>
					</div>
					<section>
						<div className={classes.question_area}>
							<div className={classes.inside_question_area}>
								<h2>Ask a public question</h2>
							</div>
							<div>
								<small
									style={{
										display: successful ? "block" : "none",
										color: "green",
										fontSize: "20PX",
									}}
								>
									Question posted successfully. Redirecting to home page...
								</small>
							</div>
							<div>
								<h2>
									<Link to={"/home"}>Go to question page</Link>
								</h2>
							</div>
							<div>
								<form action="" onSubmit={addQuestion}>
									<div>
										<input
											type="text"
											value={title}
											onChange={(e) => setTitle(e.target.value)} // updating the state
											placeholder="Title"
										/>
									</div>
									<div>
										<textarea
											value={description}
											onChange={(e) => setDescription(e.target.value)} // Updating the state
											rows="10"
											cols="125"
											placeholder="Question Description..."
										></textarea>
									</div>
									<div>
										<button type="submit">Post Your Question</button>
									</div>
								</form>
							</div>
						</div>
					</section>
				</div>
			</LayOut>
		</>
	);
}

export default AskQuestion;
