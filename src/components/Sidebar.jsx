import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Avatar from "@material-ui/core/Avatar";
import { deepOrange } from "@material-ui/core/colors";
import { useSelector, useDispatch } from "react-redux";
import { selectAll, handleFilter } from "../store/todoSlice";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Checkbox from "@material-ui/core/Checkbox";
const Sidebar = () => {
    const dispatch = useDispatch();
    const data = useSelector(selectAll);
    const filteredCategories = useSelector(
        (state) => state.todoReducer.filterQueries
    );
    const [categories, setCategories] = React.useState([]);

    React.useEffect(() => {
        const withCategories = data.filter((item) => {
            return item.category !== "" && item.category !== undefined;
        });

        const categoryTypes = withCategories.map((item) => {
            return item.category;
        });

        const categorySet = new Set(categoryTypes);
        const categoryArray = [...categorySet];
        console.log(categoryArray);
        setCategories(categoryArray);
    }, [data]);

    const [name, setName] = React.useState("");
    const [profilePicture, setProfilePicture] = React.useState("");
    const useStyles = makeStyles((theme) => ({
        sidebarWrapper: {
            height: "100vh",
            maxWidth: "300px",
            display: "flex",
            flexDirection: "column",
            background: "#eeeeee",
            flexShrink: 0,
            position: "absolute",
        },
        profileSection: {
            display: "flex",
            padding: "2rem",
            display: "flex",
            alignItems: "center",
        },
        profilePicture: {
            backgroundColor: "blue",
            color: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "18px",
            fontWeight: "bolder",
            position: "relative",
            width: "3rem",
            height: "3rem",
            borderRadius: "50%",
            marginRight: "1rem",
        },
        divider: {
            width: "80%",
            margin: "0 auto 4rem auto",
        },
        orange: {
            color: theme.palette.getContrastText(deepOrange[500]),
            backgroundColor: deepOrange[500],
            marginRight: "1rem",
            padding: ".2rem",
        },
    }));

    React.useEffect(() => {
        const name = localStorage.getItem("name");
        setName(name);
        const pp = name?.split(" ");

        let letters = "";
        pp?.map((item) => {
            letters += item[0];
        });
        setProfilePicture(letters);
    }, []);
    const handleSetFilter = (e) => {
        if (e.target.checked === true) {
            dispatch(handleFilter([...filteredCategories, e.target.value]));
        } else {
            const clearedFilter = filteredCategories.filter((item) => {
                return item !== e.target.value;
            });
            dispatch(handleFilter(clearedFilter));
        }
    };

    const classes = useStyles();
    return (
        <div className={classes.sidebarWrapper}>
            <div className={classes.profileSection}>
                <Avatar className={classes.orange}>{profilePicture}</Avatar>

                <Typography variant="h6">{name}</Typography>
            </div>
            <Divider className={classes.divider} />
            <div>
                <List
                    className={classes.listWrapper}
                    component="nav"
                    aria-label="main mailbox folders"
                >
                    {categories.length > 0 ? (
                        categories.map((item) => {
                            return (
                                <ListItem key={item} button>
                                    <ListItemIcon>
                                        <Checkbox
                                            inputProps={{
                                                "aria-label":
                                                    "primary checkbox",
                                            }}
                                            value={item}
                                            onChange={handleSetFilter}
                                        />
                                    </ListItemIcon>
                                    <ListItemText primary={item} />
                                </ListItem>
                            );
                        })
                    ) : (
                        <ListItem button>
                            <ListItemText primary="No category to show" />
                        </ListItem>
                    )}
                </List>
            </div>
        </div>
    );
};

export default Sidebar;
