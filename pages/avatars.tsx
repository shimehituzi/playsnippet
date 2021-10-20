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
    if (owner === '') return null
    const getAvatarQueryVariables: GetAvatarQueryVariables = {
      owner: owner,
    }
    const res = (await API.graphql(
      graphqlOperation(getAvatar, getAvatarQueryVariables)
    )) as GraphQLResult<GetAvatarQuery>
    return res.data?.getAvatar
  },
})

const avatarState = selectorFamily<Avatar | null, string>({
  key: 'avatarState',
  get:
    (owner) =>
    ({ get }) => {
      const avatars = get(avatarsState)
      const avatar = avatars.find((v) => v.owner === owner)
      return avatar ? avatar : null
    },
})

const useAvatar = (username: string): Avatar | null => {
  const setOwner = useSetRecoilState(displayedOwnersState)
  const avatar = useRecoilValueLoadable(avatarState(username))

  useEffect(() => {
    setOwner((prev) => Array.from(new Set([...prev, username])))
  }, [username])

  return avatar.state === 'hasValue' ? avatar.contents : null
}

const ShowAvatar: React.FC<{ username: string }> = ({ username }) => {
  const avatar = useAvatar(username)

  return avatar ? (
    <MuiAvatar src={avatar.avatar} />
  ) : (
    <MuiAvatar>{username.charAt(0).toUpperCase()}</MuiAvatar>
  )
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
