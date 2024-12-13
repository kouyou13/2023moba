import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
// react-router-domの解説 https://zenn.dev/naoki0722/articles/552258f70f69fa

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const Navigate = useNavigate() // historyを用意する

  // APIからデータ取得
  const AccessApi = async (URL) => {
    try {
      const response = await axios.get(URL)
      return response.data
    } catch (error) {
      console.log(URL)
      switch (error.response.status) {
        case 400:
          console.log('認証エラーです')
          break
        case 401:
          console.log('認証エラーです')
          break
        case 404:
          console.log('URL先がないです')
          break
        default:
          console.log(error)
      }
      throw error
    }
  }

  const handleLogin = async () => {
    if (username === '') {
      alert('ユーザー名を入力してください')
    } else if (password === '') {
      alert('パスワードを入力してください')
    } else {
      const URL = `https://ezaki-lab.cloud/~nict/api/check_user.php?username=${username}&password=${password}`
      const res = await AccessApi(URL)
      if (res === 'error') {
        alert('ログインエラー')
      } else if (res === 'no username') {
        alert('このユーザー名は存在しません')
      } else if (res === 'no password') {
        alert('パスワードが異なります')
      } else {
        Navigate('/', { state: parseInt(res) })
      }
    }
  }

  return (
    <div className="Login">
      <h1>撮影地点可視化サイト</h1>
      <div className="LoginForm">
        <p className="loginP">ユーザー名</p>
        <input
          type="text"
          className="loginText"
          placeholder="Enter your username"
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <p className="loginP">パスワード</p>
        <input
          type="password"
          className="loginText"
          placeholder="Enter your password"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <br />
        <button onClick={handleLogin} className="loginBtn">
          ログイン
        </button>
      </div>
    </div>
  )
}

export default Login
