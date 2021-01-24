import React, { useState, useEffect } from "react";
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
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import AddIcon from "@material-ui/icons/Add";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import RemoveCircleIcon from "@material-ui/icons/RemoveCircle";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import Avatar from "@material-ui/core/Avatar";
import { red } from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import MoreVertIcon from "@material-ui/icons/MoreVert";

import "./CardSchedule.css";

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

function Time({ time }) {
  const timeHandler = () => {
    return (
      <Typography>
        {time.days.map((day) => day)}: {time.regular_time}
      </Typography>
    );
  };

  return <>{time.days && time.regular_time ? timeHandler() : ""}</>;
}

function Section({ section, currentTerm, setCurrentTerm }) {
  const [sectionHandler, setSectionHandler] = useState(false);

  const addSectionHandler = () => {
    let updated = currentTerm.courses;
    updated.push(section);
    setCurrentTerm({
      ...currentTerm,
      courses: updated,
    });
    setSectionHandler(true);
  };

  const removeSectionHandler = () => {
    let updated = currentTerm.courses;
    updated = [...updated].filter(
      (c) =>
        c.sectionID !== section.sectionID ||
        c.profName !== section.profName ||
        c.classID !== section.classID
    );
    setCurrentTerm({
      ...currentTerm,
      courses: updated,
    });
    setSectionHandler(false);
  };

  useEffect(() => {
    const checkMarkedSections = () => {
      let updated = currentTerm.courses;
      currentTerm.courses.forEach((c, i) => {
        if (
          c.sectionID === section.sectionID &&
          c.profName === section.profName &&
          c.classID === section.classID
        ) {
          updated[i] = c;
          setCurrentTerm({
            ...currentTerm,
            courses: updated,
          });
          setSectionHandler(true);
        }
      });
    };
    checkMarkedSections();
  }, []);

  return (
    <>
      <Paper elevation={5} className="paper-section">
        <div className="main-section">
          <div className="left-section">
            <Typography align="justify" display="block" gutterBottom>
              <Typography color="primary">
                {section.sectionID} {section.profName}
                {section.openSeats && section.totalSeats
                  ? `: ${section.openSeats}/${section.totalSeats}`
                  : ""}
              </Typography>
              <Typography paragraph>
                {section.times.length !== 0 ? (
                  section.times.map((t) => <Time time={t} />)
                ) : (
                  <Typography>No times available</Typography>
                )}
              </Typography>
            </Typography>
          </div>
          <div className="right-section">
            <Button
              onClick={
                sectionHandler ? removeSectionHandler : addSectionHandler
              }
            >
              {sectionHandler ? (
                <RemoveCircleIcon className="remove-bttn-section" />
              ) : (
                <AddCircleIcon className="add-bttn-section" />
              )}
            </Button>
          </div>
        </div>
      </Paper>
    </>
  );
}

function CardSchedule({ classes, currentTerm, setCurrentTerm }) {
  const styles = useStyles();
  const [expanded, setExpanded] = useState(false);
  const [info, setInfo] = useState(false);

  const truncate = (str, n) => {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  };

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleInfoClick = () => {
    setInfo(!info);
  };

  return (
    <div className={styles.card}>
      <Card className={styles.root}>
        <CardContent>
          <Typography variant="h5" component="h2">
            {classes.classID}
          </Typography>
          <Typography className={styles.pos} color="textSecondary">
            {truncate(classes.className, 30)}
          </Typography>
        </CardContent>

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

        <Collapse in={info} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography variant="h6" paragraph>
              {classes.className}
            </Typography>
            <Typography paragraph>
              {classes.description
                ? classes.description
                : "No description available"}
            </Typography>
          </CardContent>
        </Collapse>

        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            {classes.sections.length !== 0 ? (
              classes.sections.map((s) => (
                <Section
                  section={{
                    ...s,
                    classID: classes.classID,
                    show: false,
                    color: Math.floor(Math.random() * 16),
                  }}
                  currentTerm={currentTerm}
                  setCurrentTerm={setCurrentTerm}
                />
              ))
            ) : (
              <Section
                section={{
                  classID: classes.classID,
                  profName: "No Proffesor",
                  times: [],
                  show: false,
                }}
                currentTerm={currentTerm}
                setCurrentTerm={setCurrentTerm}
              />
            )}
          </CardContent>
        </Collapse>
      </Card>
    </div>
  );
}

export default CardSchedule;
