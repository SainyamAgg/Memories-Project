import React, { useState, useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
 
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import FileBase from 'react-file-base64';

import useStyles from './styles';

import { createPost, updatePost } from '../../actions/posts'

const Form = ({ currentId, setCurrentId }) => {

    const dispatch = useDispatch();

    const user = JSON.parse(localStorage.getItem('profile'));

    const [postData, setPostData] = useState({
        title: '', message: '', tags: '', selectedFile: ''
    });

    const post = useSelector((state) => currentId ? state.posts.find((p) => p._id === currentId) : null);

    useEffect(() => {
        if(post) {
            setPostData(post);
        }
    }, [post]);

    const classes = useStyles();

    const handleSubmit = (e) => {
        e.preventDefault();

        if(currentId) {
            dispatch(updatePost(currentId, { ...postData, name: user?.result?.name }));
        }
        else {
            dispatch(createPost({ ...postData, name: user?.result?.name }));
        }
        clear();
    }

    const clear = () => {
        setCurrentId(null);
        setPostData({ title: '', message: '', tags: '', selectedFile: '' });
    }

    if(!user?.result?.name) {
        return (
            <Paper className={classes.paper}>
                <Typography variant='h6' align='center'>
                    Please SignIn to create your own memories and like other's memories
                </Typography>
            </Paper>
        )
    }

    return (
        <Paper className={classes.paper}>
            <form autoComplete='off' noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
                <Typography variant='h6'>{currentId ? 'Editing' : 'Creating'} a Memory</Typography>
                <TextField 
                    name='title' 
                    variant='outlined' 
                    label='Title' 
                    fullWidth 
                    value={postData.title} 
                    onChange={(e) => setPostData({
                        ...postData, title: e.target.value
                    })} 
                />
                <TextField 
                    name='message' 
                    variant='outlined' 
                    label='Message' 
                    fullWidth 
                    value={postData.message} 
                    onChange={(e) => setPostData({
                        ...postData, message: e.target.value
                    })} 
                />
                <TextField name='tags' variant='outlined' label='Tags' fullWidth value={postData.tags} onChange={(e) => setPostData({...postData, tags: e.target.value.split(',')})} />
                <div className={classes.fileInput}>
                    <FileBase type='file' multiple={false} onDone={({base64}) => setPostData({ ...postData, selectedFile: base64})}>
                    </FileBase>
                </div>
                <Button className={classes.buttonSubmit} variant='contained' color='primary' size='large' type='submit' fullWidth>Submit</Button>
                <Button variant='contained' color='secondary' size='small' onClick={clear} fullWidth>Clear</Button>
            </form>
        </Paper>
    );
}

export default Form;