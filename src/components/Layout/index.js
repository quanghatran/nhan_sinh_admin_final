import {
	CssBaseline,
	Divider,
	Hidden,
	IconButton,
	Tooltip,
} from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import Avatar from "@material-ui/core/Avatar";
import { deepPurple } from "@material-ui/core/colors";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { ExitToApp, SubjectOutlined } from "@material-ui/icons";
import DnsOutlinedIcon from "@material-ui/icons/DnsOutlined";
import HomeOutlinedIcon from "@material-ui/icons/HomeOutlined";
import PeopleOutlinedIcon from "@material-ui/icons/PeopleOutlined";
import React from "react";
import { useHistory, useLocation } from "react-router-dom";
import logoSatsi from "../../assets/images/logo_satsi.png";
import logoSatsi1 from "../../assets/images/logo_footer.png";
import DirectionsBikeOutlinedIcon from "@material-ui/icons/DirectionsBikeOutlined";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import MenuIcon from "@material-ui/icons/Menu";
import moment from "moment";

import "./Layout.css";
const drawerWidth = 240;

const useStyles = makeStyles((theme) => {
	return {
		root: {
			display: "flex",
		},
		drawer: {
			[theme.breakpoints.up("sm")]: {
				width: drawerWidth,
				flexShrink: 0,
			},
		},

		appBar: {
			[theme.breakpoints.up("sm")]: {
				width: `calc(100% - ${drawerWidth}px)`,
				marginLeft: drawerWidth,
			},
		},

		menuButton: {
			marginRight: theme.spacing(2),
			[theme.breakpoints.up("sm")]: {
				display: "none",
			},
		},
		drawerPaper: {
			width: drawerWidth,
		},
		active: {
			background: "#f4f4f4",
		},
		title: {
			padding: theme.spacing(2),
		},
		appBar: {
			[theme.breakpoints.up("sm")]: {
				width: `calc(100% - ${drawerWidth}px)`,
				marginLeft: drawerWidth,
			},
		},
		date: {
			flexGrow: 1,
		},
		toolbar: theme.mixins.toolbar,
		avatar: {
			margin: theme.spacing(1),
			width: theme.spacing(8),
			height: theme.spacing(8),
			margin: "0 auto",
		},
		content: {
			flexGrow: 1,
			padding: theme.spacing(3),
		},
	};
});

export default function Layout({ children }) {
	const classes = useStyles();
	const history = useHistory();
	const location = useLocation();
	const theme = useTheme();

	// const { window } = props;
	const [mobileOpen, setMobileOpen] = React.useState(false);

	const handleDrawerToggle = () => {
		setMobileOpen(!mobileOpen);
	};

	const menuItems = [
		{
			text: "Home",
			icon: <HomeOutlinedIcon color='primary' />,
			path: "/",
		},
		{
			text: "Users",
			icon: <PeopleOutlinedIcon color='primary' />,
			path: "/users",
		},
		{
			text: "Voucher Free",
			icon: <SubjectOutlined color='primary' />,
			path: "/list-search-free",
		},
		{
			text: "Coaching",
			icon: <DirectionsBikeOutlinedIcon color='primary' />,
			path: "/direct-meeting",
		},
		{
			text: "Services",
			icon: <DnsOutlinedIcon color='primary' />,
			path: "/services",
		},
	];
	const handleLogout = () => {
		localStorage.removeItem("token");
		history.push("/sign-in");
	};

	const handleClickNavigate = (path) => {
		setMobileOpen(false);
		history.push(path);
	};

	/* side drawer */
	const drawer = (
		<div>
			<div className={classes.toolbar} />
			<div style={{ textAlign: "center" }}>
				<img alt='admin' src={logoSatsi} style={{ width: "140px" }} />
			</div>
			<Typography variant='h6' className={classes.title}>
				Minh Triết Nhân Sinh
			</Typography>
			<List>
				{menuItems.map((item) => (
					<ListItem
						button
						key={item.text}
						onClick={(e) => {
							handleClickNavigate(item.path);
						}}
						className={location.pathname == item.path ? classes.active : null}>
						<ListItemIcon>{item.icon}</ListItemIcon>
						<ListItemText primary={item.text} />
					</ListItem>
				))}
			</List>
		</div>
	);

	return (
		<div className={classes.root}>
			<CssBaseline />
			{/* app bar */}
			<AppBar position='fixed' className={classes.appBar} color='primary'>
				<Toolbar>
					<IconButton
						color='inherit'
						aria-label='open drawer'
						edge='start'
						onClick={handleDrawerToggle}
						className={classes.menuButton}>
						<MenuIcon />
					</IconButton>
					<Typography className={classes.date}>
						{moment(new Date()).format("DD/MM/YYYY")}
					</Typography>
					{/* <Typography>Admin</Typography> */}
					{/* <Avatar alt='admin' src={logoSatsi1} /> */}
					<Tooltip title='Đăng Xuất'>
						<IconButton
							variant='contained'
							onClick={handleLogout}
							aria-label='delete'>
							<Typography variant='caption' style={{ color: "white" }}>
								Đăng xuất
							</Typography>
							<ExitToApp
								color='secondary'
								style={{ color: "white", marginLeft: "5px" }}
							/>
						</IconButton>
					</Tooltip>
				</Toolbar>
			</AppBar>

			<nav className={classes.drawer} aria-label='mailbox folders'>
				<Hidden smUp implementation='css'>
					<Drawer
						// container={container}
						variant='temporary'
						anchor={theme.direction === "rtl" ? "right" : "left"}
						open={mobileOpen}
						onClose={handleDrawerToggle}
						classes={{
							paper: classes.drawerPaper,
						}}
						ModalProps={{
							keepMounted: true, // Better open performance on mobile.
						}}>
						{drawer}
					</Drawer>
				</Hidden>
				<Hidden xsDown implementation='css'>
					<Drawer
						classes={{
							paper: classes.drawerPaper,
						}}
						variant='permanent'
						open>
						{drawer}
					</Drawer>
				</Hidden>
			</nav>

			{/* main content */}
			<div className={classes.content}>
				<div className={classes.toolbar}></div>
				{children}
			</div>
		</div>
	);
}
