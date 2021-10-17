import React, { useState } from 'react'
import { NextPage } from 'next'
import { Container } from '@mui/material'
import API, { graphqlOperation, GraphQLResult } from '@aws-amplify/api'
import { Appbar } from '../src/view/container/Appbar'
import { useAuth } from '../src/utils/auth'
import {
  CreateAvatarMutationVariables,
  GetAvatarQueryVariables,
  GetAvatarQuery,
  UpdateAvatarMutationVariables,
  DeleteAvatarMutationVariables,
} from '../src/API'
import {
  createAvatar,
  deleteAvatar,
  updateAvatar,
} from '../src/graphql/mutations'
import { getAvatar } from '../src/graphql/queries'

const SetAvatar: NextPage = () => {
  const { authenticated, user } = useAuth()
  const [avatar, setAvatar] = useState('')
  const [specificUsername, setSpecificUsername] = useState('')

  const handleGetAvatar = async (username: string) => {
    const getAvatarQueryVariables: GetAvatarQueryVariables = {
      owner: username,
    }
    const res = (await API.graphql(
      graphqlOperation(getAvatar, getAvatarQueryVariables)
    )) as GraphQLResult<GetAvatarQuery>
    return res.data?.getAvatar?.avatar
  }

  const handleCreateAvatar = async (imageURL: string) => {
    if (!user || !user.username) return
    const createAvatarMutationVariables: CreateAvatarMutationVariables = {
      input: {
        owner: user.username,
        avatar: imageURL,
      },
    }
    await API.graphql(
      graphqlOperation(createAvatar, createAvatarMutationVariables)
    )
    const avatar = await handleGetAvatar(user.username)
    if (avatar) {
      setAvatar(avatar)
    }
  }

  const handleUpdateAvatar = async (imageURL: string) => {
    if (!user || !user.username) return
    const updateAvatarMutationVariables: UpdateAvatarMutationVariables = {
      input: {
        owner: user.username,
        avatar: imageURL,
      },
    }
    await API.graphql(
      graphqlOperation(updateAvatar, updateAvatarMutationVariables)
    )
    const avatar = await handleGetAvatar(user.username)
    if (avatar) {
      setAvatar(avatar)
    }
  }

  const handleDeleteAvatar = async () => {
    if (!user || !user.username) return
    const myAvatar = await handleGetAvatar(user.username)
    if (myAvatar) {
      if (!user || !user.username) return
      const deleteAvatarMutationVariables: DeleteAvatarMutationVariables = {
        input: {
          owner: user.username,
        },
      }
      API.graphql(graphqlOperation(deleteAvatar, deleteAvatarMutationVariables))
      setAvatar('')
    } else {
      alert("you don't have avatar")
    }
  }

  const fileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!user || !user.username) return
    const file = e.target.files?.[0]
    const reader = new FileReader()

    reader.onload = async () => {
      if (!user || !user.username) return
      const imageURL = reader.result.toString()
      const size = Buffer.from(imageURL).length / 1e3
      if (size <= 400) {
        const avatar = await handleGetAvatar(user.username)
        if (avatar) {
          handleUpdateAvatar(imageURL)
        } else {
          handleCreateAvatar(imageURL)
        }
      } else {
        alert('File size is too large')
      }
    }

    if (file) {
      reader.readAsDataURL(file)
      e.target.value = null
    }
  }

  const textChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSpecificUsername(e.target.value)
  }

  const getSpecificUserAvatar = async () => {
    const avatar = await handleGetAvatar(specificUsername)
    if (avatar) {
      setAvatar(avatar)
    } else {
      alert("this user doesn't setting avatar")
    }
  }

  return (
    <React.Fragment>
      <Appbar />
      <Container>
        {authenticated && (
          <React.Fragment>
            <button onClick={handleDeleteAvatar}>Delete my avatar</button>
            <input
              type="file"
              accept="image/jpeg,image/png,image/jpg,image/gif,image/svg"
              onChange={fileChange}
            />
            <br />
          </React.Fragment>
        )}
        <input type="text" value={specificUsername} onChange={textChange} />
        <button onClick={getSpecificUserAvatar}>GetAvatar</button>
        {avatar && (
          <React.Fragment>
            <br />
            <img src={avatar} width="300" />
          </React.Fragment>
        )}
      </Container>
    </React.Fragment>
  )
}

export default SetAvatar
