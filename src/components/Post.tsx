import React, { useState } from 'react'
import Link from 'next/link'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { postSelector } from '../state/apiState'
import { editState, subscribeFlagState } from '../state/uiState'
import * as APIt from '../API'
import * as query from '../graphql/queries'
import * as mutation from '../graphql/mutations'
import { gqlMutation, gqlQuery } from '../utils/graphql'
import { useAuth } from '../utils/auth'
import dayjs, { OpUnitType } from 'dayjs'
import ReactMarkdown from 'react-markdown'
import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Collapse,
  colors,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from '@mui/material'
import { makeStyles } from '@mui/styles'
import {
  Delete as DeleteIcon,
  Edit as EditIcon,
  ExpandLess,
  ExpandMore,
  MoreVert as MoreVertIcon,
} from '@mui/icons-material'
import { Codes } from './Codes'
import { Comments } from './Comments'
import { CommentForm } from './CommentForm'
import { Avatar } from './Avatar'
import { notNull } from '../utils/nullable'

const useStyle = makeStyles({
  card: {
    backgroundColor: colors.grey[500],
    padding: '1%',
    paddingLeft: '5%',
    paddingRight: '5%',
  },
  expand: {
    marginLeft: 'auto',
  },
})

type Props = {
  postID: string
  post?: APIt.Post
}

export const Post: React.FC<Props> = (props) => {
  const post = useRecoilValue(postSelector(props.postID))
  if (props.post) {
    return <PostsRenderer post={props.post} />
  } else if (post) {
    return <PostsRenderer post={post} />
  } else {
    return <React.Fragment />
  }
}

type RendererProps = {
  post: APIt.Post
}

const PostsRenderer: React.FC<RendererProps> = ({ post }) => {
  const { authenticated, user } = useAuth()
  const isOwner = user?.username === post.owner

  const setSubscribeFlag = useSetRecoilState(subscribeFlagState)

  const deletePost = async () => {
    if (!isOwner) return
    setSubscribeFlag(true)

    const res = await gqlQuery<APIt.GetPostQueryVariables, APIt.GetPostQuery>({
      query: query.getPost,
      variables: {
        id: post.id,
      },
    })

    const codes = res.data?.getPost?.codes?.items?.filter(notNull)
    codes?.forEach(async (code) => {
      await gqlMutation<APIt.DeleteCodeMutationVariables>({
        query: mutation.deleteCode,
        variables: {
          input: {
            id: code.id,
          },
        },
      })
    })

    await gqlMutation<APIt.DeletePostMutationVariables>({
      query: mutation.deletePost,
      variables: {
        input: {
          id: post.id,
        },
      },
    })
  }

  const onDelete = async () => {
    if (!isOwner) return
    if (window.confirm('Are you sure you want to delete it?')) {
      closeMenu()
      deletePost()
    }
  }

  const setPostEdit = useSetRecoilState(editState)

  const onEdit = () => {
    if (!isOwner) return
    closeMenu()
    setPostEdit({
      isEdit: true,
      open: true,
      id: post.id,
    })
  }

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const openMenu = (e: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(e.currentTarget)
  }
  const closeMenu = () => {
    setAnchorEl(null)
  }

  const [expandComment, setExpandComment] = useState<boolean>(false)

  const handleExpandCommnet = () => {
    setExpandComment((prev) => !prev)
  }

  const classes = useStyle()

  const codes = post.codes?.items?.filter(notNull)
  const comments = post.comments?.items?.filter(notNull)

  return (
    <Card className={classes.card}>
      <CardHeader
        title={
          <Link href={`/posts/${post.owner}/${post.id}`}>
            <a>
              <Typography variant="h5">{post.title}</Typography>
            </a>
          </Link>
        }
        subheader={
          <SubHeader createdAt={post.createdAt} owner={post.owner ?? ''} />
        }
        avatar={
          <Link href={`/posts/${post.owner}`}>
            <IconButton size="small">
              <Avatar username={post.owner ?? ''} size={50} />
            </IconButton>
          </Link>
        }
        action={
          isOwner ? (
            <React.Fragment>
              <IconButton onClick={openMenu}>
                <MoreVertIcon />
              </IconButton>
              <Menu anchorEl={anchorEl} open={open} onClose={closeMenu}>
                <MenuItem onClick={onEdit}>
                  <EditIcon />
                  EDIT
                </MenuItem>
                <Divider />
                <MenuItem onClick={onDelete}>
                  <DeleteIcon />
                  DELETE
                </MenuItem>
              </Menu>
            </React.Fragment>
          ) : (
            <React.Fragment />
          )
        }
      />
      <CardContent>
        <ReactMarkdown>{post.content}</ReactMarkdown>
        <Codes codes={codes} postID={post.id} />
      </CardContent>
      <CardActions>
        <div className={classes.expand}>
          {expandComment ? 'Close' : 'Comment'}
          <IconButton onClick={handleExpandCommnet}>
            {expandComment ? <ExpandLess /> : <ExpandMore />}
          </IconButton>
        </div>
      </CardActions>
      <Collapse in={expandComment} timeout="auto" unmountOnExit>
        <CardContent>
          <Comments postID={post.id} comments={comments} />
          {authenticated && <CommentForm postID={post.id} />}
        </CardContent>
      </Collapse>
    </Card>
  )
}

type SubHeaderProps = {
  createdAt: string
  owner: string
}

const SubHeader: React.FC<SubHeaderProps> = ({ createdAt, owner }) => {
  const calcDiff = (timestamp: string) => {
    const now = dayjs()
    const time = dayjs(timestamp)

    const scales: OpUnitType[] = ['y', 'M', 'w', 'd', 'h', 'm', 's']

    for (const scale of scales) {
      const diff = now.diff(time, scale)
      if (diff > 0) return diff + scale
    }

    return '0s'
  }

  const calcTime = (timestamp: string) => {
    const date = new Date(timestamp)
    return date.toLocaleString('ja-JP', { timeZone: 'Asia/Tokyo' })
  }

  const diffTimeHeader = calcDiff(createdAt)
  const timeHeader = calcTime(createdAt)
  const [timestamp, setTimeStamp] = useState<string>(diffTimeHeader)

  const hoverTimeStamp = () => {
    setTimeStamp(timeHeader)
  }

  const leaveTimeStame = () => {
    setTimeStamp(diffTimeHeader)
  }

  const ownerString = `@${owner} - `

  return (
    <Typography variant="body2" color="textSecondary">
      {ownerString}
      <span onMouseEnter={hoverTimeStamp} onMouseLeave={leaveTimeStame}>
        {timestamp}
      </span>
    </Typography>
  )
}
