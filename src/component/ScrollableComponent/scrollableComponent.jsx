import React from "react";
import "./ScrollableComponent.css";

const ScrollableComponent = ({ children, style }) => {
	return (
		<div className="scrollable-container" style={style}>
			{children}
		</div>
	);
};

export default ScrollableComponent;
