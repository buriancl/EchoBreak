import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, CardContent, Typography, Button } from "@mui/material";

function PostFeed() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/communities/tech/posts")
      .then((response) => setPosts(response.data))
      .catch((error) => console.error("Error fetching posts:", error));
  }, []);

  return (
    <div>
      {posts.map((post) => (
        <Card key={post._id} style={{ margin: "10px" }}>
          <CardContent>
            <Typography variant="h6">{post.title}</Typography>
            <Typography>Votes: {post.votes}</Typography>
            <Button variant="outlined">Read More</Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export default PostFeed;
