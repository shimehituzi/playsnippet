import React, { useState } from 'react'
import { useRecoilState } from 'recoil'
import { postFormState, codesFormState, CodeForm } from '../state/formState'
import {
  CreatePostMutationVariables,
  CreatePostMutation,
  CreateCodeMutationVariables,
} from '../API'
import { createCode, createPost } from '../graphql/mutations'
import { gqlMutation } from '../utils/graphql'
import {
  Button,
  Card,
  colors,
  Grid,
  IconButton,
  Tab,
  Tabs,
  TextField,
} from '@mui/material'
import { makeStyles } from '@mui/styles'
import {
  Add as AddIcon,
  Delete as DeleteIcon,
  Send as SendIcon,
} from '@mui/icons-material'
import { useAuth } from '../utils/auth'

const useStyle = makeStyles({
  card: {
    backgroundColor: colors.grey[700],
    padding: '3%',
    paddingLeft: '5%',
    paddingRight: '5%',
  },
  form: {
    padding: '2%',
  },
  tab: {
    textTransform: 'none',
  },
  button: {
    textTransform: 'none',
  },
  cord: {
    backgroundColor: colors.grey[900],
    padding: '2%',
  },
  close: {
    marginLeft: 'auto',
  },
})

export const PostForm: React.FC = () => {
  const { authenticated } = useAuth()

  const [post, setPost] = useRecoilState(postFormState)
  const [codes, setCodes] = useRecoilState(codesFormState)
  const [tab, setTab] = useState<number>(0)

  const handleSubmit = async () => {
    if (!authenticated) return

    const res = await gqlMutation<
      CreatePostMutationVariables,
      CreatePostMutation
    >({
      query: createPost,
      variables: {
        input: {
          ...post,
          type: 'post',
        },
      },
    })
    const postID = res?.data?.createPost?.id

    if (postID) {
      codes.forEach(async (code) => {
        await gqlMutation<CreateCodeMutationVariables>({
          query: createCode,
          variables: {
            input: {
              ...code,
              skipline: '',
              postID: postID,
              type: 'code',
            },
          },
        })
      })
    }

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
    setTab(0)
  }

  const removeCode = (index: number) => () => {
    if (window.confirm('Are you sure you want to delete code?')) {
      setTab((prev) =>
        prev === codes.length - 1 && prev !== 0 ? prev - 1 : prev
      )
      setCodes((codes) => [...codes.slice(0, index), ...codes.slice(index + 1)])
    }
  }

  const classes = useStyle()

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
        {codes.length > 0 && (
          <Grid item xs={12}>
            <Tabs
              value={tab}
              onChange={handleTabChange}
              variant="scrollable"
              scrollButtons="auto"
            >
              {codes.map((code, index) => {
                const label =
                  code.title === '' ? `Code ${index + 1}` : code.title
                return <Tab key={index} label={label} className={classes.tab} />
              })}
            </Tabs>
            <Card className={classes.cord}>
              <Grid container justifyContent="center" alignItems="center">
                <Grid item xs={7} className={classes.form}>
                  <TextField
                    fullWidth
                    variant="standard"
                    label="Code Title"
                    value={codes[tab].title}
                    onChange={onChangeCode(tab)}
                    name="title"
                  />
                </Grid>
                <Grid item xs={4} className={classes.form}>
                  <TextField
                    fullWidth
                    variant="standard"
                    label="Code Language"
                    value={codes[tab].lang}
                    onChange={onChangeCode(tab)}
                    name="lang"
                  />
                </Grid>
                <Grid item xs={1}>
                  <IconButton
                    onClick={removeCode(tab)}
                    className={classes.close}
                    tabIndex={-1}
                  >
                    <DeleteIcon />
                  </IconButton>
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
            </Card>
          </Grid>
        )}
        <Grid item>
          <Button
            variant="outlined"
            onClick={addCode}
            className={classes.button}
            startIcon={<AddIcon />}
          >
            Code
          </Button>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            onClick={handleSubmit}
            startIcon={<SendIcon />}
          >
            Create
          </Button>
        </Grid>
      </Grid>
    </Card>
  )
}
