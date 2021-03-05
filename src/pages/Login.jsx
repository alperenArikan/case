import React from "react";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Divider from "@material-ui/core/Divider";
import TextField from "@material-ui/core/TextField";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../store/todoSlice";
import { useHistory } from "react-router-dom";
const Login = () => {
    const dispatch = useDispatch();
    const useStyles = makeStyles({
        root: {
            minWidth: 275,
            display: "inline-block",
        },

        background: {
            height: "100vh",
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            background:
                "linear-gradient(90deg, rgba(255,0,48,0.700717787114846) 0%, rgba(121,9,103,0.700717787114846) 100%);",
        },
        content: {
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            padding: "2rem 4rem 4rem 4rem",
        },
        textField: {
            marginTop: "3rem",
            marginBottom: "3rem",
            width: "300px",
            backgroundColor: "#eeeeee",
        },
        text: {
            fontWeight: "bold",
            fontFamily: "monospace",
        },
        form: {
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
        },
        button: {
            background: "",
            fontWeight: "bolder",
            fontFamily: "monospace",
            fontSize: "15px",
        },
    });
    const [name, setName] = React.useState("");
    const history = useHistory();
    const classes = useStyles();

    const handleNameChange = (e) => {
        setName(e.target.value);
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(login());
        history.push("/todos");
        localStorage.setItem("name", name);
    };
    return (
        <div className={classes.background}>
            <Card className={classes.root}>
                <CardContent className={classes.content}>
                    <Typography className={classes.text} variant="h3">
                        LOGIN
                    </Typography>
                    <form onSubmit={handleSubmit} className={classes.form}>
                        <TextField
                            value={name}
                            onChange={handleNameChange}
                            required
                            id="standard-required"
                            placeholder="Ad Soyad"
                            className={classes.textField}
                            variant="outlined"
                        />
                        <Button
                            className={classes.button}
                            type="submit"
                            variant="contained"
                        >
                            SUBMIT
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

export default Login;
