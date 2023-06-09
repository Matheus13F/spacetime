import { View, Text, TouchableOpacity } from 'react-native'
import React, { useEffect } from 'react'
import { useAuthRequest, makeRedirectUri } from 'expo-auth-session'
import * as SecureStore from 'expo-secure-store'
import { useRouter } from 'expo-router'

import Logo from '../src/assets/spacetime-logo.svg'
import { api } from '../src/lib/api'

export default function App() {
  const router = useRouter()

  const discovery = {
    authorizationEndpoint: 'https://github.com/login/oauth/authorize',
    tokenEndpoint: 'https://github.com/login/oauth/access_token',
    revocationEndpoint:
      'https://github.com/settings/connections/applications/6ac6a9f8a946b3919015',
  }

  const [request, response, signInWithGithub] = useAuthRequest(
    {
      clientId: '6ac6a9f8a946b3919015',
      scopes: ['identify'],
      redirectUri: makeRedirectUri({
        scheme: 'spacetime',
      }),
    },
    discovery,
  )
  async function handleGithubOAuthCode(code: string) {
    const response = await api.post('register', { code })

    const { token } = response.data
    await SecureStore.setItemAsync('token', token)
    router.push('/memories')
  }

  useEffect(() => {
    if (response?.type === 'success') {
      const { code } = response.params
      handleGithubOAuthCode(code)
    }
  }, [response])

  return (
    <View className="flex-1 items-center px-8 py-10">
      <View className="flex-1 items-center justify-center gap-6">
        <Logo />
        <View className="space-y-2">
          <Text className="text-center font-title text-2xl leading-tight text-gray-50">
            Sua capsula do tempo
          </Text>
          <Text className="text-center font-body text-base leading-relaxed text-gray-100">
            Colecione momentos marcantes da sua jornada e compartilhe (se
            quiser) com o mundo!
          </Text>
        </View>

        <TouchableOpacity
          activeOpacity={0.7}
          className="rounded-full bg-green-500 px-5 py-2"
          onPress={() => signInWithGithub()}
        >
          <Text className="font-alt text-sm uppercase text-black">
            Cadastrar Lembranca
          </Text>
        </TouchableOpacity>
      </View>

      <Text className="text-center font-body text-sm leading-relaxed text-gray-200">
        Feio com ❤ por @matheus13f
      </Text>
    </View>
  )
}
