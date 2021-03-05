import React from "react";
import { useSelector } from "react-redux";
import Spinner from "../assets/spinner.svg";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Sidebar from "../components/Sidebar";
import ContentArea from "../components/ContentArea";
const Todo = () => {
    const loading = useSelector((state) => state.todoReducer.loading);
    const useStyles = makeStyles({
        loadingContainer: {
            height: "100vh",
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
        },
        loadingText: {
            marginTop: "2rem",
            fontFamily: "monospace",
            fontSize: "18px",
        },
        root: {
            display: "flex",
            flexDirection: "row",
        },
    });

    const classes = useStyles();

    if (loading)
        return (
            <div className={classes.loadingContainer}>
                <img src={Spinner} alt="" />
                <Typography className={classes.loadingText}>
                    Loading...
                </Typography>
            </div>
        );
    return (
        <div className={classes.root}>
            <Sidebar />
            <ContentArea />
        </div>
    );
};

export default Todo;
