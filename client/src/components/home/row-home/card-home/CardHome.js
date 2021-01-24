import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import Paper from "@material-ui/core/Paper";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  card: {
    padding: 15,
  },
  root: {
    width: "16.8rem",
  },
  expand: {
    transform: "rotate(0deg)",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
}));

function CardHome({ title, data }) {
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;

  const truncate = (str, n) => {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  };

  return (
    <div className={classes.card}>
      <Card className={classes.root} variant="outlined">
        <CardContent>
          <Typography variant="h5" component="h2">
            {title === "Top Courses" ? data.classID : data.profName}
          </Typography>
          <Typography className={classes.pos} color="textSecondary">
            {title === "Top Reviews"
              ? truncate(data.review.description, 30)
              : title === "Top Courses"
              ? truncate(data.className, 30)
              : `Top Instructor at ${data.university}`}
          </Typography>
          <Paper elevation={3}>
            <Typography color="primary">
              {title === "Top Reviews"
                ? `Votes: ${data.votes}`
                : `Total Rating: ${data.classExp || data.profExp}`}
            </Typography>
          </Paper>
        </CardContent>
      </Card>
    </div>
  );
}

export default CardHome;
