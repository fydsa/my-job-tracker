import MainImage from '../assets/images/main.svg';
import styled from 'styled-components';
import { Logo } from '../components';
import { Link } from 'react-router-dom';

const Landing = () => {
	return (
		<Wrapper>
			<nav>
				<Logo />
			</nav>
			<div className='container page'>
				<div className='info'>
					<h1>
						Job <span>tracking</span> app
					</h1>
					<p>
						Helvetica food truck lomo, lo-fi salvia venmo pug.
						Forage hexagon cornhole tumeric chartreuse. Cold-pressed
						microdosing kombucha copper mug, hell of PBR&B meggings.
						Tousled slow-carb artisan ramps, +1 vexillologist
						chambray raw denim squid big mood church-key venmo
						cliche direct trade. Bitters blue bottle vexillologist
						chicharrones knausgaard street art tumblr umami occupy
						fit. Distillery flannel selvage chambray flexitarian.
					</p>
					<Link to='/register' className='btn btn-hero'>
						Login/Register
					</Link>
				</div>
				<img src={MainImage} alt='job hunt' className='img main-img' />
			</div>
		</Wrapper>
	);
};

const Wrapper = styled.main`
	nav {
		width: var(--fluid-width);
		max-width: var(--max-width);
		margin: 0 auto;
		height: var(--nav-height);
		display: flex;
		align-items: center;
	}
	.page {
		min-height: calc(100vh - var(--nav-height));
		display: grid;
		align-items: center;
		margin-top: -3rem;
	}
	h1 {
		font-weight: 700;
		span {
			color: var(--primary-500);
		}
	}
	p {
		color: var(--grey-600);
	}
	.main-img {
		display: none;
	}
	@media (min-width: 992px) {
		.page {
			grid-template-columns: 1fr 1fr;
			column-gap: 3rem;
		}
		.main-img {
			display: block;
		}
	}
`;

export default Landing;
