import logo from "@/assets/images/logo.png";

const Logo = ({ isCollapse }: { isCollapse: boolean }) => {
	return (
		<div className="logo-box">
			<img src={logo} alt="logo" className="logo-img" />
			{!isCollapse ? <h2 className="logo-text">小然的工具箱</h2> : null}
		</div>
	);
};

export default Logo;
