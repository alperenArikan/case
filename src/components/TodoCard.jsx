import React from "react";
import { deleteContent, updateContent } from "../store/todoSlice";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import Checkbox from "@material-ui/core/Checkbox";
import IconButton from "@material-ui/core/IconButton";
import TextField from "@material-ui/core/TextField";
import CreateIcon from "@material-ui/icons/Create";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import style from "./TodoCard.module.css";
import { v4 } from "uuid";
const useStyles = makeStyles({
    root: {
        minWidth: 275,
        margin: "1rem",
        position: "relative",
        height: "max-content",
    },

    content: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    divider: {
        margin: "2rem 0 1rem 0",
        width: "80%",
    },
    listWrapper: {
        width: "100%",
    },
    button: {
        margin: ".2rem",
    },
    done: {
        color: "red",
        textDecoration: "line-through",
    },
});

function SimpleCard({ data }) {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [isMouseIn, setMouseIn] = React.useState(false);
    const [category, setCategory] = React.useState(data.category);
    const [addTodoValue, setAddTodoValue] = React.useState(data.title);
    const [title, setTitle] = React.useState(data.title);
    const deleteHandler = () => {
        dispatch(deleteContent(data.id));
    };
    const editHandler = () => {
        dispatch(
            updateContent({ id: data.id, changes: { ...data, type: "edit" } })
        );
        setMouseIn(false);
    };
    const mouseEnterHandler = () => {
        if (data.type === "edit") return;
        setMouseIn(true);
    };
    const mouseLeaveHandler = () => {
        setMouseIn(false);
    };
    const handleUpdateTodo = () => {
        dispatch(
            updateContent({
                id: data.id,
                changes: { title: title, category: category, type: "ready" },
            })
        );
        setAddTodoValue("");
    };
    const handleAddTodo = (e) => {
        e.preventDefault();
        const id = v4();
        setAddTodoValue("");
        dispatch(
            updateContent({
                id: data.id,
                changes: {
                    todos: [
                        ...data.todos,
                        { todo: addTodoValue, completed: false, id: id },
                    ],
                },
            })
        );
    };
    const handleCheckChange = (e, id) => {
        let todos = [...data.todos];
        let changedData = data.todos.find((item) => {
            return item.id === id;
        });
        const itemIndex = data.todos.findIndex((item) => {
            return item.id === id;
        });
        const newData = { ...changedData, completed: e.target.checked };
        todos[itemIndex] = newData;
        dispatch(
            updateContent({
                id: data.id,
                changes: {
                    ...data,
                    todos: [...todos],
                },
            })
        );
    };
    return (
        <Card
            onMouseEnter={mouseEnterHandler}
            onMouseLeave={mouseLeaveHandler}
            className={classes.root}
        >
            {isMouseIn ? (
                <>
                    <div className={style.mask}></div>
                    <div
                        style={{
                            height: "100%",
                            width: "100%",
                            position: "absolute",
                            zIndex: "55",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        <IconButton
                            onClick={editHandler}
                            className={classes.button}
                            aria-label="delete"
                        >
                            <CreateIcon />
                        </IconButton>
                        <IconButton
                            onClick={deleteHandler}
                            className={classes.button}
                            aria-label="delete"
                        >
                            <DeleteForeverIcon />
                        </IconButton>
                    </div>
                </>
            ) : (
                ""
            )}
            <CardContent className={classes.content}>
                {data.type === "ready" ? (
                    <>
                        <Typography variant="h5" className={classes.title}>
                            {data.title}
                        </Typography>
                        <Divider className={classes.divider} />
                        <List
                            className={classes.listWrapper}
                            component="nav"
                            aria-label="main mailbox folders"
                        >
                            {data.todos.map((item) => {
                                return (
                                    <ListItem key={item.id} button>
                                        <ListItemIcon>
                                            <Checkbox
                                                inputProps={{
                                                    "aria-label":
                                                        "primary checkbox",
                                                }}
                                                checked={item.completed}
                                            />
                                        </ListItemIcon>
                                        <ListItemText
                                            className={
                                                item.completed
                                                    ? classes.done
                                                    : null
                                            }
                                            primary={item.todo}
                                        />
                                    </ListItem>
                                );
                            })}
                        </List>
                    </>
                ) : (
                    <>
                        <TextField
                            onChange={(e) => setTitle(e.target.value)}
                            id="standard-basic"
                            label="Title"
                            value={title}
                            autoFocus={true}
                        />
                        <Divider />
                        <List
                            className={classes.listWrapper}
                            component="nav"
                            aria-label="main mailbox folders"
                        >
                            {data.todos.map((item) => {
                                return (
                                    <ListItem key={item.id} button>
                                        <ListItemIcon>
                                            <Checkbox
                                                onChange={(e) =>
                                                    handleCheckChange(
                                                        e,
                                                        item.id
                                                    )
                                                }
                                                inputProps={{
                                                    "aria-label":
                                                        "primary checkbox",
                                                }}
                                                checked={item.completed}
                                            />
                                        </ListItemIcon>
                                        <ListItemText
                                            className={
                                                item.completed
                                                    ? classes.done
                                                    : null
                                            }
                                            primary={item.todo}
                                        />
                                    </ListItem>
                                );
                            })}
                        </List>
                        <form
                            style={{ marginBottom: "2rem" }}
                            onSubmit={handleAddTodo}
                        >
                            <TextField
                                value={addTodoValue}
                                onChange={(e) =>
                                    setAddTodoValue(e.target.value)
                                }
                                id="standard-basic"
                                label="Todo"
                            />
                        </form>
                        <TextField
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            id="standard-basic"
                            label="Category"
                        />
                        <Button onClick={handleUpdateTodo} variant="contained">
                            SAVE
                        </Button>
                    </>
                )}
            </CardContent>
        </Card>
    );
}
export default SimpleCard;
