import { IconButton, makeStyles, Tooltip } from "@material-ui/core";
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
import { format } from "date-fns";
import React from "react";
import { useHistory, useLocation } from "react-router-dom";
import logoSatsi from "../../assets/images/logo_satsi.png";
import logoSatsi1 from "../../assets/images/logo_footer.png";
import "./Layout.css";
const drawerWidth = 270;

const useStyles = makeStyles((theme) => {
  return {
    page: {
      background: "#f9f9f9",
      width: "100%",
      padding: theme.spacing(3),
    },
    root: {
      display: "flex",
    },
    drawer: {
      width: drawerWidth,
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
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
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
  };
});

export default function Layout({ children }) {
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();

  const menuItems = [
    {
      text: "Home",
      icon: <HomeOutlinedIcon color="primary" />,
      path: "/",
    },
    {
      text: "Users",
      icon: <PeopleOutlinedIcon color="primary" />,
      path: "/users",
    },
    {
      text: "Voucher Free",
      icon: <SubjectOutlined color="primary" />,
      path: "/list-search-free",
    },
    {
      text: "Services",
      icon: <DnsOutlinedIcon color="primary" />,
      path: "/services",
    },
  ];
  const handleLogout = () => {
    localStorage.removeItem("token");
    history.push("/sign-in");
  };

  return (
    <div className={classes.root}>
      {/* app bar */}
      <AppBar
        position="fixed"
        className={classes.appBar}
        elevation={0}
        color="primary"
      >
        <Toolbar>
          <Typography className={classes.date}>
            Today is the {format(new Date(), "do MMMM Y")}
          </Typography>
          <Typography>Admin</Typography>
          <Avatar alt="admin" src={logoSatsi1} />
          <Tooltip title="Đăng Xuất">
            <IconButton
              variant="contained"
              onClick={handleLogout}
              aria-label="delete"
            >
              <Typography variant="caption" style={{ color: "white" }}>
                Đăng xuất
              </Typography>
              <ExitToApp
                color="secondary"
                style={{ color: "white", marginLeft: "5px" }}
              />
            </IconButton>
          </Tooltip>
        </Toolbar>
      </AppBar>

      {/* side drawer */}
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{ paper: classes.drawerPaper }}
        anchor="left"
      >
        <div>
          <div style={{ textAlign: "center" }}>
            <img alt="admin" src={logoSatsi} />
          </div>

          <Typography variant="h5" className={classes.title}>
            Minh Triết Nhân Sinh
          </Typography>
        </div>

        {/* links/list section */}
        <List>
          {menuItems.map((item) => (
            <ListItem
              button
              key={item.text}
              onClick={() => history.push(item.path)}
              className={location.pathname == item.path ? classes.active : null}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>
      </Drawer>

      {/* main content */}
      <div className={classes.page}>
        <div className={classes.toolbar}></div>
        {children}
      </div>
    </div>
  );
}
