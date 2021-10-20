import React, { useEffect, useState } from 'react'
import { NextPage } from 'next'
import { Avatar as MuiAvatar, Container } from '@mui/material'
import API, { graphqlOperation, GraphQLResult } from '@aws-amplify/api'
import { GetAvatarQueryVariables, GetAvatarQuery, Avatar } from '../src/API'
import { getAvatar } from '../src/graphql/queries'
import {
  atom,
  selector,
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
  key: 'AvatarsState',
  get: async ({ get }) => {
    const owners = get(displayedOwnersState)
    const avatars = Promise.all(
      owners.map(async (owner) => {
        const input = owner ? owner : 'seed'
        const getAvatarQueryVariables: GetAvatarQueryVariables = {
          owner: input,
        }
        const res = (await API.graphql(
          graphqlOperation(getAvatar, getAvatarQueryVariables)
        )) as GraphQLResult<GetAvatarQuery>
        return res.data?.getAvatar
      })
    )
    return avatars
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

  return (
    <React.Fragment>
      <Appbar />
      <Container>
        {isInit && (
          <React.Fragment>
            <ShowAvatar username="shimehituzi" />
            <ShowAvatar username="shimehituzi" />
            <ShowAvatar username="shimehituzi" />
            <ShowAvatar username="arakida" />
            <ShowAvatar username="test" />
          </React.Fragment>
        )}
      </Container>
    </React.Fragment>
  )
}

export default Avatars
