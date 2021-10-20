import React, { useEffect, useState } from 'react'
import { NextPage } from 'next'
import { Avatar as MuiAvatar, Container } from '@mui/material'
import API, { graphqlOperation, GraphQLResult } from '@aws-amplify/api'
import { GetAvatarQueryVariables, GetAvatarQuery, Avatar } from '../src/API'
import { getAvatar } from '../src/graphql/queries'
import {
  atom,
  selector,
  selectorFamily,
  useRecoilValueLoadable,
  useSetRecoilState,
} from 'recoil'
import { Appbar } from '../src/view/container/Appbar'
import { useAuth } from '../src/utils/auth'

const displayedOwnersState = atom<string[]>({
  key: 'displayedOwnersState',
  default: [],
})

const avatarsState = selector<Avatar[]>({
  key: 'avatarsState',
  get: ({ get }) => {
    const owners = get(displayedOwnersState)
    return owners
      .map((owner) => get(avatarQuery(owner)))
      .filter((value) => value)
  },
})

const avatarQuery = selectorFamily<Avatar | null, string>({
  key: 'avatarQuery',
  get: (owner) => async () => {
    const input = owner ? owner : 'dummy'
    const getAvatarQueryVariables: GetAvatarQueryVariables = {
      owner: input,
    }
    const res = (await API.graphql(
      graphqlOperation(getAvatar, getAvatarQueryVariables)
    )) as GraphQLResult<GetAvatarQuery>
    return res.data?.getAvatar
  },
})

const ShowAvatar: React.FC<{ username: string }> = ({ username }) => {
  const avatars = useRecoilValueLoadable(avatarsState)
  const setOwner = useSetRecoilState(displayedOwnersState)
  const [avatar, setAvatar] = useState<Avatar | null>(null)

  useEffect(() => {
    setOwner((prev) => {
      if (prev.includes(username)) {
        return prev
      } else {
        return [...prev, username]
      }
    })
  }, [username])

  useEffect(() => {
    if (avatars.state === 'hasValue') {
      const avatar = avatars.contents.find((v) => v?.owner === username)
      setAvatar(avatar ? avatar : null)
    }
  }, [avatars])

  switch (avatars.state) {
    case 'loading':
      return <MuiAvatar>{username.charAt(0).toUpperCase()}</MuiAvatar>
    case 'hasValue':
      if (avatar) {
        return <MuiAvatar src={avatar.avatar} />
      } else {
        return <MuiAvatar>{username.charAt(0).toUpperCase()}</MuiAvatar>
      }
    case 'hasError':
      throw avatars.contents
  }
}

const Avatars: NextPage = () => {
  const { isInit } = useAuth()
  const [text, setText] = useState('')

  return (
    <React.Fragment>
      <Appbar />
      <Container>
        {isInit && (
          <React.Fragment>
            <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
            <ShowAvatar username={text} />
            <ShowAvatar username={text} />
            <ShowAvatar username={text} />
          </React.Fragment>
        )}
      </Container>
    </React.Fragment>
  )
}

export default Avatars
