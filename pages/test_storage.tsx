import React, { useState } from 'react'
import { NextPage } from 'next'
import Storage, { S3ProviderListOutput } from '@aws-amplify/storage'
import { Button, Container, Grid, TextField, Typography } from '@mui/material'
import { Appbar } from '../src/view/container/Appbar'
import { useAuth } from '../src/utils/auth'

const TestStorage: NextPage = () => {
  const { authenticated, user } = useAuth()

  const uploadFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files[0]
    const filename = file.name
    Storage.put(filename, file)
      .then((result) => {
        // eslint-disable-next-line no-console
        console.log(result)
      })
      .catch((err) => {
        console.error(err)
      })
  }

  const listImage = () => {
    const requestConfig = {
      customPrefix: {
        public: '',
        protected: '',
        private: '',
      },
      level: 'public',
    }
    Storage.list('', requestConfig)
      .then((result) => {
        const keys = (result as S3ProviderListOutput).map((value) =>
          value.key.split('/').pop()
        )
        // eslint-disable-next-line no-console
        console.log(keys)
      })
      .catch((err) => {
        console.error(err)
      })
  }

  const [s3key, setS3key] = useState('')
  const [image, setImage] = useState('')

  const changeS3key = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImage('')
    setS3key(e.target.value)
  }

  const getImage = () => {
    Storage.get(s3key)
      .then((result) => {
        if (typeof result === 'string') {
          setImage(result)
        }
      })
      .catch((err) => {
        console.error(err)
      })
  }

  const removeImage = () => {
    setImage('')
    Storage.remove(s3key)
      .then((result) => {
        // eslint-disable-next-line no-console
        console.log(result)
      })
      .catch((err) => {
        console.error(err)
      })
  }

  return (
    <React.Fragment>
      <Appbar />
      <Container>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography variant="h4">
              StorageTest {user && user.username}
            </Typography>
          </Grid>
          {authenticated && (
            <Grid item xs={12}>
              <Button variant="outlined" color="secondary" component="label">
                Upload File
                <input type="file" hidden onChange={uploadFile} />
              </Button>
            </Grid>
          )}
          <Grid item>
            <Button onClick={listImage} variant="contained">
              list Image
            </Button>
          </Grid>
          <Grid item>
            <TextField value={s3key} onChange={changeS3key} />
          </Grid>
          <Grid item>
            <Button onClick={getImage} variant="contained">
              get Image
            </Button>
          </Grid>
          {authenticated && (
            <Grid item>
              <Button onClick={removeImage} variant="outlined" color="warning">
                remove Image
              </Button>
            </Grid>
          )}
          {image !== '' && (
            <Grid item xs={12}>
              <img src={image} style={{ width: 400 }} />
            </Grid>
          )}
        </Grid>
      </Container>
    </React.Fragment>
  )
}

export default TestStorage
