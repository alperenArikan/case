import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import { createContent } from "../store/todoSlice";
import { useDispatch, useSelector } from "react-redux";
import TextField from "@material-ui/core/TextField";
import { v4 } from "uuid";
const CreateCard = () => {
    const dispatch = useDispatch();

    const useStyles = makeStyles({
        root: {
            minWidth: 275,
            flexGrow: 0,
            flexShrink: 0,
            height: "max-content",
            margin: "1rem",
        },

        content: {
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
        },
        divider: {
            margin: "2rem 0 4rem 0",
            width: "80%",
        },
    });
    const classes = useStyles();

    const handleCreateContent = () => {
        dispatch(
            createContent({
                id: v4(),
                title: "",
                todos: [],
                category: "",
                type: "edit",
            })
        );
    };
    return (
        <Card className={classes.root}>
            <CardContent className={classes.content}>
                <Typography variant="h5" className={classes.title}>
                    Create Content
                </Typography>
                <Divider className={classes.divider} />
                <Button onClick={handleCreateContent} variant="contained">
                    Create
                </Button>
            </CardContent>
        </Card>
    );
};

export default CreateCard;
