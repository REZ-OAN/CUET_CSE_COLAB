import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import toastOptions from "../../utils/toastifyOptions";
import { toast } from "react-toastify";
import Collapse from "@mui/material/Collapse";
import { Button, Popover, Paper } from "@mui/material";
import { DeleteForever } from "@mui/icons-material";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import axios from "axios";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import CommentSection from "../CommentSection/CommentSection";
import AddComment from "../AddComment/AddComment";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
        duration: theme.transitions.duration.shortest,
    }),
}));
export default function PostCard({ postDetails, isAchievement }) {
    const { data } = useSelector((state) => state.user);
    const [expanded, setExpanded] = React.useState(false);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [attachments, setAttachments] = React.useState([]);
    const [comments, setComments] = React.useState([]);
    React.useEffect(() => {
        setAttachments(postDetails.attachments);
        setComments(postDetails.comments);
    }, [postDetails]);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? "simple-popover" : undefined;
    const handleExpandClick = () => {
        setExpanded(!expanded);
    };
    return (
        <React.Fragment>
            {postDetails && (
                <Card
                    sx={{
                        width: "100%",
                        borderRadius: "10px",
                        height: "auto",
                        border: "1px solid #253788",
                    }}
                >
                    <CardHeader
                        avatar={
                            <Avatar
                                sx={{ bgcolor: red[500] }}
                                src={
                                    postDetails.authorAvatar ||
                                    "/default_image.png"
                                }
                                aria-label="recipe"
                            />
                        }
                        action={
                            data?.user?.id === postDetails.authorId &&
                            !isAchievement && (
                                <IconButton
                                    aria-label="settings"
                                    onClick={handleClick}
                                >
                                    <MoreVertIcon />
                                </IconButton>
                            )
                        }
                        title={postDetails.authorName}
                        subheader={postDetails.createdAt}
                    />
                    <Popover
                        id={id}
                        open={open}
                        anchorEl={anchorEl}
                        onClose={handleClose}
                        anchorOrigin={{
                            vertical: "bottom",
                            horizontal: "left",
                        }}
                    >
                        <Paper
                            sx={{
                                width: "120px", // Set your desired width
                                height: "40px", // Set your desired height
                                backgroundColor: "#f3f3f3", // Set your desired background color
                                padding: "16px", // Set padding if needed
                            }}
                        >
                            <Button
                                component="label"
                                variant="text"
                                sx={{
                                    width: "120px",
                                    display: "flex",
                                    justifyContent: "flex-start",
                                    gap: "5%",
                                    paddingLeft: "10%",
                                    borderRadius: "10px",
                                    backgroundColor: "rgba(37,55, 136, 0.3)",
                                    "&:hover": {
                                        backgroundColor:
                                            "rgba(37,55, 136, 0.3)",
                                    },
                                    backdropFilter: "blur(25px)",
                                    border: "0px",
                                    fontSize: "18px",
                                }}
                                startIcon={
                                    <DeleteForever
                                        sx={{
                                            width: "24px",
                                            height: "24px",
                                        }}
                                    />
                                }
                                onClick={async (e) => {
                                    e.preventDefault();
                                    const { data } = await axios.delete(
                                        `/api/v1//userdeletepost/${postDetails.postId}`
                                    );
                                    window.location.reload();
                                }}
                            >
                                Delete
                            </Button>
                        </Paper>
                    </Popover>
                    {attachments.map((attachment, idx) => {
                        const isImage = [
                            "jpg",
                            "jpeg",
                            "png",
                            "gif",
                            "bmp",
                        ].includes(
                            attachment.url.split(".").pop().toLowerCase()
                        );
                        if (isImage) {
                            return (
                                <React.Fragment>
                                    <Link
                                        key={attachment.id}
                                        rel="noopener noreferrer"
                                        target="_blank"
                                        to={attachment.url}
                                        style={{
                                            marginBottom: "8px",
                                        }}
                                    >
                                        <CardMedia
                                            image={attachment.url}
                                            component="img"
                                            height="220"
                                        />
                                    </Link>
                                    <br />
                                </React.Fragment>
                            );
                        }
                        return (
                            <React.Fragment>
                                <Link
                                    key={attachment.id}
                                    rel="noopener noreferrer"
                                    target="_blank"
                                    to={attachment.url}
                                    style={{
                                        textDecoration: "none",
                                        marginBottom: "8px",
                                    }}
                                >
                                    <CardContent
                                        sx={{
                                            fontSize: "18px",
                                            height: "25px",
                                            width: "90%",
                                            margin: "0 auto",
                                            display: "flex",
                                            alignItems: "center",
                                            borderRadius: "8px",
                                            border: "1.5px solid #253788",
                                            backgroundColor: "#f3f3f3",
                                            color: "#253788",
                                            "&:hover": {
                                                color: "#B6843D",
                                            },
                                        }}
                                    >
                                        File Attachment {idx + 1}
                                    </CardContent>
                                </Link>
                                <br />
                            </React.Fragment>
                        );
                    })}
                    <CardContent>
                        <Typography variant="body2" color="text.secondary">
                            {postDetails.content}
                        </Typography>
                    </CardContent>
                    {!isAchievement && (
                        <React.Fragment>
                            <CardActions disableSpacing>
                                <ExpandMore
                                    expand={expanded}
                                    onClick={handleExpandClick}
                                    aria-expanded={expanded}
                                    aria-label="show more"
                                >
                                    <ExpandMoreIcon />
                                </ExpandMore>
                            </CardActions>
                            <Collapse
                                in={expanded}
                                timeout="auto"
                                unmountOnExit
                            >
                                <CardContent>
                                    <CommentSection commentsInfo={comments} />
                                </CardContent>
                            </Collapse>
                            <CardContent
                                sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    width: "100%",
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                    minHeight: "80px",
                                }}
                            >
                                <div
                                    style={{
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        width: "100%",
                                    }}
                                >
                                    <AddComment postId={postDetails.postId} />
                                </div>
                            </CardContent>
                        </React.Fragment>
                    )}
                </Card>
            )}
        </React.Fragment>
    );
}
