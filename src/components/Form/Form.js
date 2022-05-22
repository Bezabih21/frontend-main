import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Typography,
  Paper,
  FormControl,
  InputLabel,
  Select,
} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import FileBase from "react-file-base64";
import { useHistory } from "react-router-dom";
import ChipInput from "material-ui-chip-input";

import { createPost, updatePost } from "../../actions/posts";
import useStyles from "./styles";
import { getCategories } from "../../actions/category";

const Form = ({ currentId, setCurrentId }) => {
  const [postData, setPostData] = useState({
    creator: "",
    logo: "",
    companyName: "",
    description: "",
    map: "",
    phoneNumber: "",
    productImages: null,
    category: null,
  });
  const post = useSelector((state) =>
    currentId
      ? state.posts.posts.find((company) => company._id === currentId)
      : null
  );
  const dispatch = useDispatch();
  const classes = useStyles();
  const user = JSON.parse(localStorage.getItem("profile"));
  const history = useHistory();

  const clear = () => {
    setCurrentId(0);
    setPostData({
      companyName: "",
      logo: "",
      description: "",
      map: "",
      phoneNumber: "",
      productImages: null,
      category: null,
    });
  };

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);
  const { categories } = useSelector((state) => state.category);

  useEffect(() => {
    if (!post?.companyName) clear();
    if (post) setPostData(post);
  }, [post]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    for (let i = 0; i < postData.productImages.length; i++) {
      formData.append(`productImages[]`, postData.productImages[i]);
    }
    // formData.append('companyName', postData.companyName);
    // formData.append('logo', postData.logo);
    // formData.append('description', postData.description);
    // formData.append('map', postData.map);
    // formData.append('phoneNumber', postData.phoneNumber);
    // formData.append('category', postData.category);
    setPostData({...postData, productImages: formData});

    dispatch(createPost(postData, history));

  };

  if (!user?.result?.name) {
    return (
      <Paper className={classes.paper} elevation={6}>
        <Typography variant="h6" align="center">
          Please Sign In to create your own Listing
        </Typography>
      </Paper>
    );
  }

  const handleAddChip = (tag) => {
    setPostData({ ...postData, tags: [...postData.tags, tag] });
  };

  const handleDeleteChip = (chipToDelete) => {
    setPostData({
      ...postData,
      tags: postData.tags.filter((tag) => tag !== chipToDelete),
    });
  };

  const multipleUpload = (e) => {
    e.preventDefault();
    console.log(e);
  };

  return (
    <Paper className={classes.paper}>
      <form
        autoComplete="off"
        noValidate
        enctype="multipart/form-data"
        className={`${classes.root} ${classes.form}`}
        onSubmit={handleSubmit}
      >
        <Typography variant="h6">
          {currentId
            ? `Editing "${post?.companyName}"`
            : "Creating a Business Listing"}
        </Typography>
        <TextField
          name="companyName"
          variant="outlined"
          label="companyName"
          fullWidth
          value={postData.companyName}
          onChange={(e) =>
            setPostData({ ...postData, companyName: e.target.value })
          }
        />
        <h3>Company Logo</h3>
        <div className={classes.fileInput}>
          <FileBase
            type="file"
            multiple={false}
            onDone={({ base64 }) => setPostData({ ...postData, logo: base64 })}
          />
        </div>
        <TextField
          name="description"
          variant="outlined"
          label="description"
          fullWidth
          multiline
          rows={4}
          value={postData.description}
          onChange={(e) =>
            setPostData({ ...postData, description: e.target.value })
          }
        />
        <TextField
          name="map"
          variant="outlined"
          label="please copy google map link"
          fullWidth
          value={postData.map}
          onChange={(e) => setPostData({ ...postData, map: e.target.value })}
        />
        <FormControl className={classes.formControl} fullWidth>
          <InputLabel htmlFor="age-native-simple">Category</InputLabel>
          <Select
            native
            value={postData.category}
            onChange={(e) => {
              setPostData({ ...postData, category: e.target.value });
            }}
            inputProps={{
              name: "category",
              id: "category",
            }}
          >
            <option value="" hidden></option>
            {categories.map((category) => {
              return (
                <option value={category._id} key={category._id}>
                  {category.name}
                </option>
              );
            })}
          </Select>
        </FormControl>
        <TextField
          name="phoneNumber"
          variant="outlined"
          label="phoneNumber"
          fullWidth
          value={postData.phoneNumber}
          onChange={(e) =>
            setPostData({ ...postData, phoneNumber: e.target.value })
          }
        />
        <h3>Add Company Products</h3>
        <div className={classes.fileInput}>
          <input
            type="file"
            multiple
            onChange={(e) => {
              setPostData({...postData, productImages: e.target.files});
            }}
          />
        </div>
        <Button
          className={classes.buttonSubmit}
          variant="contained"
          color="primary"
          size="large"
          type="submit"
          fullWidth
        >
          Submit
        </Button>
        <Button
          variant="contained"
          color="secondary"
          size="small"
          onClick={clear}
          fullWidth
        >
          Clear
        </Button>
      </form>
    </Paper>
  );
};

export default Form;
