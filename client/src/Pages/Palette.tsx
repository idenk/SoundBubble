import React, { useState, useEffect } from "react";
import Navigation from "../Components/Navigation";
import PalettePart from "../Components/Palette/PalettePart";
import styled from "styled-components";

import "./Styles/Palette.css";

export const PaletteModal = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	position: absolute;
	z-index: 999;
	width: 100%;
	height: 120vh;
	background-color: rgba(2, 7, 21, 0.5);
	font-size: 3rem;
	animation: BackgroundFadeIn 3s;

	@keyframes BackgroundFadeInOut {
		0% {
			background-color: transparent;
		}
		50% {
			background-color: rgba(2, 7, 21, 0.5);
		}
		100% {
			background-color: transparent;
		}
	}
`;

const Palette = (): JSX.Element => {
	const [modalOpen, setModalOpen] = useState(true);
	const handleModalClose = () => {
		setTimeout(() => setModalOpen(false), 2900);
	};

	useEffect(() => {
		handleModalClose();
	}, []);

	return (
		<>
			{modalOpen ? (
				<PaletteModal>
					<p className="palette-message">다른사람의 버블을 구경해보세요</p>
				</PaletteModal>
			) : null}
			<div className="palette-main">
				<Navigation />
				<PalettePart />
			</div>
		</>
	);
};

export default Palette;
