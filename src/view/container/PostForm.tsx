import React, { useState } from 'react'
import { useRecoilState } from 'recoil'
import API, { graphqlOperation, GraphQLResult } from '@aws-amplify/api'
import { createCode, createPost } from '../../graphql/mutations'
import {
  CreatePostMutationVariables,
  CreatePostMutation,
  CreateCodeMutationVariables,
} from '../../API'
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  colors,
  Grid,
  IconButton,
  makeStyles,
  Tab,
  Tabs,
  TextField,
} from '@material-ui/core'
import { postFormState } from '../../state/postFormState'
import { CodeForm, codesFormState } from '../../state/codesFormState'
import { Add as AddIcon, Close as CloseIcon } from '@material-ui/icons'

const useStyle = makeStyles({
  card: {
    backgroundColor: colors.grey[700],
    padding: '3%',
    paddingLeft: '5%',
    paddingRight: '5%',
  },
  form: {
    margin: '2%',
  },
  tab: {
    textTransform: 'none',
  },
  cord: {
    backgroundColor: colors.grey[900],
  },
  close: {
    marginLeft: 'auto',
  },
})

export const PostForm: React.FC = () => {
  const classes = useStyle()

  const [post, setPost] = useRecoilState(postFormState)
  const [codes, setCodes] = useRecoilState(codesFormState)
  const [tab, setTab] = useState<number>(0)

  const handleSubmit = async () => {
    const createPostMutationVariables: CreatePostMutationVariables = {
      input: {
        ...post,
        type: 'post',
      },
    }
    const res = (await API.graphql(
      graphqlOperation(createPost, createPostMutationVariables)
    )) as GraphQLResult<CreatePostMutation>

    codes.forEach(async (code) => {
      const createCodeMutationVariables: CreateCodeMutationVariables = {
        input: {
          ...code,
          skipline: '',
          postID: res.data.createPost.id,
          type: 'code',
        },
      }
      await API.graphql(
        graphqlOperation(createCode, createCodeMutationVariables)
      )
    })

    setPost({
      title: '',
      content: '',
    })
    setCodes([])
  }

  const onChangePost = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPost((post) => ({
      ...post,
      [e.target.name]: e.target.value,
    }))
  }

  const onChangeCode =
    (index: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setCodes((codes) => {
        const prevCode = codes[index]
        const newItem: CodeForm = {
          ...prevCode,
          [e.target.name]: e.target.value,
        }

        return [...codes.slice(0, index), newItem, ...codes.slice(index + 1)]
      })
    }

  const handleTabChange = (_e: React.SyntheticEvent, newTab: number) => {
    setTab(newTab)
  }

  const addCode = () => {
    const emptyItem: CodeForm = {
      title: '',
      content: '',
      lang: '',
    }
    setCodes((codes) => [...codes, emptyItem])
  }

  const removeCode = (index: number) => () => {
    if (window.confirm('Are you sure you want to delete code?')) {
      setTab(0)
      setCodes((codes) => [...codes.slice(0, index), ...codes.slice(index + 1)])
    }
  }

  return (
    <Card className={classes.card}>
      <Grid container justifyContent="center" alignItems="center" spacing={4}>
        <Grid item xs={5} className={classes.form}>
          <TextField
            fullWidth
            variant="standard"
            label="Post Title"
            value={post.title}
            onChange={onChangePost}
            name="title"
          />
        </Grid>
        <Grid item xs={12} className={classes.form}>
          <TextField
            fullWidth
            variant="outlined"
            label="Post"
            multiline
            value={post.content}
            onChange={onChangePost}
            name="content"
          />
        </Grid>
        {codes.length > 0 ? (
          <Grid item xs={12}>
            <Box sx={{ width: '100%' }}>
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs
                  value={tab}
                  onChange={handleTabChange}
                  variant="scrollable"
                  scrollButtons="auto"
                >
                  {codes.map((code, index) => {
                    const label =
                      code.title === '' ? `Code ${index + 1}` : code.title
                    return (
                      <Tab key={index} label={label} className={classes.tab} />
                    )
                  })}
                  <IconButton onClick={addCode}>
                    <AddIcon />
                  </IconButton>
                </Tabs>
              </Box>
              <Card className={classes.cord}>
                <CardActions>
                  <IconButton
                    onClick={removeCode(tab)}
                    className={classes.close}
                  >
                    <CloseIcon />
                  </IconButton>
                </CardActions>
                <CardContent>
                  <Grid container justifyContent="center" alignItems="center">
                    <Grid item xs={5} className={classes.form}>
                      <TextField
                        fullWidth
                        variant="standard"
                        label="Code Title"
                        value={codes[tab].title}
                        onChange={onChangeCode(tab)}
                        name="title"
                      />
                    </Grid>
                    <Grid item xs={3} className={classes.form}>
                      <TextField
                        fullWidth
                        variant="standard"
                        label="Code Language"
                        value={codes[tab].lang}
                        onChange={onChangeCode(tab)}
                        name="lang"
                      />
                    </Grid>
                    <Grid item xs={12} className={classes.form}>
                      <TextField
                        fullWidth
                        variant="outlined"
                        label="Code"
                        multiline
                        value={codes[tab].content}
                        onChange={onChangeCode(tab)}
                        name="content"
                      />
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Box>
          </Grid>
        ) : (
          <Grid item>
            <Button variant="outlined" onClick={addCode}>
              Add Code
            </Button>
          </Grid>
        )}
        <Grid item>
          <Button variant="contained" onClick={handleSubmit}>
            create post
          </Button>
        </Grid>
      </Grid>
    </Card>
  )
}
