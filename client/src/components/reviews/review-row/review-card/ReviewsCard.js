import React, { useState, useEffect } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Paper from "@material-ui/core/Paper";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Collapse from "@material-ui/core/Collapse";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import InfoIcon from "@material-ui/icons/Info";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";

import Modal from "./../../reviews-comment-modal/Modal.js";
import "./ReviewsCard.css";

const useStyles = makeStyles((theme) => ({
  card: {
    padding: 15,
  },
  root: {
    width: "23.6rem",
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

function Comment({ comment }) {
  const dateTruncate = (str) => {
    return str.substring(0, 10);
  };

  return (
    <div className="review-comment">
      <Paper elevation={5} className="comment-paper">
        <Typography paragraph>{comment.comment}</Typography>
        <Typography color="textSecondary">
          {dateTruncate(comment.date)}
        </Typography>
      </Paper>
    </div>
  );
}

function ReviewsCard({ type, review }) {
  const styles = useStyles();
  const [expanded, setExpanded] = useState(false);
  const [info, setInfo] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [votes, setVotes] = useState(review.votes);
  const [voteUp, setVoteUp] = useState(false);
  const [voteDown, setVoteDown] = useState(false);

  useEffect(() => {
    const fetchVoteType = async () => {
      try {
        const serverVoteType = await axios({
          method: "get",
          url: "/reviews/getVote",
          params: {
            reviewID: review._id,
          },
        });
        if (serverVoteType.data === "up") {
          setVoteUp(true);
        } else if (serverVoteType.data === "down") {
          setVoteDown(true);
        }
        return null;
      } catch (err) {
        return null;
      }
    };
    fetchVoteType();
  }, []);

  const truncate = (str, n) => {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  };

  const dateTruncate = (str) => {
    return str.substring(0, 10);
  };

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleInfoClick = () => {
    setInfo(!info);
  };

  const handleUpVote = async () => {
    if (voteUp) {
      return null;
    } else if (voteDown) {
      try {
        setVoteUp(false);
        setVoteDown(false);
        const votesServer = await axios.patch("/reviews/vote", {
          reviewID: review._id,
          type: "up",
        });
        setVotes(votesServer.data.votes);
      } catch (err) {
        console.log("vote error: ", err);
      }
    } else {
      try {
        setVoteUp(true);
        setVoteDown(false);
        const votesServer = await axios.patch("/reviews/vote", {
          reviewID: review._id,
          type: "up",
        });
        setVotes(votesServer.data.votes);
      } catch (err) {
        console.log("vote error: ", err);
      }
    }
  };

  const handleDownVote = async () => {
    if (voteDown) {
      return null;
    } else if (voteUp) {
      try {
        setVoteUp(false);
        setVoteDown(false);
        const votesServer = await axios.patch("/reviews/vote", {
          reviewID: review._id,
          type: "down",
        });
        setVotes(votesServer.data.votes);
      } catch (err) {
        console.log("vote error: ", err);
      }
    } else {
      try {
        setVoteUp(false);
        setVoteDown(true);
        const votesServer = await axios.patch("/reviews/vote", {
          reviewID: review._id,
          type: "down",
        });
        setVotes(votesServer.data.votes);
      } catch (err) {
        console.log("vote error: ", err);
      }
    }
  };

  return (
    <div className={styles.card}>
      <Card className={styles.root}>
        <CardContent>
          <Typography variant="h5" component="h2">
            {truncate(review.review.title, 25)}
          </Typography>
          <Typography className={styles.pos} color="textSecondary">
            {type === "prof"
              ? truncate(review.classID, 30)
              : truncate(review.profName, 30)}
          </Typography>
          <Typography variant="body2" component="p">
            {truncate(review.review.description, 50)}
          </Typography>
        </CardContent>
        <div className="bttn-review-bar">
          <div>
            <CardActions>
              <IconButton
                aria-label="info-description"
                className={clsx(styles.expand, {
                  [styles.expandOpen]: info,
                })}
                onClick={handleInfoClick}
                aria-expanded={info}
              >
                <InfoIcon />
              </IconButton>
              <IconButton
                className={clsx(styles.expand, {
                  [styles.expandOpen]: expanded,
                })}
                onClick={handleExpandClick}
                aria-expanded={expanded}
                aria-label="show-more"
              >
                <ExpandMoreIcon />
              </IconButton>
            </CardActions>
          </div>

          <div className="voting-review">
            <IconButton
              size="small"
              className={`${voteUp && "up"}`}
              style={{ marginRight: 5 }}
              onClick={handleUpVote}
            >
              <ArrowUpwardIcon className={`${voteUp && "up"}`} />
            </IconButton>
            <Typography>{votes}</Typography>
            <IconButton
              size="small"
              className={`${voteDown && "down"}`}
              style={{ marginLeft: 5 }}
              onClick={handleDownVote}
            >
              <ArrowDownwardIcon className={`${voteDown && "down"}`} />
            </IconButton>
          </div>
        </div>

        <Collapse in={info} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography color="primary" paragraph>
              {review.classID} - {review.className} - {review.profName}
            </Typography>
            <Typography variant="h6">
              {review.review.title}
              <Typography paragraph> {review.review.description} </Typography>
            </Typography>
            <Typography paragraph>
              <Typography>
                Grade:{" "}
                {review.review.grade === "" ? "None" : review.review.grade}
              </Typography>
              <Typography>
                Class Experience:{" "}
                {review.review.classExp === ""
                  ? "None"
                  : review.review.classExp}
              </Typography>
              <Typography>
                Instructor Experience:{" "}
                {review.review.profExp === "" ? "None" : review.review.profExp}
              </Typography>
            </Typography>
            <Typography color="textSecondary">
              {dateTruncate(review.review.date)}
            </Typography>
          </CardContent>
        </Collapse>

        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            {review.comments.map((c) => (
              <Comment comment={c} />
            ))}
            <Button onClick={() => setShowModal(true)}>Comment</Button>
            <Modal
              reviewID={review._id}
              showModal={showModal}
              setShowModal={setShowModal}
            />
          </CardContent>
        </Collapse>
      </Card>
    </div>
  );
}

export default ReviewsCard;
