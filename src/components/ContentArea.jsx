import React from "react";
import CreateCard from "./CreateCard";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector } from "react-redux";
import { selectAll } from "../store/todoSlice";
import TodoCard from "./TodoCard";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
const ContentArea = () => {
    const data = useSelector(selectAll);
    const filteredCategories = useSelector(
        (state) => state.todoReducer.filterQueries
    );

    const useStyle = makeStyles({
        root: {
            marginLeft: "300px",
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "flex-start",
            alignContent: "flex-start",
            padding: "2rem",
        },
    });
    const classes = useStyle();
    return (
        <div className={classes.root}>
            {data
                .filter((item) => {
                    if (filteredCategories.length < 1) {
                        return item;
                    }
                    return filteredCategories.includes(item.category);
                })
                .map((item) => {
                    return <TodoCard key={item.id} data={item} />;
                })}
            <CreateCard />
        </div>
    );
};

export default ContentArea;
